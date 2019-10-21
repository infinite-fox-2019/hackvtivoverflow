import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    register: {
      name: '',
      password: '',
      email: '',
      _id: ''
    },
    token: ''
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
    }
  },
  actions: {
    login ({ commit }, payload) {
      swal.fire({
        title: 'login your User',
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
