<template lang="pug">
.algos
  h1.text-center Algos
  q-card
    q-card-main.bg-white
      .row
        .col-4
          label
            q-checkbox(v-model="gpu")
            | GPU
        .col-4
          label
            q-checkbox(v-model="cpu")
            | CPU
        .col-4
          label
            q-checkbox(v-model="asic")
            | ASIC
  q-list.bg-white(separator)
    q-collapsible(
      :label="algoName"
      group="algos"
      v-for="(algo, algoName) in filteredAlgos"
      v-bind:key="algoName"
      @open="setAlgoInfo(algoName)"
    )
      q-card
          q-card-main.bg-white
            .row
              br
            .row
              q-input(v-model="algoSpeed")

</template>

<script>
  import algos from '@/store/algos'
  import Store from 'electron-store'
  import { QCard, QCardMain, QCheckbox, QCollapsible, QInput, QList } from 'quasar'
  const store = new Store()

  export default {
    components: {
      QCard,
      QCardMain,
      QCheckbox,
      QCollapsible,
      QInput,
      QList
    },

    data () {
      return {
        algoSpeed: '',
        algoSpeeds: {},
        algos,
        currentAlgo: '',
        asic: true,
        cpu: true,
        gpu: true,
        store
      }
    },

    computed: {
      filteredAlgos () {
        let filteredAlgos = {}
        Object.keys(algos).map((key, index) => {
          if (
            (this.asic && algos[key].miners['asic']) ||
            (this.cpu && algos[key].miners['cpu']) ||
            (this.gpu && algos[key].miners['gpu'])
          ) {
            filteredAlgos[key] = this.algos[key]
          }
        })

        return filteredAlgos
      }
    },

    filters: {
    },

    methods: {
      setAlgoInfo (algoName) {
        let algoSpeed = ''
        if (this.algoSpeeds[algoName]) {
          algoSpeed = this.algoSpeeds[algoName]
        }

        this.currentAlgo = algoName
        this.algoSpeed = algoSpeed
      }
    },

    watch: {
      algoSpeed (newValue) {
        store.set(`hashRateAlgo.${this.currentAlgo}`, newValue)
      }
    },

    mounted () {
      this.algoSpeeds = store.get('hashRateAlgo')
    }
  }
</script>

<style lang="stylus" scoped>
.algos
  padding 1.5rem 2rem
.q-card
  margin-left 0px
  margin-right 0px
</style>
