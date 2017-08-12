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
        allCoinsInfo: {},
        allCoinsValue: {},
        block_reward: 0,
        difficulty: 0,
        coins: currencies.coins,
        hash_rate_mhs: 0,
        market_value: 0,
        mode: 'auto',
        selectedCurrency: 'BTX',
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
      getWhatToMineCoins () {
        let whattomineURL = 'https://whattomine.com/coins.json'
        this.$http.get(whattomineURL)
          .then((result) => {
            let coins = result.data.coins
            Object.keys(coins).map((coinName, index) => {
              let coin = coins[coinName]
              this.allCoinsInfo[coin.tag] = coin
            }, this)
          })
      },
      getCoinMarketCoins () {
        let coinMarketURL = 'https://api.coinmarketcap.com/v1/ticker/'
        this.$http.get(coinMarketURL)
          .then((result) => {
            let coins = result.data
            Object.keys(coins).map((coinName, index) => {
              let coin = coins[coinName]
              this.allCoinsValue[coin.symbol] = coin
            }, this)
          })
      },
      setCoinValues () {
        this.market_value = 0
        this.block_reward = 0
        this.difficulty = 0
        if (this.current_coin) {
          if (this.current_coin.whattomineID) {
            let whattomineURL = `https://whattomine.com/coins/${this.current_coin.whattomineID}.json`
            this.$http.get(whattomineURL)
              .then((result) => {
                let data = result.data
                this.block_reward = data.block_reward
                this.difficulty = data.difficulty24.toFixed(3)
              })
          }
          if (this.current_coin.cryptoid) {
            let cryptoidURL = `https://chainz.cryptoid.info/explorer/index.data.dws?coin=${this.current_coin.cryptoid}&n=10`
            this.$http.get(cryptoidURL)
              .then((result) => {
                let block = result.data.blocks[0]
                this.block_reward = block.value
                this.difficulty = block.diff.toFixed(3)
              })
          }
          if (this.current_coin.coinMarketCapName) {
            let coinMarketCapURL = `https://api.coinmarketcap.com/v1/ticker/${this.current_coin.coinMarketCapName}`
            this.$http.get(coinMarketCapURL)
              .then((result) => {
                let data = result.data[0]
                this.market_value = data.price_usd
              })
            this.hash_rate_mhs = store.get(`hashRate.${this.selectedCurrency}`, this.current_coin.default_hash_rate_mhs)
          }
        } else {
          if (this.allCoinsValue[this.selectedCurrency]) {
            this.market_value = this.allCoinsValue[this.selectedCurrency].price_usd
          }
          if (this.allCoinsInfo[this.selectedCurrency]) {
            this.block_reward = this.allCoinsInfo[this.selectedCurrency].block_reward
            this.difficulty = this.allCoinsInfo[this.selectedCurrency].difficulty24.toFixed(3)
          }
        }
      }
    },

    mounted () {
      this.getWhatToMineCoins()
      this.getCoinMarketCoins()
      this.setCoinValues()
    },

    watch: {
      hash_rate_mhs (newHashRate) {
        let algo = ''
        store.set(`hashRate.${this.selectedCurrency}`, newHashRate)
        if (this.current_coin) {
          algo = this.current_coin.algo
        }
        if (this.allCoinsInfo[this.selectedCurrency]) {
          algo = this.allCoinsInfo[this.selectedCurrency].algorithm
        }
        if (algo) {
          store.set(`hashRateAlgo.${algo}`, newHashRate)
        }
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
