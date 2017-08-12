<template lang="pug">
.pools
  h1.text-center Pools
  .card
    .card-content.bg-white
      .row
        .width-1of5
          label
            q-checkbox(v-model="gpu")
            | GPU
        .width-1of5
          label
            q-checkbox(v-model="cpu")
            | CPU
        .width-1of5
          label
            q-checkbox(v-model="asic")
            | ASIC
  .list.item-delimiter(v-for="pool in pools", @click="bob(pool.name)")
    q-collapsible(
      :img="pool.logo"
      :label="pool.name"
      group="pools"
    )
      .card
          .card-content.bg-white
            .row
              br
            table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose.full-width
              thead
                tr
                  td Algos
                  td Fees
                  td Est. Current (mBTC/MH/day)
                  td Actual Last 24h
                  td Est Daily $ (per MH)
                  td Est Daily $ for you
              tbody
                tr(v-for="algo in filteredAlgos")
                  td {{ algo.name }}
                  td {{ algo.fees }}
                  td {{ (algo.estimate_current * 1000).toFixed(5) }}
                  td {{ algo.actual_last24h }}
                  td {{ (mbtcToUSD(algo.estimate_current * 1000)).toFixed(4) }}
                  td {{ USDForUser(algo.estimate_current * 1000, algo.name) }}
</template>

<script>
  import currencies from '@/store/currencies'
  import pools from '@/store/pools'
  import Store from 'electron-store'
  const store = new Store()

  export default {
    data () {
      return {
        activePool: '',
        algos: {},
        bitcoinValue: 0,
        asic: true,
        cpu: true,
        gpu: true,
        pools: pools
      }
    },

    computed: {
      filteredAlgos () {
        let allAlgos = currencies.algos
        let filteredAlgos = {}
        let poolName = this.activePool
        Object.keys(allAlgos).map((key, index) => {
          if (
            (this.asic && allAlgos[key].miners['asic']) ||
            (this.cpu && allAlgos[key].miners['cpu']) ||
            (this.gpu && allAlgos[key].miners['gpu'])
          ) {
            if (this.algos[poolName] && this.algos[poolName][key]) {
              filteredAlgos[key] = this.algos[poolName][key]
            }
          }
        })

        return filteredAlgos
      }
    },

    filters: {
    },

    methods: {
      bob (poolName) {
        if (this.activePool !== poolName) {
          let pool = this.pools[poolName]
          let poolURL = `${pool.url}/api/status`
          this.$http.get(poolURL)
            .then((result) => {
              let data = result.data
              this.algos[pool.name] = data
              this.activePool = poolName
            })
        }
      },
      algoNotEmpty (algo) {
        return algo !== undefined && Object.keys(algo).length &&
          algo[Object.keys(algo)[0]] &&
          algo[Object.keys(algo)[0]].name
      },
      getBTCPrice () {
        let coinMarketCapURL = 'https://api.coinmarketcap.com/v1/ticker/bitcoin'
        this.$http.get(coinMarketCapURL)
          .then((result) => {
            let data = result.data[0]
            this.bitcoinValue = data.price_usd
          })
      },
      mbtcToUSD (mbtc) {
        let bitcoins = mbtc / 1000

        return bitcoins * this.bitcoinValue
      },
      USDForUser (mbtc, algo) {
        let USDForMH = this.mbtcToUSD(mbtc)
        let MHForAlgo = store.get(`hashRateAlgo.${algo}`, 0)

        if (MHForAlgo === 0) {
          return ''
        }

        return (MHForAlgo * USDForMH).toFixed(2) + '$'
      }
    },

    mounted () {
      this.getBTCPrice()
    },

    watch: {
      algos (newAlgos) {
        console.log('ALGOS CHANGED')
        pools.forEach((pool) => {
          this.filterAlgos(pool.name)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.pools
  padding 1.5rem 2rem
</style>
