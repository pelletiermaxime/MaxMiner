<template lang="pug">
  #app
    q-layout(ref="layout")
      q-toolbar(slot="header")
        q-toolbar-title(:padding="0") MaxMiner {{ version }}
      q-tabs(slot="navigation")
        q-route-tab(slot="title" to="/" replace label="Home")
        q-route-tab(slot="title" to="/mine/index" replace label="Mine")
        q-route-tab(slot="title" to="/pools" replace label="Pools")
        q-route-tab(slot="title" to="/profit-calculator" replace label="Profit calculator")
        q-route-tab(slot="title" to="/portfolio" replace label="Portfolio")
        q-route-tab(slot="title" to="/settings/index" replace label="Settings")
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
