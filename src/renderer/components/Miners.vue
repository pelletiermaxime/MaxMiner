<template lang="pug">
.miners
  q-card
    q-card-title Ccminer tpruvot version
    q-card-main
      .row.
        Main ccminer version by Tanguy Pruvot, fork of the original version by Christian Buchner.
      .row
        .width-2of5
          a(href="http://ccminer.org") Homepage
        .width-2of5
          a(href="https://github.com/tpruvot/ccminer") Source code
        .width-1of5
          q-btn(
            color="primary"
            :percentage="downloadProgressPercent"
            @click="downloadMiner") Download
            span(slot="loading") Downloading...
      .row.
        {{ downloadPath }}
</template>
<script>
import path from 'path'
import request from 'request'
import fs from 'fs'
import url from 'url'
import { QBtn, QCard, QCardMain, QCardTitle } from 'quasar'
// import decompress from 'decompress'
import { unzip } from 'cross-unzip'

function downloadFile (configuration) {
  return new Promise(function (resolve, reject) {
    let receivedBytes = 0
    let totalBytes = 0

    let req = request({
      method: 'GET',
      uri: configuration.remoteFile
    })

    let out = fs.createWriteStream(configuration.localFile)
    req.pipe(out)

    req.on('response', function (data) {
      totalBytes = +data.headers['content-length']
    })

    req.on('data', function (chunk) {
      receivedBytes += chunk.length
      if (configuration.hasOwnProperty('onProgress')) {
        configuration.onProgress(receivedBytes, totalBytes)
      }
    })

    req.on('end', function () {
      resolve()
    })
  })
}

export default {
  components: {
    QBtn,
    QCard,
    QCardMain,
    QCardTitle
  },

  data () {
    return {
      downloadPath: path.join(this.$electron.remote.app.getPath('appData'), 'MaxMiner', 'Miners'),
      downloadProgressPercent: 0
    }
  },

  methods: {
    downloadMiner (e, done) {
      if (!fs.existsSync(this.downloadPath)) {
        fs.mkdirSync(this.downloadPath)
      }
      let fileUrl = 'https://github.com/tpruvot/ccminer/releases/download/2.2.1-tpruvot/ccminer-x64-2.2.1-cuda9rc.7z'
      let fileName = path.basename(url.parse(fileUrl).pathname)
      let that = this
      downloadFile({
        remoteFile: fileUrl,
        localFile: path.join(this.downloadPath, fileName),
        onProgress: function (received, total) {
          let percentage = (received * 100) / total
          percentage = parseInt(percentage)
          console.log('Percentage: ' + percentage)
          that.downloadProgressPercent = percentage
        }
      }).then(() => {
        that.downloadProgressPercent = 100
        done()
        let minerPath = path.join(this.downloadPath, 'ccminer')
        if (!fs.existsSync(minerPath)) {
          fs.mkdirSync(minerPath)
        }
        console.log(path.join(this.downloadPath, fileName))
        // decompress(path.join(this.downloadPath, fileName), minerPath).then(files => {
        //   console.log(files)
        // })
        unzip(path.join(this.downloadPath, fileName), minerPath, (err) => {
          console.log(err)
        })
      })
    }
  }
}
</script>
<style lang="stylus">
.miners
  padding 1.5rem 2rem
</style>
