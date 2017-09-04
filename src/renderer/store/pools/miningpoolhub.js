export default async (pool, http) => {
  let algos = {}
  let result = await http.get(pool.url)
  let data = result.data.return

  Object.keys(data).map((key, index) => {
    let algo = data[key]
    algo.algo = algo.algo.toLowerCase()
    algo.profit /= 1000
    if (algo.algo === 'equihash') {
      algo.profit /= 1000000
    }
    if (algo.algo === 'ethash') {
      algo.algo = 'daggerhashimoto'
    }
    if (!algos[algo.algo]) {
      algos[algo.algo] = {
        estimate_current: algo.profit,
        name: algo.algo
      }
    }
  })

  return algos
}
