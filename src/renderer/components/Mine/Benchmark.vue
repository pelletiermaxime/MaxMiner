<template lang="pug">
.mine-benchmark
  h1.text-center Mine
  q-card
    q-card-main.bg-white
      .row
        .col-6.
          BENCHMARK
      .row
        button(@click="spawnMiner") SPAWN MINER
        button(@click="spawnMiner2") SPAWN MINER2
        button(@click="spawnMiner3") SPAWN MINER3
</template>
<script>
  // import currencies from '@/store/currencies'
  // import Store from 'electron-store'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSideLink, QToolbar
  } from 'quasar'

  import path from 'path'

  // const { spawn } = require('child_process')
  const { exec } = require('child_process')

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
      QSideLink,
      QToolbar
    },

    data () {
      return {
        allCoinsInfo: {}
      }
    },

    methods: {
      spawnMiner () {
        let minerPath = path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner', '/Miners')
        exec(`${minerPath}/ccminer`, (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            return
          }

          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
        })
      },
      spawnMiner2 () {
        let minerPath = path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner', '/Miners')
        exec(`cmd /c ${minerPath}/ccminer`, function callback (error, stdout, stderr) {
          console.log(error)
          console.log(stdout)
          console.log(stderr)
          console.log('started console app')
        })
      },
      spawnMiner3 () {
        let minerPath = path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner', '/Miners')
        exec(`start ${minerPath}/ccminer`, function callback (error, stdout, stderr) {
          console.log(error)
          console.log(stdout)
          console.log(stderr)
          console.log('started console app')
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>
