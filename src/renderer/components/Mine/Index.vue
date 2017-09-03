<template lang="pug">
.mine-index
  h1.text-center Mine
  q-card
    q-card-main.bg-white
      .row.sm-gutter
        .col-6
          q-select(
            v-model="pool"
            :options="pools"
            float-label="Pool"
          )
        .col-6
          q-select(
            v-model="coin"
            :options="coins"
            float-label="Coin"
          )
      .row.sm-gutter
        .col-6
          q-select(
            v-model="address"
            :options="addresses"
            float-label="Address"
          )
        .col-6
          q-select(
            v-model="miner"
            :options="miners"
            float-label="Miner"
          )
  q-card
    q-card-main.bg-white
      .row.
        {{ miner_command }}
</template>
<script>
  import pools from '@/store/pools'
  import { each } from 'lodash'
  // import Store from 'electron-store'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSelect, QSideLink, QToolbar
  } from 'quasar'

  // const store = new Store()

  export default {
    components: {
      QBtn,
      QCard,
      QCardMain,
      QIcon,
      QItemMain,
      QItemSide,
      QLayout,
      QSelect,
      QSideLink,
      QToolbar
    },
    computed: {
      miner_command () {
        let minerPath = 'ccminer-x64'
        let stratum = 'stratum+ tcp://yiimp.ccminer.org:3556'
        let command = `${minerPath} -a ${this.coin} -o ${stratum} -u ${this.address}`

        return command
      }
    },
    data () {
      return {
        address: '',
        addresses: [],
        coin: '',
        coins: [],
        miner: '',
        miners: [],
        pool: '',
        pools: []
      }
    },
    mounted () {
      each(pools, (pool) => {
        this.pools.push({
          label: pool.name,
          value: pool.name
        })
      })
      this.coins.push({
        label: 'Bitcore',
        value: 'bitcore'
      })
      this.addresses.push({
        label: '1A7pPY33hykqkAZmSS3REpb8xV8gLPN9ev (main)',
        value: '1A7pPY33hykqkAZmSS3REpb8xV8gLPN9ev'
      })
      this.miners.push({
        label: 'Ccminer',
        value: 'ccminer'
      })
    }
  }
</script>
<style lang="stylus" scoped>
</style>
