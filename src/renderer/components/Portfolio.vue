<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-list.bg-white(separator)
    q-item(multiline v-for="(coin, index) in portfolio")
      q-item-side
        q-item-tile
          img(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + coin.name.toLowerCase() + '.png'")
        q-item-tile.coin-name {{ coin.name }}
      q-item-main
        q-item-tile $203.28
        q-item-tile 45.49
      q-item-main
        q-item-tile $4.47
    //- q-collapsible(
      :label="coin.name"
      group="portfolio"
      v-for="(coin, index) in portfolio"
      v-bind:key="index"
      )
      q-card
          q-card-main.bg-white
            .row
              br
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
    },

    methods: {
      setPortfolio () {
        this.addresses = store.get('addresses', [])
        let explorers = {
          Bitcore: 'http://51.15.78.208:3001/ext/getbalance/$addr',
          Bitcoin: 'https://blockexplorer.com/api/addr/$addr/balance'
        }
        each(this.addresses, (addresses) => {
          let address = addresses.addresses[0].address

          console.log(addresses)
          let explorerUrl = explorers[addresses.name].replace('$addr', address)
          console.log(explorerUrl)

          this.portfolio.push({
            name: addresses.name,
            address: address
          })
        })
        console.log(this.portfolio)
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
.q-item-main
  font-size 22px
.coin-name
  font-size 18px
</style>
