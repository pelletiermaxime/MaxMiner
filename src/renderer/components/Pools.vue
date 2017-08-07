<template lang="pug">
.pools
  h1.text-center Pools
  .list.item-delimiter
    q-collapsible(img="https://www.cryptocompare.com/media/351195/zpool.png" label="Zpool")
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
              tbody(v-if="Object.keys(filteredAlgos).length && filteredAlgos[Object.keys(filteredAlgos)[0]].name")
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
  import Store from 'electron-store'
  const store = new Store()

  export default {
    data () {
      return {
        algos: {},
        bitcoinValue: 0,
        asic: true,
        cpu: true,
        gpu: true
      }
    },

    computed: {
      filteredAlgos () {
        let allAlgos = currencies.algos
        let filteredAlgos = {}
        Object.keys(allAlgos).map((key, index) => {
          if (
            (this.asic && allAlgos[key].miners['asic']) ||
            (this.cpu && allAlgos[key].miners['cpu']) ||
            (this.gpu && allAlgos[key].miners['gpu'])
          ) {
            filteredAlgos[key] = this.algos[key]
          }
        })

        return filteredAlgos
      }
    },

    filters: {
    },

    methods: {
      getAlgos () {
        let zpoolURL = 'http://www.zpool.ca/api/status'
        this.$http.get(zpoolURL)
          .then((result) => {
            let data = result.data
            this.algos = data
          })
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
      this.getAlgos()
      this.getBTCPrice()
    },

    watch: {
      hash_rate_mhs (newHashRate) {
        store.set(`hashRate.${this.selectedCurrency}`, newHashRate)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.pools
  padding 1.5rem 2rem
</style>
