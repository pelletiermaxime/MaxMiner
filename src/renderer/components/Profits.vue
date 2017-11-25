<template lang="pug">
.profits
  p(class="caption") Profit calculator
  q-card
    q-card-main.bg-white
      .row
        .col-6
          q-select(
            type="radio"
            v-model="selectedCurrency"
            :options="selectOptions"
            @input="setCoinValues"
          )
        .col-6.mode.text-right
          | Mode:
          label
            q-radio(v-model="mode", val="auto")
            | Automatic
          label
            q-radio(v-model="mode", val="manual")
            | Manual
  q-card(v-if="selectedCurrency")
    q-card-main.bg-white
      .row
        .col-4
          q-input(
            required="true"
            v-model="hash_rate_mhs"
            float-label="Hash Rate (Mh/s)"
          )
        .col-4
          q-input(
            required="true"
            v-model="market_value"
            :disable="auto_mode"
            stack-label="Value in $"
          )
        .col-4
          q-input(
            required="true"
            v-model="block_reward"
            :disable="auto_mode"
            stack-label="Block reward"
          )
      .row
        .col-4
          q-input(
            required="true"
            v-model="difficulty24h"
            :disable="auto_mode"
            stack-label="Difficulty (24h)"
          )
        .col-4
          q-input(
            required="true"
            v-model="difficulty100b"
            :disable="auto_mode"
            stack-label="Difficulty (last <=50 blocks)"
          )
        .col-4
          q-input(
            required="true"
            v-model="difficulty_current"
            :disable="auto_mode"
            stack-label="Difficulty (current)"
          )
  .row(v-if="selectedCurrency")
    q-btn.push(@click="setCoinValues", color="primary") Refresh values
  .row
      br
  table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose(
    v-if="selectedCurrency"
  )
    thead
      tr
        td Period
        td(v-if="difficulty24h != 0") Currency reward (24h)
        td(v-if="difficulty24h != 0") $ USD reward (24h)
        td(v-if="difficulty100b != 0 && difficulty24h == 0") Currency reward (<= 50b)
        td(v-if="difficulty100b != 0") $ USD reward (<= 50b)
        td(v-if="difficulty_current != 0") $ USD reward (current)
    tbody
      tr
        td Hour
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToHourly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToHourly | roundMoney }}
        td(v-if="difficulty100b != 0 && difficulty24h == 0") {{ reward_shares_daily100b | dailyToHourly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToHourly | roundMoney }}
        td(v-if="difficulty_current != 0") {{ reward_money_daily_current | dailyToHourly | roundMoney }}
      tr
        td Day
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | roundMoney }}
        td(v-if="difficulty100b != 0 && difficulty24h == 0") {{ reward_shares_daily100b | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | roundMoney }}
        td(v-if="difficulty_current != 0") {{ reward_money_daily_current | roundMoney }}
      tr
        td Week
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToWeekly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToWeekly | roundMoney }}
        td(v-if="difficulty100b != 0 && difficulty24h == 0") {{ reward_shares_daily100b | dailyToWeekly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToWeekly | roundMoney }}
        td(v-if="difficulty_current != 0") {{ reward_money_daily_current | dailyToWeekly | roundMoney }}
      tr
        td Month
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToMonthly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToMonthly | roundMoney }}
        td(v-if="difficulty100b != 0 && difficulty24h == 0") {{ reward_shares_daily100b | dailyToMonthly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToMonthly | roundMoney }}
        td(v-if="difficulty_current != 0") {{ reward_money_daily_current | dailyToMonthly | roundMoney }}
      tr
        td Year
        td(v-if="difficulty24h != 0") {{ reward_shares_daily24h | dailyToYearly | roundShares }}
        td(v-if="difficulty24h != 0") {{ reward_money_daily24h | dailyToYearly | roundMoney }}
        td(v-if="difficulty100b != 0 && difficulty24h == 0") {{ reward_shares_daily100b | dailyToYearly | roundShares }}
        td(v-if="difficulty100b != 0") {{ reward_money_daily100b | dailyToYearly | roundMoney }}
        td(v-if="difficulty_current != 0") {{ reward_money_daily_current | dailyToYearly | roundMoney }}
