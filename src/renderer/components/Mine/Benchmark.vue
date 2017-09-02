<template lang="pug">
.mine-benchmark
  h1.text-center Mine
  q-card
    q-card-main.bg-white
      .row
        .col-6.
          BENCHMARK
      .row
        button(@click="startBenchmark") START BENCHMARK
        button(@click="stopBenchmark") STOP BENCHMARK
        button(@click="killMiner") KILL MINER
    q-card-main.bg-white
      table.q-table.bordered.highlight.horizontal-delimiter.striped-odd.loose.full-width
          tr(v-for="algo, algoName in algos")
            td {{ algoName }}
            td Ccminer {{ algosSpeed[algoName] }} MH / S
</template>
<script>
  // import Store from 'electron-store'
  import algos from '@/store/algos'
  import { pickBy } from 'lodash'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSideLink, QToolbar
  } from 'quasar'

  import path from 'path'

  const { exec } = require('child_process')

  // const store = new Store()

  // function sleep (time) {
  //   return new Promise((resolve) => setTimeout(resolve, time))
  // }

  export default {
    components: {
      QBtn,
      QCard,
      QCardMain,
      QIcon,
      QItemMain,
      QItemSide,
      QLayout,
      QSideLink,
      QToolbar
    },

    data () {
      return {
        algos: {},
        algosSpeed: {},
        dataObject: {}
      }
    },

    methods: {
      startBenchmark () {
        let algos = Object.keys(this.algos)
        console.log(algos)
        this.intervalMiningSpeed = setInterval(this.getMiningSpeed, 5000)
        this.currentAlgoName = algos.shift()
        this.spawnMiner()
        setTimeout(this.killMiner, 25000)
        this.intervalSpawnMiners = setInterval(() => {
          this.currentAlgoName = algos.shift()
          this.spawnMiner()
          if (algos.length === 0) {
            clearInterval(this.intervalSpawnMiners)
            setTimeout(() => { clearInterval(this.intervalMiningSpeed) }, 25000)
          }
          setTimeout(this.killMiner, 25000)
        }, 30000)
      },
      stopBenchmark () {
        clearInterval(this.intervalMiningSpeed)
        clearInterval(this.intervalSpawnMiners)
        this.killMiner()
      },
      spawnMiner () {
        let minerPath = path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner', '/Miners')
        let command = `start /wait ccminer -a ${this.currentAlgoName} --benchmark`
        console.log(command)
        this.process = exec(command, {
          cwd: minerPath
        })
        // console.log(this.process)
      },
      getMiningSpeed () {
        console.log(this.currentAlgoName)
        let ip = 'localhost'
        let port = 4068
        let ws = new WebSocket('ws://' + ip + ':' + port + '/summary', 'text')
        ws.onmessage = (evt) => {
          let dataArray = evt.data.split(';')
          let dataObject = {}
          let key, value
          dataArray.forEach((element) => {
            [key, value] = element.split('=')
            dataObject[key] = value
          })
          console.log(dataObject.ALGO)
          console.log(dataObject.KHS)
          this.$set(this.algosSpeed, dataObject.ALGO, (dataObject.KHS / 1000).toFixed(2))
          // ws.close()
        }
      },
      killMiner () {
        // console.log(this.process.pid)
        exec(`taskkill /pid ${this.process.pid} /F /T`)
      }
    },

    mounted () {
      this.algos = pickBy(algos, (algo, algoName) => {
        return algo.miners.gpu
      })
    }
  }
</script>
<style lang="stylus" scoped>
</style>
