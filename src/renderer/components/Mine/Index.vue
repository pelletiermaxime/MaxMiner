<template lang="pug">
.mine-index
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
