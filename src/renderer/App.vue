<template>
  <div id="app">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="0">
          MaxMiner {{ version }}
        </q-toolbar-title>
      </div>

      <q-tabs slot="navigation">
        <q-tab icon="view_quilt" route="/" replace>Home</q-tab>
        <q-tab icon="view_day" route="/mine" replace>Mine</q-tab>
        <q-tab icon="view_quilt" route="/miners" replace>Miners</q-tab>
        <q-tab icon="view_day" route="/currencies" replace>Currencies</q-tab>
        <q-tab icon="view_day" route="/pools" replace>Pools</q-tab>
        <q-tab icon="view_day" route="/profit-calculator" replace>Profit calculator</q-tab>
        <q-tab icon="input" route="/about" replace>About</q-tab>
      </q-tabs>
      <router-view class="layout-view"></router-view>
    </q-layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        version: require('../../package.json').version
      }
    }
  }
</script>

<style lang="stylus">
  @import 'themes/app.mat.styl'
  html
    background-color: $background-color
</style>
