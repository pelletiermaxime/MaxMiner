import Vue from 'vue'
import axios from 'axios'

Vue.http = Vue.prototype.$http = axios
