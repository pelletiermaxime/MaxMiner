import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home')
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About')
    },
    {
      path: '/miners',
      name: 'miners',
      component: require('@/components/Miners')
    },
    {
      path: '/profit-calculator',
      name: 'profits',
      component: require('@/components/Profits')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
