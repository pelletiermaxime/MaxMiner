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
      name: 'about',
      path: '/about',
      component: require('@/components/About')
    },
    {
      name: 'algos',
      path: '/algos',
      component: require('@/components/Algos')
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
      path: '*',
      redirect: '/'
    }
  ]
})
