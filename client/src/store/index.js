import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import router from '../router'
import alert from '../helpers/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {},
    isLogin: false,
    errMessages: ''
  },
  mutations: {
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      axios.post('users/register', payload)
        .then(({ data }) => {
          const { username, email } = data
          commit('SET_CURRENT_USER', { username, email })
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(alert)
    },
    login ({ commit }, payload) {
      axios.post('users/login', payload)
        .then(({ data }) => {
          const { username, email } = data
          commit('SET_CURRENT_USER', { username, email })
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(alert)
    },
    logout ({ commit }, payload) {
      commit('SET_IS_LOGIN', false)
      commit('SET_CURRENT_USER', {})
      localStorage.clear()
    }
  },
  modules: {
  }
})
