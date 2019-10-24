import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoginName: null
  },
  mutations: {
    LOGIN_STATUS_CHANGE(state, payload){
      state.isLogin = payload
    },
    LOGIN_NAME_CHANGE(state, payload){
      state.isLoginName = payload
    }
  },
  actions: {
    A_LOGIN({commit},payload){
      axios({
        method:'post',
        url: '/users/login',
        data:{
          email: payload.email,
          password: payload.password
        }
      })
        .then(({data}) => {
          localStorage.setItem('access_token',data.access_token)
          localStorage.setItem('name', data.name)
          commit('LOGIN_STATUS_CHANGE', true)
          commit('LOGIN_NAME_CHANGE', localStorage.getItem('name'))
          router.push({path:'/'})
        })
        .catch(err => {console.log(err.response || err)})
    },
    A_REGISTER({commit,dispatch}, payload){
      console.log(payload)
      axios({
        method:'post',
        url: '/users/register',
        data:{
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({data}) => {
          console.log(data)
          dispatch('A_LOGIN', {email:data.email,password:payload.password})
        })
        .catch(err => {console.log(err.response)})
    }
  }
})
