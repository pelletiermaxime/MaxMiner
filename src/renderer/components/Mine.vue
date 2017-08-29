<template lang="pug">
q-layout(ref="layout")
  q-toolbar(slot="header")
    q-btn(flat, @click="$refs.layout.toggleLeft()")
      q-icon(name="menu")
  div(slot="left")
    q-side-link(item, to="/twitter")
      q-item-side(icon="rss feed")
      q-item-main(label="Twitter", sublabel="@quasarframework")
  h1.text-center Mine
  q-card
    q-card-main.bg-white
      .row
        .col-6.
          INDEX
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
<style lang="stylus" scoped>
</style>
