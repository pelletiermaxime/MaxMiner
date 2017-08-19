<template lang="pug">
.miners
  .card
    .card-title Ccminer tpruvot version
    .card-content
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
import { QBtn } from 'quasar'

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
    QBtn
  },

  data () {
    return {
      downloadPath: path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner', '/Miners'),
      downloadProgressPercent: 0
    }
  },

  methods: {
    downloadMiner () {
      if (!fs.existsSync(this.downloadPath)) {
        fs.mkdirSync(this.downloadPath)
      }
      let fileUrl = 'http://ccminer.org/preview/ccminer-2.2-skunk.7z'
      let fileName = path.basename(url.parse(fileUrl).pathname)
      let that = this
      downloadFile({
        remoteFile: fileUrl,
        localFile: path.join(this.downloadPath, fileName),
        onProgress: function (received, total) {
          let percentage = (received * 100) / total
          that.downloadProgressPercent = Math.round(percentage)
          // console.log(this.downloadProgressPercent)
          // console.log(`${percentage} % | ${received} bytes out of ${total} bytes`)
        }
      }).then(function () {
        that.downloadProgressPercent = 100
      })
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
.miners
  padding 1.5rem 2rem
</style>
