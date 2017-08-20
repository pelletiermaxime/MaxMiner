<template lang="pug">
.pools
  h1.text-center Pools
  q-card
    q-card-main.bg-white
      .row
        .col-4
          label
            q-checkbox(v-model="gpu")
            | GPU
        .col-4
          label
            q-checkbox(v-model="cpu")
            | CPU
        .col-4
          label
            q-checkbox(v-model="asic")
            | ASIC
  q-list.bg-white(separator)
    q-collapsible(
      :image="pool.logo"
      :label="pool.name"
      group="pools"
      v-for="(pool, index) in pools"
      v-bind:key="index"
      @open="setPoolInfos(pool.name)"
    )
      q-card
          q-card-main.bg-white
            .row
              br
            table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose.full-width
              thead
                tr
                  td Algos
                  td Fees
                  td Est. Current (mBTC/MH/day)
                  td Actual Last 24h
                  td Cur. Est Daily $ (per MH)
                  td Cur. Est Daily $
                  td 24h Est Daily $
              tbody
                tr(v-for="algo in filteredAlgos")
                  td {{ algo.name }}
                  td {{ algo.fees }}
                  td {{ (algo.estimate_current * 1000).toFixed(5) }}
                  td {{ algo.actual_last24h }}
                  td {{ (mbtcToUSD(algo.estimate_current * 1000)).toFixed(4) }}
                  td {{ USDForUser(algo.estimate_current * 1000, algo.name) }}
                  td {{ USDForUser(algo.actual_last24h, algo.name) }}
</template>

<script>
  import currencies from '@/store/currencies'
  import pools from '@/store/pools'
  import Store from 'electron-store'
  import { QCard, QCardMain, QCheckbox, QCollapsible, QList } from 'quasar'
  const store = new Store()

  export default {
    components: {
      QCard,
      QCardMain,
      QCheckbox,
      QCollapsible,
      QList
    },

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
      setPoolInfos (poolName) {
        if (this.activePool !== poolName) {
          let pool = this.pools[poolName]
          let poolType = pool.type
          if (poolType === 'yiimp') {
            this.setPoolInfosYiimp(pool)
          } else if (poolType === 'nicehash') {
            this.setPoolInfosNicehash(pool)
          }
        }
      },
      setPoolInfosNicehash (pool) {
        let apiURL = pool.url
        this.algos[pool.name] = {}
        this.$http.get(apiURL)
          .then((result) => {
            let data = result.data.result.simplemultialgo
            Object.keys(data).map((key, index) => {
              let algo = data[key]
              this.algos[pool.name][algo.name] = {
                estimate_current: algo.paying / 1000,
                name: algo.name
              }
            })
            this.activePool = pool.name
          })
      },
      setPoolInfosYiimp (pool) {
        let poolURL = `${pool.url}/api/status`
        this.algos[pool.name] = {}
        this.$http.get(poolURL)
          .then((result) => {
            let data = result.data
            this.algos[pool.name] = data
            this.activePool = pool.name
          })
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

        if (MHForAlgo === 0 || !mbtc) {
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
.q-item-image
  min-width 40px
  max-width 40px
  max-height 40px
</style>
