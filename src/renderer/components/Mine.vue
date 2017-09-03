<template lang="pug">
q-layout(ref="layout")
  q-toolbar(slot="header")
    q-btn(flat, @click="$refs.layout.toggleLeft()")
      q-icon(name="menu")
  div(slot="left")
    q-side-link(item, to="/mine/index")
      q-item-main(label="Index", sublabel="Mine")
    q-side-link(item, to="/mine/addresses")
      q-item-main(label="Addresses", sublabel="Setup coin addresses")
    q-side-link(item, to="/mine/benchmark")
      q-item-main(label="Benchmark", sublabel="Benchmark miners")
  router-view.layout-view
</template>
<script>
  // import currencies from '@/store/currencies'
  // import Store from 'electron-store'
  import {
    QBtn, QCard, QCardMain, QIcon, QItemMain, QItemSide,
    QLayout, QSideLink, QToolbar
  } from 'quasar'

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
    }
  }
</script>
<style lang="stylus">
.layout-aside-left
  width 200px
</style>
