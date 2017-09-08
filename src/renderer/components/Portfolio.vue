<template lang="pug">
.portfolio
  h1.text-center Portfolio
  q-list.bg-white(separator v-for="(coin, index) in portfolio")
    q-item(multiline)
      q-item-side
        q-item-tile
          img(src="https://files.coinmarketcap.com/static/img/coins/32x32/bitcore.png")
        q-item-tile {{ coin.name }}
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
        this.portfolio = [
          {
            name: 'Bitcore'
          }
        ]
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
</style>
