import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    detailQuestion: {},
    status: 'list'
  },
  mutations: {
    IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    GET_QUESTION (state, payload) {
      state.questions = payload
    },
    GET_DETAIL_QUESTION (state, payload) {
      state.detailQuestion = payload
    },
    CHANGE_STATUS (state, payload) {
      state.status = payload
    }
  },
  actions: {
    auth ({ commit }) {
      if (localStorage.getItem('token')) {
        commit('IS_LOGIN', true)
      } else {
        commit('IS_LOGIN', false)
      }
    },
    getQuestion ({ commit }) {
      return axios({
        method: 'get',
        url: `http://localhost:3000/question`
      })
        .then(({ data }) => {
          let questions = []
          data.forEach(el => {
            questions.push(el)
          })
          commit('GET_QUESTION', questions)
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: 'is-danger'
          })
        })
    },
    getDetailQuestion ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: `http://localhost:3000/question/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('GET_DETAIL_QUESTION', data)
            resolve(data)
          })
          .catch(err => {
            console.log(err.message)
          })
      })
    },
    changeStatus ({ commit }, payload) {
      commit('CHANGE_STATUS', payload)
    }
  }
})
