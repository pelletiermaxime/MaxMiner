import Vue from 'vue'

import App from './App'
import router from './plugins/vue-router'
import store from './store'
import quasar from './plugins/quasar'
import './plugins/lokka'
import './plugins/axios'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
