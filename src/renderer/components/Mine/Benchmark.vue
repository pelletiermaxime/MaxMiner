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
        button(@click="killMiner") KILL MINER
</template>
<script>
  // import currencies from '@/store/currencies'
  // import Store from 'electron-store'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSideLink, QToolbar
  } from 'quasar'

  import path from 'path'

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
        let command = 'start /wait ccminer -a sia -i 10 --benchmark'

        this.process = exec(command, {
          cwd: minerPath
        }, function callback (error, stdout, stderr) {
          console.log(error)
          console.log(stdout)
          console.log(stderr)
          console.log('started console app')
        })
        console.log(this.process)
      },
      killMiner () {
        // console.log(this.process.pid)
        exec(`taskkill /pid ${this.process.pid} /F /T`)
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>
