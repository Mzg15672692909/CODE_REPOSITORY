import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'  //用户管理
import permission from './modules/permission'  //权限管理

export default new Vuex.Store({
  modules: {
    user,
    permission
  }
})
