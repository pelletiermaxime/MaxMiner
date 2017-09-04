export default async (pool, http) => {
  let algos = {}
  let result = await http.get(pool.url)
  let data = result.data.result.simplemultialgo

  Object.keys(data).map((key, index) => {
    let algo = data[key]
    algo.paying /= 1000
    if (algo.name === 'equihash') {
      algo.paying /= 1000000
    }
    if (algo.name === 'lyra2rev2') {
      algo.name = 'lyra2v2'
    }
    algos[algo.name] = {
      estimate_current: algo.paying,
      name: algo.name
    }
  })

  return algos
}
