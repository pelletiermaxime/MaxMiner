import { map } from 'lodash'
import Vue from 'vue'

async function queryMap (query, nodeName) {
  let result = await Vue.lokka.query(query)
  return map(result.viewer[nodeName].edges, 'node')
}

export { queryMap }
