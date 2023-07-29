// import Vue from 'vue'
// import Vuex from 'vuex'
import {userInfo,logout} from '@/api/api'

// Vue.use(Vuex)

const state = {
  roles:[], //角色
}
const getters = {
  roles:state=>state.roles
}
const mutations = {
  SETROLES:(state,data)=>{
    state.roles = data;   //设置state.roles
  }
}

const actions = {
  USERROLES({commit}){ //获取用户信息
    return new Promise((resolve,reject)=>{
      userInfo().then(res=>{
        console.log(res);
        let {data} = res.data;
        commit('SETROLES',data.roles);  //获取数据 缓存在vuex
        resolve(data.roles);
      }).catch(err=>{
        reject(err)
      })
    })
  },
  LOGOUT({commit}){ //退出登录
    return new Promise((resolve,reject)=>{
      logout().then(res=>{
        commit('SETROLES',[]);  //清空角色
        resolve();
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
export default{
  state,
  getters,
  mutations,
  actions
}
