import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    islogin: false,
    questions: ''
  },
  mutations: {
    LOGIN_SUCCESS (state, payload) {
      state.user = payload;
      state.islogin = true;
    },
    LOGOUT (state) {
      state.islogin = false;
      state.user = ''
    }, 
    CHECK_LOGIN (state, payload) {
      state.islogin = payload.status;
      state.user = payload.user;
    },
    FETCHING_DATA (state, payload) {
      state.questions = payload;
    }
  },
  actions: {
    fetchData ({ commit }) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/questions'
        })
          .then(({data}) => {
            commit('FETCHING_DATA', data);
            resolve(data)
          })
          .catch(err => {
            rejext(err.response.data.msg)
          });
      })
    },
    signout ({ commit }) {
      localStorage.removeItem('token');
      commit('LOGOUT')
    },
    login({ commit }, payload ) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.token);
            commit('LOGIN_SUCCESS', data.user);
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    checklogin ({ commit }) {
      if(localStorage.getItem('token')) {
        axios({
          method: 'get',
          url: 'http://localhost:3000/users',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            const payload = {
              status: true,
              user: data
            }
            commit('CHECK_LOGIN', payload)
          })
          .catch(err=>{
            console.log(err)
          })
      } else {
        commit('CHECK_LOGIN', false)
      }
    }
  },
  modules: {
  }
})
