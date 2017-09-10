<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-card(v-for="(coin, index) in portfolio" key="index")
    q-card-main.bg-white
      .row.md-gutter
        .col-2
          img(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + coin.name.toLowerCase() + '.png'")
        .col-4
          .coin-name {{ coin.name }}
      .row.md-gutter
        .col-6.address {{ coin.address }}
        .col-2 {{ coin.number.toFixed(2) }}
        .col-2 {{ coin.price | money }}
        .col-2 {{ coin.total_price | money }}
</template>

<script>
  import Store from 'electron-store'
  import { each } from 'lodash'
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
      setPortfolio () {
        // this.portfolio.push(
        //   {
        //     name: 'Bitcoin',
        //     address: 'aaaaaaaaaaaaa',
        //     number: 100.00,
        //     price: 5.00,
        //     total_price: 500.00
        //   },
        //   {
        //     name: 'Bitcoin',
        //     address: 'aaaaaaaaaaaaa',
        //     number: 100.00,
        //     price: 5.00,
        //     total_price: 500.00
        //   }
        // )
        this.addresses = store.get('addresses', [])
        let explorers = {
          bitcore: 'http://51.15.78.208:3001/ext/getbalance/$addr',
          bitcoin: 'https://blockexplorer.com/api/addr/$addr/balance'
        }
        each(this.addresses, async (addresses, coinName) => {
          let address = addresses.addresses[0].address
          coinName = coinName.toLowerCase()

          let explorerUrl = explorers[coinName].replace('$addr', address)
          let result = await this.$http.get(explorerUrl)
          let coinNumber = result.data

          let coinMarketCapURL = `https://api.coinmarketcap.com/v1/ticker/${coinName}`
          result = await this.$http.get(coinMarketCapURL)
          let coinPrice = result.data[0].price_usd

          this.portfolio.push({
            name: coinName,
            address: address,
            number: coinNumber,
            price: coinPrice,
            total_price: coinNumber * coinPrice
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
