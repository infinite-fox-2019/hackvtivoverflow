import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    islogin: false,
    questions: '',
    newQuestion: '',
    answers: ''
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
    },
    NEW_QUESTION (state, payload) {
      state.newQuestion = payload;
    },
    REGISTER_STATUS_LOGIN (state,payload) {
      state.user = payload.data
      state.islogin = true
    },
    GET_ANSWER (state, payload) {
      state.answers = payload
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
    register ({ commit }, payload) {
      return new Promise ((resolve,reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/register',
          data: {
            username: payload.username,
            password: payload.password,
            email: payload.email
          }
        })
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            commit('REGISTER_STATUS_LOGIN', data)
            resolve(data.msg)
          })
          .catch(err => {
            reject(err)
          })
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
    },
    sendQuestion (context, payload) {
      return new Promise ((resolve,reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/questions/ask',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.question,
            tags: payload.tags
          }
        })
          .then(({data}) => {
            context.commit('NEW_QUESTION', data.question);
            resolve(data.msg)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getAnswer (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/answers/${payload}`
        })
            .then(({data}) => {
              context.commit('GET_ANSWER', data)
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
      })
    },
    plusVote (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/questions/up`,
          data: {
            id: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    minVote (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'patch',
          url: 'http://localhost:3000/questions/down',
          data: {
            id: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    plusVoteAnswer (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'patch',
          url: 'http://localhost:3000/answers/up',
          data: {
            id: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    minVoteAnswer (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'patch',
          url: 'http://localhost:3000/answers/down',
          data: {
            id: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
