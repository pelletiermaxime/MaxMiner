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
            v-model="algo"
            :options="algos"
            float-label="Algo"
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
  import poolList from '@/store/poollist'
  import { each, map } from 'lodash'
  import * as pools from '@/store/pools'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSelect, QSideLink, QToolbar
  } from 'quasar'
  import Store from 'electron-store'

  const store = new Store()

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
    data () {
      return {
        addresses: [],
        allAddresses: [],
        address: '',
        algo: '',
        algos: [],
        coin: '',
        coins: [],
        miner: '',
        miners: [],
        pool: '',
        pools: []
      }
    },
    computed: {
      miner_command () {
        if (this.address === '' || this.algo === '' || this.miner === '' || this.pool === '') {
          return ''
        }

        let minerPath = 'ccminer-x64'
        let stratum = 'stratum+ tcp://yiimp.ccminer.org:3556'
        let command = `${minerPath} -a ${this.algo} -o ${stratum} -u ${this.address} -p c=BTX`

        return command
      }
    },
    methods: {
      setAddresses () {
        each(this.allAddresses, (addresses) => {
          let address = addresses.addresses[0]
          let label = address.address
          if (address.label) {
            label += ` (${address.label})`
          }
          this.addresses.push({
            label: label,
            value: address.address
          })
        })
      },
      setMiners () {
        this.miners.push({
          label: 'Ccminer',
          value: 'ccminer'
        })
      },
      setPools () {
        each(poolList, (pool) => {
          this.pools.push({
            label: pool.name,
            value: pool.name
          })
        })
      }
    },
    mounted () {
      this.allAddresses = store.get('addresses', [])
      this.setAddresses()
      this.setPools()
      this.setMiners()
    },
    watch: {
      algo () {
      },
      pool () {
        if (!this.pool) {
          return []
        }
        let pool = poolList[this.pool]
        let algoList = []
        pools[pool.type](pool, this.$http).then(poolAlgos => {
          algoList = map(poolAlgos, (poolAlgo) => {
            return {
              label: poolAlgo.name,
              value: poolAlgo.name
            }
          })
          this.algos = algoList
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>
