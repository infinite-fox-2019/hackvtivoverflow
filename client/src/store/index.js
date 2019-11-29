import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    islogin: false,
    questions: '',
    answers: '',
    allTags: ''
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
    REGISTER_STATUS_LOGIN (state,payload) {
      state.user = payload.data
      state.islogin = true
    },
    GET_ANSWER (state, payload) {
      state.answers = payload
    },
    SEND_QUESTION (state, payload) {
      state.questions.unshift(payload)
    },
    GET_TAGS (state, payload) {
      state.allTags = payload
    }
  },
  actions: {
    fetchTags (context, payload) {
      axios({
        method: 'get',
        url: '/questions/find/tags'
      })
        .then(({data}) => {
          context.commit('GET_TAGS', data.tag)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchData ({ commit }) {
      return new Promise ((resolve, reject) => {
      axios({
        method: 'get',
        url: '/questions'
      })
        .then(({data}) => {
        commit('FETCHING_DATA', data);
        resolve(data)
        })
        .catch(err => {
        reject(err.response.data.msg)
        });
      })
    },
    register ({ commit }, payload) {
      return new Promise ((resolve,reject) => {
      axios({
        method: 'post',
        url: '/users/register',
        data: {
        username: payload.username,
        password: payload.password,
        email: payload.email,
        city: payload.city
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
        url: '/users/login',
        data: {
        request: payload.request,
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
          url: '/users',
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
          url: '/questions/ask',
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
            context.commit('SEND_QUESTION', data.question)
            resolve(data)
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
        url: `/answers/${payload}`
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
        url: `/questions/up/${payload}`,
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
        url: `/questions/down/${payload}`,
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
          url: `/answers/up/${payload}`,
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
          url: `/answers/down/${payload}`,
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
