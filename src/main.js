import Vue from 'vue'
import App from '@/App'
import store from '@/vuex/store'

import '@/scss/app'

Vue.config.productionTip = false;
Vue.prototype.$store = store

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
