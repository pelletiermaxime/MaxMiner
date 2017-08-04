<template lang="pug">
.profits
  p(class="caption") Information
  .list.striped
    .item
      .item-content Algo:
        q-select(
          type="radio"
          v-model="select"
          :options="selectOptions"
        )
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
  .list
    | Day
    | Reward:
    span(v-html="reward_shares")
    | Rev $:
    span(v-html="reward_money")
</template>

<script>
  export default {
    data () {
      return {
        block_reward: 3.00,
        difficulty: 660.290,
        hash_rate_mhs: 100.0,
        market_value: 0.415676,
        reward_money: 0,
        reward_shares: 0,
        select: 'DNR',
        selectOptions: [
          {
            label: 'Denarius',
            value: 'DNR'
          }
        ]
      }
    },

    methods: {
      calculate () {
        let hashRate = this.hash_rate_mhs * 1000000
        let timeForShare = (this.difficulty * (Math.pow(2, 32))) / hashRate
        let dailyShare = 86400 / timeForShare
        this.reward_shares = dailyShare * this.block_reward
        this.reward_money = this.reward_shares * this.market_value
      }
    },

    mounted () {
    }
  }
</script>

<style lang="stylus" scoped>
.profits
  padding 1.5rem 2rem
</style>