</template>
<script>
  import currencies from '@/store/currencies'
  import { each } from 'lodash'
  import Store from 'electron-store'
  import { QBtn, QCard, QCardMain, QCardTitle, QInput, QItem, QItemMain, QList, QSelect, QRadio } from 'quasar'

  const store = new Store()

  export default {
    components: {
      QBtn,
      QCard,
      QCardMain,
      QCardTitle,
      QInput,
      QItem,
      QItemMain,
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
        difficulty_current: 0,
        coins: currencies.coins,
        hash_rate_mhs: 0,
        market_value: 0,
        mode: 'auto',
        selectedCurrency: '',
        selectOptions: []
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
        return this.calculateRewardShares(this.current_coin.algo, this.difficulty24h)
      },
      reward_money_daily24h () {
        let rewardMoney = this.reward_shares_daily24h * this.market_value

        return rewardMoney
      },
      reward_shares_daily100b () {
        return this.calculateRewardShares(this.current_coin.algo, this.difficulty100b)
      },
      reward_money_daily100b () {
        let rewardMoney = this.reward_shares_daily100b * this.market_value

        return rewardMoney
      },
      reward_shares_daily_current () {
        return this.calculateRewardShares(this.current_coin.algo, this.difficulty_current)
      },
      reward_money_daily_current () {
        let rewardMoney = this.reward_shares_daily_current * this.market_value

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
      calculateRewardShares (algoName, difficulty) {
        let blockMod = Math.pow(2, 32)
        let hashRate = this.hash_rate_mhs * 1000000
        if (algoName === 'equihash') {
          blockMod = Math.pow(2, 13)
          hashRate /= 1000000
        } else if (algoName === 'daggerhashimoto') {
          blockMod = 1
        }
        let diffForBlock = difficulty * (blockMod)
        let secondShares = (hashRate * this.block_reward) / diffForBlock
        let rewardShares = secondShares * 86400

        return rewardShares
      },
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
        let coinMarketURL = 'https://api.coinmarketcap.com/v1/ticker?limit=0'
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
          if (this.current_coin.block_reward) {
            this.block_reward = this.current_coin.block_reward
          }
          if (this.current_coin.whattomineID) {
            let whattomineURL = `https://whattomine.com/coins/${this.current_coin.whattomineID}.json`
            this.$http.get(whattomineURL)
              .then((result) => {
                let data = result.data
                this.block_reward = data.block_reward
                this.difficulty24h = data.difficulty24.toFixed(3)
                this.difficulty_current = data.difficulty.toFixed(3)
              })
          }
          if (this.current_coin.cryptoid) {
            let cryptoidURL = `https://chainz.cryptoid.info/explorer/index.data.dws?coin=${this.current_coin.cryptoid}&n=100`
            this.$http.get(cryptoidURL)
              .then((result) => {
                let blocks = result.data.blocks
                blocks = blocks.filter((block) => { // generally 1 recipient for POW
                  return block.tx === 1
                })
                blocks.splice(100)
                let lastBlock = blocks[0]
                if (!this.block_reward || this.block_reward === 0) {
                  this.block_reward = lastBlock.value
                }
                let totalBlocsDiff = 0
                let nbBlocs = 0
                blocks.forEach((bloc) => {
                  totalBlocsDiff += bloc.diff
                  nbBlocs++
                })
                this.difficulty_current = lastBlock.diff
                this.difficulty100b = (totalBlocsDiff / nbBlocs).toFixed(3)
              })
          }
          if (this.current_coin.yiimp_explorer) {
            let url = this.current_coin.yiimp_explorer
            this.$http.get(url)
              .then((result) => {
                let blocks = result.data[0]
                let lastBlock = blocks[0]
                let totalBlocsDiff = 0
                let nbBlocs = 0
                blocks.forEach((bloc) => {
                  totalBlocsDiff += bloc[1]
                  nbBlocs++
                  if (nbBlocs === 100) {
                    this.difficulty100b = (totalBlocsDiff / nbBlocs).toFixed(3)
                  }
                })
                this.difficulty_current = lastBlock[1]
                if (!this.difficulty24h) {
                  this.difficulty24h = (totalBlocsDiff / nbBlocs).toFixed(3)
                }
              })
          }
          if (this.current_coin.iquidus) {
            if (!this.block_reward || this.block_reward === 0) {
              let explorerURL = `${this.current_coin.iquidus}/ext/getlasttxs/0.00000001`
              this.$http.get(explorerURL)
                .then((result) => {
                  let blocks = result.data.data
                  let amount = 0
                  if (this.current_coin.masternode && blocks[0].vout[1]) {
                    let vout = blocks[0].vout
                    let biggestReward = vout[1]
                    if (vout[0].amount > vout[1].amount) {
                      biggestReward = vout[0]
                    }
                    amount = biggestReward.amount
                  } else {
                    amount = blocks[0].total
                  }
                  this.block_reward = amount / 100000000
                })
            }
            let diffURL = `${this.current_coin.iquidus}/api/getdifficulty`
            this.$http.get(diffURL)
              .then((result) => {
                let diff = result.data
                if (diff['proof-of-work']) {
                  this.difficulty_current = diff['proof-of-work']
                } else {
                  this.difficulty_current = diff
                }
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
      },
      setCoinList () {
        each(this.coins, (coin, symbol) => {
          if (coin.mineable !== false) {
            this.selectOptions.push({
              label: coin.name,
              value: symbol
            })
          }
        })
      }
    },

    mounted () {
      this.getWhatToMineCoins()
      this.getCoinMarketCoins()
      this.setCoinValues()
      this.setCoinList()
    },

    watch: {
      hash_rate_mhs (newHashRate) {
        let algo = ''
        store.set(`hashRate.${this.selectedCurrency}`, newHashRate)
        if (this.current_coin) {
          algo = this.current_coin.algo
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
.q-card
  margin-left 0px
</style>
