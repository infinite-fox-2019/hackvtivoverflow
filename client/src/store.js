import Vue from 'vue'
import Vuex from 'vuex'
import axios from './apis/axios'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    LOGIN (state, payload) {
      state.isLogin = true
      localStorage.setItem('token', payload)
      router.push('/')
    },
    LOGOUT (state) {
      state.isLogin = false
      localStorage.removeItem('token')
      router.push('/login')
    }
  },
  actions: {
    login ({ commit }, payload) {
      const { email, password } = payload
      axios({
        method: 'POST',
        url: '/users/login',
        data: { email, password }
      })
        .then(({ data }) => {
          commit('LOGIN', data.token)
        })
        .catch(alert)
    }
  }
})
