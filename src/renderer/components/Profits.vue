<template lang="pug">
.profits
  p(class="caption") Profit calculator
  .list.striped
    .item
      .item-content
        q-select(
          type="radio"
          v-model="selectedCurrency"
          :options="selectOptions"
          @input="setCoinValues"
        )
        .pull-right
          | Mode:
          label
            q-radio(v-model="mode", val="auto")
            | Automatic
          label
            q-radio(v-model="mode", val="manual")
            | Manual
  .card
      .card-content.bg-white
        .row
          .floating-label
            input(required="true", v-model="hash_rate_mhs")
            label Hash Rate (Mh/s)
          .stacked-label
            input(required="true", v-model="difficulty", :disabled="auto_mode")
            label Difficulty
        .row
          .stacked-label
            input(required="true", v-model="block_reward", :disabled="auto_mode")
            label Block reward
          .stacked-label
            input(required="true", v-model="market_value", :disabled="auto_mode")
            label Value in $
  .row
    .width-2of5
      button.primary.push(@click="setCoinValues") Refresh values
  table
    thead
      tr
        td Period
        td Currency reward
        td $ USD reward
    tbody
      tr
        td Day
        td(v-html="reward_shares")
        td(v-html="reward_money")
</template>

<script>
  import currencies from '@/store/currencies'
  import Store from 'electron-store'
  const store = new Store()

  export default {
    data () {
      return {
        block_reward: 0,
        difficulty: 0,
        coins: currencies.coins,
        hash_rate_mhs: 0,
        market_value: 0,
        mode: 'auto',
        selectedCurrency: 'DNR',
        selectOptions: currencies.names
      }
    },

    computed: {
      auto_mode () {
        return this.mode === 'auto'
      },
      current_coin () {
        return this.coins[this.selectedCurrency]
      },
      reward_shares () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        let rewardShares = dailyShare * this.block_reward

        return rewardShares
      },
      reward_money () {
        let rewardMoney = this.reward_shares * this.market_value

        return rewardMoney
      }
    },

    methods: {
      setCoinValues () {
        let whattomineURL = `https://whattomine.com/coins/${this.current_coin.whattomineID}.json`
        this.$http.get(whattomineURL)
          .then((result) => {
            let data = result.data
            this.block_reward = data.block_reward
            this.difficulty = data.difficulty24.toFixed(3)
          })
        let coinMarketCapURL = `https://api.coinmarketcap.com/v1/ticker/${this.current_coin.coinMarketCapName}`
        this.$http.get(coinMarketCapURL)
          .then((result) => {
            let data = result.data[0]
            this.market_value = data.price_usd
          })
        this.hash_rate_mhs = store.get(`hashRate.${this.selectedCurrency}`, this.current_coin.default_hash_rate_mhs)
      }
    },

    mounted () {
      this.setCoinValues()
    },

    watch: {
      hash_rate_mhs (newHashRate) {
        store.set(`hashRate.${this.selectedCurrency}`, newHashRate)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.profits
  padding 1.5rem 2rem
</style>
