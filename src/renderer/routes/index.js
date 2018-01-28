export default [
  {
    name: 'home',
    path: '/',
    component: require('@/components/Home').default
  },
  {
    name: 'mine',
    path: '/mine',
    component: require('@/components/Mine').default,
    children: [
      {
        name: 'mine-index',
        path: 'index',
        component: require('@/components/Mine/Index').default
      },
      {
        name: 'mine-benchmark',
        path: 'benchmark',
        component: require('@/components/Mine/Benchmark').default
      },
      {
        name: 'mine-miners',
        path: 'miners',
        component: require('@/components/Mine/Miners').default
      },
      {
        name: 'mine-algos',
        path: 'algos',
        component: require('@/components/Mine/Algos').default
      }
    ]
  },
  {
    name: 'pools',
    path: '/pools',
    component: require('@/components/Pools').default
  },
  {
    name: 'profits',
    path: '/profit-calculator',
    component: require('@/components/Profits').default
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: require('@/components/Portfolio').default
  },
  {
    name: 'settings',
    path: '/settings',
    component: require('@/components/Settings').default,
    children: [
      {
        name: 'settings-addresses',
        path: 'addresses',
        component: require('@/components/Settings/Addresses').default
      },
      {
        name: 'settings-markets',
        path: 'markets',
        component: require('@/components/Settings/Markets').default
      },
      {
        name: 'settings-index',
        path: 'index',
        component: require('@/components/Settings/Index').default
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
