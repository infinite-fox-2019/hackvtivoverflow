import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    img: '',
    myQuestion: [],
    detailQuestion: {
      _id: '',
      title: '',
      description: '',
      upvotes: '',
      downvotes: '',
      userId: ''
    }
  },
  mutations: {
    IS_LOGIN (state) {
      state.isLogin = true
      state.img = 'https://api.adorable.io/avatars/20/' + localStorage.getItem('name')
    },
    IS_LOGOUT (state) {
      state.isLogin = false
    },
    MY_QUESTION (state, payload) {
      state.myQuestion = payload
    },
    DETAIL_QUESTION (state, payload) {
      state.detailQuestion._id = payload._id
      state.detailQuestion.title = payload.title
      state.detailQuestion.description = payload.description
      state.detailQuestion.upvotes = payload.upvotes
      state.detailQuestion.downvotes = payload.downvotes
      state.detailQuestion.userId = payload.userId
    },
    REMOVE_DATA (state) {
      state.detailQuestion._id = ''
      state.detailQuestion.title = ''
      state.detailQuestion.description = ''
      state.detailQuestion.upvotes = ''
      state.detailQuestion.downvotes = ''
      state.detailQuestion.userId = ''
    },
    UPDATE_QUESTION (state, payload) {
      state.detailQuestion._id = payload._id
      state.detailQuestion.title = payload.title
      state.detailQuestion.description = payload.description
      state.detailQuestion.upvotes = payload.upvotes
      state.detailQuestion.downvotes = payload.downvotes
      state.detailQuestion.userId = payload.userId
    }
  },
  actions: {
    findOne({commit},payload) {
      console.log('masuk findone');
      
      axios({
        method: 'get',
        url : `http://localhost:3000/question/${payload}`,
        headers: {token: localStorage.getItem('token')}
      })
      .then(({data})=>{
        console.log(data,'dari findone');
        
        commit('UPDATE_QUESTION',data)
        router.push(`/update/${data._id}`)
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    updateQue ({commit},payload) {
      console.log('masuk store');
      
      axios({
        method: 'put',
        url: `http://localhost:3000/question/${payload._id}`,
        headers: {token: localStorage.getItem('token')},
        data: {title: payload.title, description: payload.description}
      })
      .then(({data})=>{
        console.log(data);
        
        Swal.fire('success','updated success','success')
      })
      .catch(err=>{
        Swal.fire('error',err,'error')
      })
    },
    deleteQuestion ({ commit }, payload) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/question/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          Swal.fire('success', 'question deleted', 'success')
          commit('REMOVE_DATA')
        })
        .catch(err => {
          Swal.fire('error', err, 'error')
        })
    },
    getMyDetail ({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('DETAIL_QUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: { email: payload.email, password: payload.password }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          commit('IS_LOGIN')

          Swal.fire('success', `Welcome ${data.username}`, 'success')
          router.push('/questions')
        })
        .catch((err) => {
          err = JSON.parse(err.response.request.response).message[0]
          Swal.fire('error', err, 'error')
        })
    },
    register ({ commit }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: { username: payload.username, email: payload.email, password: payload.password }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          commit('IS_LOGIN')
          Swal.fire('success', `Welcome ${data.username}`, 'success')
          router.push('/questions')
        })
        .catch((err) => {
          err = JSON.parse(err.response.request.response).message[0]
          Swal.fire('error', err, 'error')
        })
    },
    logout ({ commit }) {
      Swal.fire('success', 'logout success', 'success')
      commit('IS_LOGOUT')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
    },
    personalQuestion ({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/question/personal',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data, 'ini data personal')

          commit('MY_QUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
