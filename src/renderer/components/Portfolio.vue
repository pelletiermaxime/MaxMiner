<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-card(v-for="(coin, index) in portfolio" key="index")
    q-card-main.bg-white
      .row
        .col-2
          img(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + coin.name.toLowerCase() + '.png'")
        .col-4
          .coin-name {{ coin.name }}
        .col-2 {{ coin.price | money }}
      .row.md-gutter(v-for="address in coin.coinAddresses")
        .col-8.address {{ address.address }}
        .col-2 {{ address.number.toFixed(2) }}
        .col-2 {{ address.total_price | money }}
</template>

<script>
  import currencies from '@/store/currencies'
  import Store from 'electron-store'
  import { each, find, get } from 'lodash'
  import {
    QCard, QCardMain, QCheckbox, QCollapsible, QInput, QItem, QItemSide,
    QItemTile, QItemMain, QList
  } from 'quasar'
  const store = new Store()

  export default {
    components: {
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
        coins: currencies.coins,
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
      async getCoinPrice (coinInfo) {
        let coinPrice = 0
        let storePath = `coinPrice.${coinInfo.name}`
        if (store.has(storePath)) {
          coinPrice = store.get(storePath)
        } else {
          let coinMarketCapURL = `https://api.coinmarketcap.com/v1/ticker/${coinInfo.coinMarketCapName}`
          let result = await this.$http.get(coinMarketCapURL)
          coinPrice = result.data[0].price_usd
          store.set(storePath, coinPrice)
        }

        return coinPrice
      },
      setPortfolio () {
        this.addresses = store.get('addresses', [])

        each(this.addresses, async (addresses, coinName) => {
          let coinInfo = find(this.coins, ['name', coinName])

          let coinAddresses = []
          let coinPrice = await this.getCoinPrice(coinInfo)

          each(addresses.addresses, async (address) => {
            address = address.address
            let coinNumber = await this.getCoinNumber(coinInfo, address)
            coinAddresses.push({
              address: address,
              number: coinNumber,
              total_price: coinNumber * coinPrice
            })
          })

          this.portfolio.push({
            name: coinName,
            price: coinPrice,
            coinAddresses: coinAddresses
          })
        })
      }
    },

    watch: {
    },

    mounted () {
      this.setPortfolio()
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
</style>
