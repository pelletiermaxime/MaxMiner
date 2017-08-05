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
        )
        button.secondary(@click="setCoinValues") Refresh values
  .card
      .card-content.bg-white
        .row
          .floating-label
            input(required="true", v-model="hash_rate_mhs")
            label Hash Rate (Mh/s)
          .floating-label
            input(required="true", v-model="difficulty")
            label Difficulty
        .row
          .floating-label
            input(required="true", v-model="block_reward")
            label Block reward
          .floating-label
            input(required="true", v-model="market_value")
            label Value in $
  .row
    button.primary(@click="calculate") Calculate
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
  export default {
    data () {
      return {
        coins: {
          'DNR': {
            block_reward: 3,
            coinMarketCapName: 'denarius-dnr',
            difficulty: 500,
            hash_rate_mhs: 100.0,
            market_value: 0.47,
            whattomineID: 187
          },
          'SIGT': {
            block_reward: 2500,
            coinMarketCapName: 'signatum',
            difficulty: 10000,
            hash_rate_mhs: 50.0,
            market_value: 0.038,
            whattomineID: 191
          }
        },
        reward_money: 0,
        reward_shares: 0,
        selectedCurrency: 'DNR',
        selectOptions: [
          {
            label: 'Denarius',
            value: 'DNR'
          },
          {
            label: 'Signatum',
            value: 'SIGT'
          }
        ]
      }
    },

    computed: {
      current_coin () {
        return this.coins[this.selectedCurrency]
      },
      block_reward () {
        return this.current_coin.block_reward
      },
      difficulty () {
        return this.current_coin.difficulty
      },
      hash_rate_mhs () {
        return this.current_coin.hash_rate_mhs
      },
      market_value () {
        return this.current_coin.market_value
      }
    },

    methods: {
      calculate () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        let rewardShares = dailyShare * this.block_reward
        this.reward_shares = rewardShares.toFixed(6)
        let rewardMoney = rewardShares * this.market_value
        this.reward_money = rewardMoney.toFixed(2)
      },
      setCoinValues () {
        let whattomineURL = `https://whattomine.com/coins/${this.current_coin.whattomineID}.json`
        this.$http.get(whattomineURL)
          .then((result) => {
            let data = result.data
            this.current_coin.block_reward = data.block_reward
            this.current_coin.difficulty = data.difficulty24.toFixed(3)
          })
        let coinMarketCapURL = `https://api.coinmarketcap.com/v1/ticker/${this.current_coin.coinMarketCapName}`
        this.$http.get(coinMarketCapURL)
          .then((result) => {
            let data = result.data[0]
            this.current_coin.market_value = data.price_usd
          })
      }
    },

    mounted () {
      this.setCoinValues()
      this.calculate()
    }
  }
</script>

<style lang="stylus" scoped>
.profits
  padding 1.5rem 2rem
</style>
