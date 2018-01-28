import { map } from 'lodash'
import Vue from 'vue'

async function queryMap (query, nodeName) {
  let result = await Vue.lokka.query(query)
  return map(result.viewer[nodeName].edges, 'node')
}

export { queryMap }

export const ALL_POOLS = `
  {
    viewer {
      allPools(where: {active: {eq: true} }) {
        edges {
          node {
            url
            name
            type
            logo
          }
        }
      }
    }
  }
`
