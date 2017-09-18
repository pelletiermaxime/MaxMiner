<template lang="pug">
q-layout(ref="layout")
  q-toolbar(slot="header")
    q-btn(flat, @click="$refs.layout.toggleLeft()")
      q-icon(name="menu")
  div(slot="left")
    q-side-link(item, to="/settings/index")
      q-item-main(label="Index", sublabel="Settings")
    q-side-link(item, to="/settings/addresses")
      q-item-main(label="Addresses", sublabel="Setup coin addresses")
    q-side-link(item, to="/settings/markets")
      q-item-main(label="Markets", sublabel="Setup markets")
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
