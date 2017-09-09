export default async (pool, http) => {
  let algos = {}
  let d = new Date()
  let startTime = d.setDate(d.getDate() - 1)
  startTime -= 100000000

  let poolURLScrypt = `${pool.url}Scrypt&startTime=${startTime}`
  let result = await http.get(poolURLScrypt)
  let data = result.data[0]
  algos['scrypt'] = {
    estimate_current: 0,
    actual_last24h: (data.expectedPayoutBtc * 1000).toFixed(6),
    name: 'scrypt'
  }

  let poolURLX11 = `${pool.url}X11&startTime=${startTime}`
  result = await http.get(poolURLX11)
  data = result.data[0]
  algos['x11'] = {
    estimate_current: 0,
    actual_last24h: (data.expectedPayoutBtc * 1000).toFixed(6),
    name: 'x11'
  }

  return algos
}
