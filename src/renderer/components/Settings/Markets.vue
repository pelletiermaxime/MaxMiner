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
  q-list.bg-white(separator)
    q-item(v-for="(market, marketName) in markets" key="marketName")
      q-item-side.col-2
        img(:src="markets[marketName].urls.logo")
        br
        | {{ markets[marketName].name }}
        br
        q-btn.delete(color="red" icon="delete" @click="deleteMarket(marketName)" small round)
      q-item-main.col-10
        q-item-tile.row.sm-gutter
          .col-12
            q-input(
              v-model="market_api[marketName].key"
              stack-label="Key"
              )
        q-item-tile.row.sm-gutter
          .col-12
            q-input(
              v-model="market_api[marketName].secret"
              stack-label="Secret"
            )
</template>
<script>
  import Store from 'electron-store'
  import { each, map } from 'lodash'
  import {
    QAutocomplete, QBtn, QCard, QCardMain, QItem, QItemMain, QItemSide,
    QItemTile, QInput, QList, QSearch
  } from 'quasar'
  import ccxt from 'ccxt'

  const store = new Store()

  export default {
    components: {
      QAutocomplete,
      QBtn,
      QCard,
      QCardMain,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QInput,
      QList,
      QSearch
    },

    data () {
      return {
        allMarkets: {},
        markets: {},
        market_api: {},
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
      deleteMarket (marketName) {
        delete this.market_api[marketName]
        delete this.markets[marketName]
        this.setMarkets()
        store.set('settings.market_api', this.market_api)
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
      market_api: {
        handler (apiConfig) {
          store.set('settings.market_api', apiConfig)
        },
        deep: true
      }
    }
  }
</script>
<style lang="stylus" scoped>
.mine-addresses
  padding 1.5rem 2rem
.q-card
  margin-left 0px
.delete
  height 22px
  width 29px
  margin-top 5px
</style>
