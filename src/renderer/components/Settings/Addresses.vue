<template lang="pug">
.settings-addresses
  h1.text-center Settings - Addresses
  q-card
    q-card-main.bg-white
      .row.xl-gutter
        .col-6
          q-search(v-model="newCoin" placeholder="Add a new coin")
            q-autocomplete(:static-data="{field: 'value', list: allCoins}")
        .col-2
          q-btn(round color="secondary" icon="add" @click="addNewCoin")
  q-list.bg-white(separator)
    q-item(v-for="(coin, coinName) in coins" key="coinName")
      q-item-side {{ coinName }}
      q-item-main
        q-item-tile.row.sm-gutter(v-for="address in coin.addresses" key="address.address")
          .col-9
            q-input(
              required="true"
              v-model="address.address"
              float-label="Address"
              )
          .col-3
            q-input(
              v-model="address.label"
              float-label="Label"
              )
</template>
<script>
  import Store from 'electron-store'
  import {
    QAutocomplete, QBtn, QCard, QCardMain, QItem, QItemMain, QItemSide,
    QItemTile, QInput, QList, QSearch
  } from 'quasar'

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
        allCoins: [],
        coins: {},
        newCoin: ''
      }
    },

    methods: {
      addNewCoin () {
        if (this.coins[this.newCoin]) { // Add address for existing coin
          this.coins[this.newCoin].addresses.push({
            address: '',
            label: ''
          })
        } else { // New coin
          this.$set(this.coins, this.newCoin, {
            addresses: [
              {
                address: '',
                label: ''
              }
            ]
          })
        }
      },
      getCoinMarketCoins () {
        let coinMarketURL = 'https://api.coinmarketcap.com/v1/ticker/'
        this.$http.get(coinMarketURL)
          .then((result) => {
            let coins = result.data
            Object.keys(coins).map((coinName, index) => {
              let coin = coins[coinName]
              this.allCoins.push({
                label: coin.name,
                value: coin.name
              })
            })
          })
      }
    },

    mounted () {
      this.getCoinMarketCoins()
      this.coins = store.get('addresses', {})
    },

    watch: {
      coins: {
        handler: function (coins) {
          store.set('addresses', coins)
        },
        deep: true
      }
    }
  }
</script>
<style lang="stylus" scoped>
.settings-addresses
  padding 1.5rem 2rem
.q-card
  margin-left 0px
</style>
