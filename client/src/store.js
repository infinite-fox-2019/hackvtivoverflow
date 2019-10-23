import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    register: {
      name: '',
      password: '',
      email: '',
      _id: ''
    },
    token: '',
    listQuestion: [],
    upVotes: 0,
    downVotes: 0,
    question: {
      _id: '',
      title: '',
      description: '',
      tags: '',
      UserId: '',
      upVotes: [],
      downVotes: []
    }
  },
  mutations: {
    REGISTER (state, payload) {
      state.register.name = payload.name
      state.register.password = payload.password
      state.register.email = payload.email
      state.register._id = payload._id
    },
    LOGIN (state, payload) {
      state.token = payload
    },
    SIGNOUT (state, payload) {
      state.token = payload
    },
    SETLISTQUESTION (state, payload) {
      state.listQuestion = payload
    },
    CREATEQUESTION (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
    },
    QUESTIONDETAIL (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
      state.question.UserId = payload.UserId
      state.question.upVotes = payload.upVotes
      state.question.downVotes = payload.downVotes
    }
  },
  actions: {
    questionDetail ({ commit }, payload) {
      swal.fire({
        title: 'Fetching Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `http://localhost:3000/question/${payload}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        swal.close()
        commit('QUESTIONDETAIL', data)
      })
    },
    createQuestion ({ commit }, payload) {
      swal.fire({
        title: 'Creating Question',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/question',
        method: 'post',
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('CREATEQUESTION', data)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success creating question',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Creating question Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    setListQuestion ({ commit }) {
      swal.fire({
        title: 'Fetching Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/question',
        method: 'get'
      })
        .then(({ data }) => {
          commit('SETLISTQUESTION', data)
          swal.close()
        })
    },
    signOut ({ commit }) {
      swal.fire({
        title: 'signOut from your current user',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      commit('SIGNOUT', '')
      swal.close()
      swal.fire({
        type: 'success',
        title: 'SignOut success',
        showConfirmButton: false,
        timer: 2000
      })
    },
    login ({ commit }, payload) {
      swal.fire({
        title: 'logging to your User',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: {
          password: payload.password,
          email: payload.email
        }
      })
        .then(({ data }) => {
          commit('LOGIN', data)
          localStorage.setItem('token', data)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success to login',
            showConfirmButton: false,
            timer: 2000
          })
          router.push('/question')
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'login Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    register ({ commit }, payload) {
      swal.fire({
        title: 'Registering your User',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/register',
        method: 'post',
        data: {
          name: payload.name,
          password: payload.password,
          email: payload.email
        }
      })
        .then(({ data }) => {
          commit('REGISTER', data)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success to register',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'REGISTER Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }
})
