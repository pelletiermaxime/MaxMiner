export default async (pool, http) => {
  console.log('YIIMP')
  let algos = {}
  let poolURL = `${pool.url}/api/status`
  let result = await http.get(poolURL)
  let data = result.data

  Object.keys(data).map((key, index) => {
    let algo = data[key]
    let algoInGH = ['blake2s', 'blakecoin', 'equihash', 'sha256', 'x11']
    if (algoInGH.indexOf(algo.name) !== -1) {
      algo.estimate_current /= 1000
      algo.actual_last24h /= 1000
      algo.estimate_last24h /= 1000
    }
    if (algo.name === 'sha256' && pool.name === 'zpool') { // TH
      algo.actual_last24h /= 1000
      algo.estimate_current /= 1000
      algo.estimate_last24h /= 1000
    }
    algos[algo.name] = algo
  })

  return algos
}
