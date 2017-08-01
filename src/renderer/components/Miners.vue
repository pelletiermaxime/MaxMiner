<template lang="pug">
.miners
  .card
    .card-title Ccminer tpruvot version
    .card-content
      .row.
        Main ccminer version by Tanguy Pruvot, fork of the original version by Christian Buchner.
      .row
        .width-1of5
          a(href="http://ccminer.org") Homepage
        .width-1of5
          a(href="https://github.com/tpruvot/ccminer") Source code
        .width-2of5
          a(@click="downloadMiner")
            i.download-icon file_download
          span(v-if="downloadProgressPercent != -1").
            Downloading... {{ downloadProgressPercent }}%
      .row.
        {{ downloadPath }}
  //- .card
    .card-title Card Title
    .card-content Card Content
</template>
<script>
import path from 'path'
import request from 'request'
import fs from 'fs'
import url from 'url'

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
  data () {
    return {
      downloadPath: path.join(this.$electron.remote.app.getPath('appData'), '/MaxMiner/'),
      downloadProgressPercent: -1
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
          that.downloadProgressPercent = percentage.toFixed(2)
          console.log(`${percentage} % | ${received} bytes out of ${total} bytes`)
        }
      }).then(function () {
        that.downloadProgressPercent = -1
        alert('File successfully downloaded')
      })
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
.miners
  padding: 1.5rem 2rem
.download-icon
  font-size: 2.5rem
  margin-top: -0.5rem
</style>
