<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-card
    q-card-main
      q-input(
        v-model="market_api.bittrex.key"
        stack-label="Bittrex key"
        )
      q-input(
        v-model="market_api.bittrex.secret"
        stack-label="Bittrex secret"
        )
      q-input(
        v-model="market_api.cryptopia.key"
        stack-label="Cryptopia key"
        )
      q-input(
        v-model="market_api.cryptopia.secret"
        stack-label="Cryptopia secret"
        )
  q-card(v-for="(coin, index) in sortByCoinName(portfolio)" key="index")
    q-card-main.bg-white
      .row
        .col-2
          img(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + coin.name.toLowerCase() + '.png'")
        .col-4
          .coin-name {{ coin.name }}
        .col-5 {{ allCoinPrices[coin.name] | money }}
        .col-1.refresh
          q-btn(icon="refresh" color="secondary" small round @click="refreshCoin(coin.name)")
      .row.md-gutter(v-for="address in coin.coinAddresses")
        .col-8.address {{ address.address }}
        .col-2 {{ address.number.toFixed(2) }}
        .col-2 {{allCoinPrices[coin.name] * address.number | money }}
</template>

<script>
  import currencies from '@/store/currencies'
  import Store from 'electron-store'
  import { each, find, get, pickBy, sortBy } from 'lodash'
  import {
    QBtn, QCard, QCardMain, QCheckbox, QCollapsible, QInput, QItem,
    QItemSide, QItemTile, QItemMain, QList
  } from 'quasar'
  import ccxt from 'ccxt'

  const bittrex = new ccxt.bittrex({})  // eslint-disable-line new-cap
  const cryptopia = new ccxt.cryptopia({})  // eslint-disable-line new-cap
  const store = new Store()

  export default {
    components: {
      QBtn,
      QCard,
      QCardMain,
      QCheckbox,
      QCollapsible,
      QInput,
      QItem,
      QItemTile,
      QItemMain,
      QItemSide,
      QList
    },

    data () {
      return {
        addresses: [],
        allCoinPrices: {},
        coins: currencies.coins,
        market_api: {
          bittrex: {
            key: '',
            secret: ''
          },
          cryptopia: {
            key: '',
            secret: ''
          }
        },
        portfolio: [],
        store
      }
    },

    computed: {
    },

    filters: {
      money (value) {
        value = parseFloat(value)

        return value.toLocaleString(undefined, {style: 'currency', currency: 'USD'})
      }
    },

    methods: {
      async getCoinNumber (coinInfo, address) {
        let coinNumber = 0
        let storePath = `coinNumber.${coinInfo.name}.${address}`
        if (store.has(storePath)) {
          coinNumber = store.get(storePath)
        } else {
          if (coinInfo.balance_url) {
            let explorerUrl = coinInfo.balance_url.replace('$addr', address)
            let result = await this.$http.get(explorerUrl)
            coinNumber = result.data
            if (coinInfo.balance_path) {
              coinNumber = get(coinNumber, coinInfo.balance_path)
            }
            store.set(storePath, coinNumber)
          }
        }

        return parseFloat(coinNumber)
      },
      refreshCoin (coinName) {
        store.delete(`coinNumber.${coinName}`)
        this.portfolio = []
        this.setPortfolio()
      },
      async setMarkets () {
        if (store.has('settings.market_api')) {
          this.market_api = store.get('settings.market_api')
        }
        bittrex.apiKey = this.market_api.bittrex.key
        bittrex.secret = this.market_api.bittrex.secret
        cryptopia.apiKey = this.market_api.cryptopia.key
        cryptopia.secret = this.market_api.cryptopia.secret
        let resultsB = await bittrex.fetchBalance()
        let resultsC = await cryptopia.fetchBalance()

        delete resultsB.info
        delete resultsC.info
        // console.log(results)
        resultsB = pickBy(resultsB, (result) => {
          return result.total !== 0
        })
        resultsC = pickBy(resultsC, (result) => {
          return result.total !== 0
        })
        console.log(resultsB)
        console.log(resultsC)
      },
      async setAllCoinPrices () {
        let coinMarketCapURL = 'https://api.coinmarketcap.com/v1/ticker/'
        let result = await this.$http.get(coinMarketCapURL)

        each(result.data, (coin) => {
          this.$set(this.allCoinPrices, coin.name, coin.price_usd)
        })
      },
      setPortfolio () {
        this.addresses = store.get('addresses', [])

        each(this.addresses, async (addresses, coinName) => {
          let coinInfo = find(this.coins, ['name', coinName])

          let coinAddresses = []

          each(addresses.addresses, async (address) => {
            address = address.address
            let coinNumber = await this.getCoinNumber(coinInfo, address)
            coinAddresses.push({
              address: address,
              number: coinNumber
            })
          })

          this.portfolio.push({
            name: coinName,
            coinAddresses: coinAddresses
          })
        })
      },
      sortByCoinName (coins) {
        return sortBy(coins, ['name'])
      }
    },

    watch: {
      market_api: {
        handler (apiConfig) {
          store.set('settings.market_api', apiConfig)
          // console.log(apiConfig)
        },
        deep: true
      }
    },

    mounted () {
      this.setAllCoinPrices()
      // this.setPortfolio()
      // console.log(ccxt.exchanges)
      this.setMarkets()
    }
  }
</script>

<style lang="stylus" scoped>
.portfolio
  padding 1.5rem 2rem
.q-card
  margin-left 0px
  margin-right 0px
.q-card-main
  font-size 20px
.address
  font-size: 16px
.coin-name
  font-size 18px
.refresh
  button
    height 20px
    width 27px
</style>
