import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/myaxios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hello: 'Hai...',
    user: '',
    email: '',
    isLogin: false,
    question: {}
  },
  mutations: {
    CHANGE_MESSAGE (state) {
      state.hello = 'Hello Hacktiv'
    },
    SET_LOGIN (state) {
      state.isLogin = true
      state.user = localStorage.getItem('name')
      state.email = localStorage.getItem('email')
    },
    SET_LOGOUT (state) {
      state.isLogin = false
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'register',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    login ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            commit('SET_LOGIN')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    logout ({ commit }) {
      Vue.notify({
        group: 'notify',
        title: 'Logout',
        text: 'See u later!'
      })
      localStorage.removeItem('token')
      commit('SET_LOGOUT')
    },
    fetchQuestionId ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/questions/${payload}`,
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_QUESTION', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchQuestions ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: '/questions',
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    newQuestion ({ commit, state }, { title, desc }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/questions',
          headers: {
            'token': localStorage.getItem('token')
          },
          data: {
            title,
            desc
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    upVote ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `/questions/upvote/${payload}`,
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('fetchQuestionId', payload)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    }
  }
})
