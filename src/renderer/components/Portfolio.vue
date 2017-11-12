<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-card(v-for="(market, index) in marketPortfolio" key="index")
    q-card-main.bg-white
      .row
        .col-2
          img(:src="markets[market.name].urls.logo")
        .col-9
          .coin-name {{ markets[market.name].name }}
        .col-1.refresh
          q-btn(icon="refresh" color="secondary" small round @click="refreshMarket(market.name)")
      .row.md-gutter(v-for="(coinBalance, coinName) in market.coinsBalance")
        .col-8.address {{ coinName }}
        .col-2 {{ coinBalance.toFixed(3) }}
        .col-2 {{allCoinSymbolPrices[coinName] * coinBalance | money }}
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
        template(v-if="address.symbol")
          .col-6.address {{ address.address }} ({{ address.symbol }})
          .col-2 {{ address.number.toFixed(2) }}
          .col-2 {{ allCoinSymbolPrices[address.symbol] | money }}
          .col-2 {{ allCoinSymbolPrices[address.symbol] * address.number | money }}
        template(v-else)
          .col-8.address {{ address.address }}
          .col-2 {{ address.number.toFixed(2) }}
          .col-2 {{ allCoinPrices[coin.name] * address.number | money }}
</template>

<script>
  import currencies from '@/store/currencies'
  import Store from 'electron-store'
  import { each, find, get, pickBy, sortBy } from 'lodash'
  import {
    QAutocomplete, QBtn, QCard, QCardMain, QCheckbox, QCollapsible, QInput, QItem,
    QItemSide, QItemTile, QItemMain, QList, QSearch
  } from 'quasar'
  import ccxt from 'ccxt'

  const store = new Store()

  export default {
    components: {
      QAutocomplete,
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
      QList,
      QSearch
    },

    data () {
      return {
        addresses: [],
        allCoinPrices: {},
        allCoinSymbolPrices: {},
        coins: currencies.coins,
        markets: {},
        market_api: {},
        marketPortfolio: [],
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
          if (coinInfo.cryptoid) {
            let explorerUrl = `https://chainz.cryptoid.info//${coinInfo.cryptoid}/api.dws?q=getbalance&a=${address}&key=c20fa36e2180`
            let result = await this.$http.get(explorerUrl)
            coinNumber = result.data
            store.set(storePath, coinNumber)
          } else if (coinInfo.iquidus) {
            let explorerUrl = `${coinInfo.iquidus}/ext/getbalance/${address}`
            let result = await this.$http.get(explorerUrl)
            coinNumber = result.data
            store.set(storePath, coinNumber)
          } else if (coinInfo.balance_url) {
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
      async getETHCoinsNumbers (coinInfo, address) {
        let addresses = []
        let storePath = `coinNumber.${coinInfo.name}.${address}`
        if (store.has(storePath)) {
          addresses = store.get(storePath)
        } else {
          if (coinInfo.balance_url) {
            let explorerUrl = coinInfo.balance_url.replace('$addr', address)
            let result = await this.$http.get(explorerUrl)
            let ethBalance = result.data.ETH.balance
            addresses.push({
              address: address,
              number: ethBalance
            })
            each(result.data.tokens, (token) => {
              addresses.push({
                symbol: token.tokenInfo.symbol,
                address: token.tokenInfo.name,
                number: token.balance / (1 + ('0'.repeat(token.tokenInfo.decimals)))
              })
            })
            store.set(storePath, addresses)
          }
        }

        return addresses
      },
      refreshCoin (coinName) {
        store.delete(`coinNumber.${coinName}`)
        this.portfolio = []
        this.setPortfolio()
      },
      refreshMarket (marketName) {
        store.delete(`marketBalance.${marketName}`)
        this.marketPortfolio = []
        this.setMarkets()
      },
      async setMarkets () {
        let newMarket
        each(this.market_api, async (market, marketName) => {
          newMarket = new ccxt[marketName]()
          newMarket.apiKey = market.key
          newMarket.secret = market.secret
          this.$set(this.markets, marketName, newMarket)
          let balance = 0
          if (newMarket.apiKey && newMarket.secret) {
            let storePath = `marketBalance.${marketName}`
            if (store.has(storePath)) {
              balance = store.get(storePath)
            } else {
              balance = await newMarket.fetchBalance()
              balance = pickBy(balance.total, (result) => {
                return result !== 0
              })
              store.set(storePath, balance)
            }
            this.marketPortfolio.push({
              name: marketName,
              coinsBalance: balance
            })
          }
        })
      },
      async setAllCoinPrices () {
        let coinMarketCapURL = 'https://api.coinmarketcap.com/v1/ticker?limit=0'
        let result = await this.$http.get(coinMarketCapURL)

        each(result.data, (coin) => {
          this.$set(this.allCoinPrices, coin.name, coin.price_usd)
          this.$set(this.allCoinSymbolPrices, coin.symbol, coin.price_usd)
        })
      },
      setPortfolio () {
        this.addresses = store.get('addresses', [])

        each(this.addresses, async (addresses, coinName) => {
          let coinInfo = find(this.coins, ['name', coinName])

          let coinAddresses = []

          each(addresses.addresses, async (address) => {
            address = address.address
            if (coinName === 'Ethereum') {
              let ethAddresses = await this.getETHCoinsNumbers(coinInfo, address)
              each(ethAddresses, (ethAddress) => {
                coinAddresses.push(ethAddress)
              })
            } else {
              let coinNumber = await this.getCoinNumber(coinInfo, address)
              coinAddresses.push({
                address: address,
                number: coinNumber
              })
            }
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

    mounted () {
      if (store.has('settings.market_api')) {
        this.market_api = store.get('settings.market_api')
      }
      this.setAllCoinPrices()
      this.setPortfolio()
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
