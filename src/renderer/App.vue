<template lang="pug">
  #app
    q-layout(ref="layout")
      q-toolbar(slot="header")
        q-toolbar-title(:padding="0") MaxMiner {{ version }}

      q-tabs(slot="navigation")
        q-route-tab(slot="title" to="/" replace label="Home")
        q-route-tab(slot="title" to="/mine" replace label="Mine")
        q-route-tab(slot="title" to="/miners" replace label="Miners")
        q-route-tab(slot="title" to="/algos" replace label="Algorithms")
        q-route-tab(slot="title" to="/pools" replace label="Pools")
        q-route-tab(slot="title" to="/profit-calculator" replace label="Profit calculator")
        q-route-tab(slot="title" to="/about" replace label="About")

      router-view.layout-view
</template>

<script>
  import { QLayout, QTabs, QRouteTab, QToolbar, QToolbarTitle } from 'quasar'
  export default {
    components: {
      QLayout,
      QTabs,
      QRouteTab,
      QToolbar,
      QToolbarTitle
    },
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
