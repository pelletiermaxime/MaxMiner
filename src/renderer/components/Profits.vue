<template lang="pug">
.profits
  p(class="caption") Profit calculator
  q-list(striped)
    q-item
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
  q-card
      q-card-main.bg-white
        .row
          .floating-label
            input(required="true", v-model="hash_rate_mhs")
            label Hash Rate (Mh/s)
          .stacked-label
            input(required="true", v-model="difficulty24h", :disabled="auto_mode")
            label Difficulty (24h)
          .stacked-label
            input(required="true", v-model="difficulty100b", :disabled="auto_mode")
            label Difficulty (last ~100 blocks)
        .row
          .stacked-label
            input(required="true", v-model="block_reward", :disabled="auto_mode")
            label Block reward
          .stacked-label
            input(required="true", v-model="market_value", :disabled="auto_mode")
            label Value in $
  .row
    .width-2of5
      q-btn.primary.push(@click="setCoinValues") Refresh values
  .row
      br
  table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose
    thead
      tr
        td Period
        td(v-if="difficulty24h != 0") Currency reward (24h)
        td(v-if="difficulty24h != 0") $ USD reward (24h)
        td(v-if="difficulty100b != 0") Currency reward (100b)
        td(v-if="difficulty100b != 0") $ USD reward (100b)
    tbody
      tr
        td Hour
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToHourly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToHourly | roundMoney }}
        td(v-if="difficulty100b != 0") {{ reward_shares_daily100b | dailyToHourly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToHourly | roundMoney }}
      tr
        td Day
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | roundMoney }}
        td(v-if="difficulty100b != 0") {{ reward_shares_daily100b | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | roundMoney }}
      tr
        td Week
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToWeekly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToWeekly | roundMoney }}
        td(v-if="difficulty100b != 0") {{ reward_shares_daily100b | dailyToWeekly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToWeekly | roundMoney }}
      tr
        td Month
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToMonthly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToMonthly | roundMoney }}
        td(v-if="difficulty100b != 0") {{ reward_shares_daily100b | dailyToMonthly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToMonthly | roundMoney }}
      tr
        td Year
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToYearly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToYearly | roundMoney }}
        td(v-if="difficulty100b != 0") {{ reward_shares_daily100b | dailyToYearly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToYearly | roundMoney }}
</template>

<script>
  import currencies from '@/store/currencies'
  import Store from 'electron-store'
  import { QBtn, QCard, QCardMain, QCardTitle, QItem, QList, QSelect, QRadio } from 'quasar'

  const store = new Store()

  export default {
    components: {
      QBtn,
      QCard,
      QCardMain,
      QCardTitle,
      QItem,
      QList,
      QSelect,
      QRadio
    },
    data () {
      return {
        allCoinsInfo: {},
        allCoinsValue: {},
        block_reward: 0,
        difficulty24h: 0,
        difficulty100b: 0,
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
      reward_shares_daily24h () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty24h * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        let rewardShares = dailyShare * this.block_reward

        return rewardShares
      },
      reward_money_daily24h () {
        let rewardMoney = this.reward_shares_daily24h * this.market_value

        return rewardMoney
      },
      reward_shares_daily100b () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty100b * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        let rewardShares = dailyShare * this.block_reward

        return rewardShares
      },
      reward_money_daily100b () {
        let rewardMoney = this.reward_shares_daily100b * this.market_value

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
        this.difficulty24h = 0
        this.difficulty100b = 0
        if (this.current_coin) {
          if (this.current_coin.whattomineID) {
            let whattomineURL = `https://whattomine.com/coins/${this.current_coin.whattomineID}.json`
            this.$http.get(whattomineURL)
              .then((result) => {
                let data = result.data
                this.block_reward = data.block_reward
                this.difficulty24h = data.difficulty24.toFixed(3)
              })
          }
          if (this.current_coin.cryptoid) {
            let cryptoidURL = `https://chainz.cryptoid.info/explorer/index.data.dws?coin=${this.current_coin.cryptoid}&n=100`
            this.$http.get(cryptoidURL)
              .then((result) => {
                let blocks = result.data.blocks
                blocks = blocks.filter((block) => {
                  return block.tx === 1
                })
                let lastBlock = blocks[0]
                this.block_reward = lastBlock.value
                let totalBlocsDiff = 0
                let nbBlocs = 0
                blocks.forEach((bloc) => {
                  totalBlocsDiff += bloc.diff
                  nbBlocs++
                })
                this.difficulty100b = (totalBlocsDiff / nbBlocs).toFixed(3)
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
            this.difficulty24h = this.allCoinsInfo[this.selectedCurrency].difficulty24.toFixed(3)
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
