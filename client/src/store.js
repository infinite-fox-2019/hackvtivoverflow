import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from './api/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoginName: null,
    questionList: []
  },
  mutations: {
    LOGIN_STATUS_CHANGE (state, payload) {
      state.isLogin = payload
    },
    LOGIN_NAME_CHANGE (state, payload) {
      state.isLoginName = payload
    },
    CHANGE_QUESTION_LIST (state, payload) {
      state.questionList = payload
    }
  },
  actions: {
    A_LOGIN ({ commit }, payload) {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('_id', data._id)
          commit('LOGIN_STATUS_CHANGE', true)
          commit('LOGIN_NAME_CHANGE', localStorage.getItem('name'))
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err.response || err)
          Swal.fire(
            'Awwww!',
            err.response.data.msg,
            'error'
          )
        })
    },
    A_REGISTER ({ commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: '/users/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          dispatch('A_LOGIN', { email: data.email, password: payload.password })
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire(
            'Opps!',
            err.response.data.message,
            'error'
          )
        })
    },
    A_FETCH_QUESTION_LIST ({ commit, dispatch }, payload) {
      axios({
        method: 'get',
        url: '/questions',
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('CHANGE_QUESTION_LIST', data)
        })
        .catch(err => { console.log(err.response) })
    }
  }
})
