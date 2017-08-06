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
        .pull-right.mode
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
            label Difficulty (24h)
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
  .row
      br
  table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose
    thead
      tr
        td Period
        td Currency reward
        td $ USD reward
    tbody
      tr
        td Hour
        td {{ reward_shares_daily | dailyToHourly | roundShares }}
        td {{ reward_money_daily | dailyToHourly | roundMoney }}
      tr
        td Day
        td {{ reward_shares_daily | roundShares }}
        td {{ reward_money_daily | roundMoney }}
      tr
        td Week
        td {{ reward_shares_daily | dailyToWeekly | roundShares }}
        td {{ reward_money_daily | dailyToWeekly | roundMoney }}
      tr
        td Month
        td {{ reward_shares_daily | dailyToMonthly | roundShares }}
        td {{ reward_money_daily | dailyToMonthly | roundMoney }}
      tr
        td Year
        td {{ reward_shares_daily | dailyToYearly | roundShares }}
        td {{ reward_money_daily | dailyToYearly | roundMoney }}
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
      reward_shares_daily () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        let rewardShares = dailyShare * this.block_reward

        return rewardShares
      },
      reward_money_daily () {
        let rewardMoney = this.reward_shares_daily * this.market_value

        return rewardMoney
      }
    },

    filters: {
      dailyToHourly (value) {
        return value / 24
      },
      dailyToWeekly (value) {
        return value * 7
      },
      dailyToMonthly (value) {
        return value * 365 / 12
      },
      dailyToYearly (value) {
        return value * 265
      },
      roundMoney (money) {
        return money.toFixed(2)
      },
      roundShares (shares) {
        return shares.toFixed(6)
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
        let algo = this.current_coin.algo
        store.set(`hashRateAlgo.${algo}`, newHashRate)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.profits
  padding 1.5rem 2rem
.mode>*
  padding-left 1rem
</style>
