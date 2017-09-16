<template lang="pug">
.mine-addresses
  h1.text-center Settings - Markets
  q-card
    q-card-main.bg-white
      .row.xl-gutter
        .col-6
          q-search(v-model="newMarket" placeholder="Add a new market")
            q-autocomplete(:static-data="{field: 'value', list: allMarkets}")
        .col-2
          q-btn(round color="secondary" icon="add" @click="addNewMarket")
      .row(v-for="(market, marketName) in markets")
        .col-5
          q-input(
            v-model="market_api[marketName].key"
            :stack-label="market.name + ' key'"
            )
        .col-7
          q-input(
            v-model="market_api[marketName].secret"
            :stack-label="market.name + ' secret'"
            )
</template>
<script>
  import Store from 'electron-store'
  import { each, map } from 'lodash'
  import {
    QAutocomplete, QBtn, QCard, QCardMain, QInput, QSearch
  } from 'quasar'
  import ccxt from 'ccxt'

  const store = new Store()

  export default {
    components: {
      QAutocomplete,
      QBtn,
      QCard,
      QCardMain,
      QInput,
      QSearch
    },

    data () {
      return {
        allMarkets: {},
        markets: {},
        newMarket: ''
      }
    },

    methods: {
      addNewMarket () {
        this.$set(this.market_api, this.newMarket, {
          key: '',
          secret: ''
        })
        this.setMarkets()
      },
      async setMarkets () {
        let newMarket
        each(this.market_api, async (market, marketName) => {
          newMarket = new ccxt[marketName]()
          newMarket.apiKey = market.key
          newMarket.secret = market.secret
          this.$set(this.markets, marketName, newMarket)
        })
      }
    },

    mounted () {
      if (store.has('settings.market_api')) {
        this.market_api = store.get('settings.market_api')
      }
      this.allMarkets = map(ccxt.exchanges, (exchange) => {
        return {
          label: exchange,
          value: exchange
        }
      })
      this.setMarkets()
    },

    watch: {

    }
  }
</script>
<style lang="stylus" scoped>
.mine-addresses
  padding 1.5rem 2rem
.q-card
  margin-left 0px
</style>
