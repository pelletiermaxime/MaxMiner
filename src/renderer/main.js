
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Quasar from 'quasar'
import 'quasar-extras/material-icons'
import 'quasar-extras/roboto-font'

Vue.use(Quasar)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
