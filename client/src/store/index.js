import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    answers: []
  },
  mutations: {
    login (state, payload) {
      state.isLogin = true
    },
    logout (state, payload) {
      state.isLogin = false
    },
    questions (state, payload) {
      state.questions = payload
    },
    question (state, payload) {
      state.question = payload
    },
    answers (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    login ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/login ',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
            commit('login')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/register ',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
            commit('login')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    askquestion ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/question',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.description
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getAllQuestion ({ state, commit }, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/question'
      })
        .then(({ data }) => {
          commit('questions', data)
        })
    },
    getAnswer ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: `http://localhost:3000/question/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('question', data)
            console.log(state.question)

            return axios({
              method: 'get',
              url: `http://localhost:3000/answer/${payload}`,
              headers: {
                token: localStorage.getItem('token')
              }
            })
          })
          .then(({ data }) => {
            commit('answers', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addAnswer ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `http://localhost:3000/answer/${state.question._id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            description: payload.description
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateQuestion ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'put',
          url: `http://localhost:3000/question/${state.question._id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.description
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteQuestion ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `http://localhost:3000/question/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateAnswer ({ state, commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'put',
          url: `http://localhost:3000/answer/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            description: payload.description
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
