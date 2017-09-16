import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: require('@/components/Home')
    },
    {
      name: 'mine',
      path: '/mine',
      component: require('@/components/Mine'),
      children: [
        {
          name: 'mine-benchmark',
          path: 'benchmark',
          component: require('@/components/Mine/Benchmark')
        },
        {
          name: 'mine-index',
          path: 'index',
          component: require('@/components/Mine/Index')
        }
      ]
    },
    {
      name: 'miners',
      path: '/miners',
      component: require('@/components/Miners')
    },
    {
      name: 'algos',
      path: '/algos',
      component: require('@/components/Algos')
    },
    {
      name: 'pools',
      path: '/pools',
      component: require('@/components/Pools')
    },
    {
      name: 'profits',
      path: '/profit-calculator',
      component: require('@/components/Profits')
    },
    {
      name: 'portfolio',
      path: '/portfolio',
      component: require('@/components/Portfolio')
    },
    {
      name: 'settings',
      path: '/settings',
      component: require('@/components/Settings'),
      children: [
        {
          name: 'settings-addresses',
          path: 'addresses',
          component: require('@/components/Settings/Addresses')
        },
        {
          name: 'settings-markets',
          path: 'markets',
          component: require('@/components/Settings/Markets')
        },
        {
          name: 'settings-index',
          path: 'index',
          component: require('@/components/Settings/Index')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
