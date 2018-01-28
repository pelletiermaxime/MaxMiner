import Vue from 'vue'
import Lokka from 'lokka'
import HttpTransport from 'lokka-transport-http'

const client = new Lokka({
  transport: new HttpTransport('https://us-west-2.api.scaphold.io/graphql/maxminer')
})

Vue.lokka = Vue.prototype.$lokka = client
