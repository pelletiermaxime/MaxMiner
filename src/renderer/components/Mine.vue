<template lang="pug">
q-layout(ref="layout")
  q-toolbar(slot="header")
    q-btn(flat, @click="$refs.layout.toggleLeft()")
      q-icon(name="menu")
  div(slot="left")
    q-side-link(item, to="/mine/index")
      q-item-main(label="Index", sublabel="Mine")
    q-side-link(item, to="/mine/benchmark")
      q-item-main(label="Benchmark", sublabel="Benchmark miners")
    q-side-link(item, to="/mine/miners")
      q-item-main(label="Miners", sublabel="Download and setup miners")
  router-view.layout-view
</template>
<script>
  import {
    QBtn, QIcon, QItemMain, QLayout, QSideLink, QToolbar
  } from 'quasar'

  export default {
    components: {
      QBtn,
      QIcon,
      QItemMain,
      QLayout,
      QSideLink,
      QToolbar
    }
  }
</script>
<style lang="stylus">
.layout-aside-left
  width 200px
</style>
