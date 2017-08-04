<template lang="pug">
div
  p.caption Information
  .list.striped
    .item
      .item-content.
        Vue.js: {{ vue }}
    .item
      .item-content.
        Electron: {{ electron }}
    .item
      .item-content.
        Node: {{ node }}
    .item
      .item-content.
        Platform: {{ platform }}
    .item
      .item-content
        | Graphics:
        span(v-for="(graphic, index) in graphics", v-bind:key="index").
          {{ graphic.vendor }} {{ graphic.model }}<br>
</template>

<script>
  const si = require('systeminformation')
  export default {
    data () {
      return {
        electron: process.versions['atom-shell'],
        node: process.versions.node,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        graphics: null
      }
    },

    methods: {
    },

    mounted () {
      si.graphics()
        .then(data => { this.graphics = data.controllers })
        .catch(error => console.error(error))
    }
  }
</script>

<style scoped>
</style>
