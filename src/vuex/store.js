/**
 * Created by szatpig on 2017/9/26.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import other from './modules/other'
import address from './modules/address'
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    user,other,address
  }
})
