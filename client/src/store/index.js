import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import router from '../router'
import alert from '../helpers/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: {},
    isLogin: false,
    errMessages: '',
    questions: []
  },
  mutations: {
    SET_LOGGED_USER (state, payload) {
      state.loggedUser = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      axios.post('users/register', payload)
        .then(({ data }) => {
          const { username, email } = data
          commit('SET_LOGGED_USER', { username, email })
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
          commit('SET_LOGGED_USER', { username, email })
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push('/')
        })
        .catch(alert)
    },
    logout ({ commit }) {
      commit('SET_IS_LOGIN', false)
      commit('SET_LOGGED_USER', {})
      localStorage.clear()
    },
    fetchQuestions ({ commit }) {
      axios.get('/questions', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTIONS', data)
        })
        .catch(alert)
    },
    addQuestion ({ dispatch }, payload) {
      axios.post('/questions', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchQuestions')
          router.push('/questions')
        })
        .catch(alert)
    }
  },
  modules: {
  }
})
