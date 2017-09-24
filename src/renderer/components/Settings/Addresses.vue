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
      q-item-side.col-2
        img(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + coinName.toLowerCase() + '.png'")
        br
        | {{ coinName }}
      q-item-main.col-10
        q-item-tile.row.sm-gutter(v-for="address in coin.addresses" key="address.address")
          .col-8
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
          .col-1
            q-btn(color="red" icon="delete" @click="deleteAddress(coinName, address.address)" small round)
</template>
<script>
  import Store from 'electron-store'
  import {
    QAutocomplete, QBtn, QCard, QCardMain, QItem, QItemMain, QItemSide,
    QItemTile, QInput, QList, QSearch
  } from 'quasar'
  import { findIndex } from 'lodash'

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
      deleteAddress (coinName, address) {
        let coin = this.coins[coinName].addresses
        let coinKey = findIndex(coin, ['address', address])
        this.coins[coinName].addresses.splice(coinKey, 1)
        let addressesCount = this.coins[coinName].addresses.length
        if (addressesCount === 0) {
          delete this.coins[coinName]
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
