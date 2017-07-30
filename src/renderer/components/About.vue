<template>

  <div>
    <p class="caption">Information</p>
    <div class="list striped">
      <div class="item">
        <div class="item-content">
          Vue.js: {{ vue }}
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          Electron: {{ electron }}
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          Node: {{ node }}
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          Platform: {{ platform }}
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          Graphics:
          <span v-for="(graphic, index) in graphics" v-bind:key="index">
            {{ graphic.vendor }} {{ graphic.model }}<br>
          </span>
        </div>
      </div>
    </div>
  </div>
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
