import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Quasar from 'quasar-framework'
Vue.use(Quasar)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
})
