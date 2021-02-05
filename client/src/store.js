import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let baseUrl = 'http://localhost:3000'
import axios from 'axios'
import errorHandler from './js/errorHandler'
import router from './router'

export default new Vuex.Store({
  state: {
    isLogin: (localStorage.getItem('token') ? true : false),
    allQuestions: []
  },
  mutations: {
    SET_LOGIN(state, data){
      state.isLogin = data
      console.log(state.isLogin)
    },
    SET_ALL_QUESTIONS(state, data){
      state.allQuestions = data
    }
  },
  actions: {
    updateQuestion(context, payload){
      Swal.showLoading()
      axios({
        url: `${baseUrl}/questions/edit/${payload.id}`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        },
        data:{
          title: payload.title,
          description: payload.description
        }
      })
      .then(({data})=>{
        Swal.close()
        router.push('/')
      })
      .catch(errorHandler)
    },
    updateAnswer(context, payload){
      Swal.showLoading()
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/answers/desc/${payload.id}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          },
          data:{
            description: payload.description
          }
        })
        .then(({data})=>{
          Swal.close()
          resolve(data)
        })
        .catch(errorHandler)
      })
    },
    removeAnswer(context, id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `${baseUrl}/answers/${id}`,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            router.push('/')
          })
          .catch(errorHandler)
        }
      })
    },
    removeQuestion(context, id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `${baseUrl}/questions/${id}`,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            router.push('/')
          })
          .catch(errorHandler)
        }
      })
    },
    login(context, payload){
      Swal.showLoading()
      axios({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: payload
      })
      .then(({data})=>{
        Swal.close()
        context.commit('SET_LOGIN', data.id)
        localStorage.setItem('id', data.id)
        localStorage.setItem('token', data.token)
        router.push('/')
      })
      .catch(errorHandler)

    },
    register(context, payload){
      return new Promise((resolve, reject)=>{
        Swal.showLoading()
        axios({
          url: `${baseUrl}/users/register`,
          method: 'post',
          data: payload
        })
        .then(({data})=>{
          Swal.close()
          resolve()
        })
        .catch(errorHandler)
      })
    },
    fetchQuestions(context, payload){
      axios({
        url: `${baseUrl}/questions/all`,
        method: 'get'
      })
      .then(({data})=>{
        context.commit('SET_ALL_QUESTIONS', data)
      })
      .catch(errorHandler)
    },
    comment(context, payload){
      Swal.showLoading()
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/answers/${payload.id}`,
          method: 'post',
          data: {
            description: payload.description
          },
          headers:{
  
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          resolve(data)
          Swal.close()
        })
        .catch(errorHandler)
      })
    },
    publish(context, payload){
      Swal.showLoading()
      axios({
        url: `${baseUrl}/questions`,
        method: 'post',
        data: payload,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        Swal.fire({
          type: 'success',
          title: 'Your question is online'
        })
        router.push('/')
      })
      .catch(errorHandler)
    },
    fetchAQuestion(context, id){
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/questions/find/${id}`,
          method: 'get'
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(errorHandler)
      })
    },
    upvoteAnswer(context, id){
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/answers/upvote/${id}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(errorHandler)
      })
    },
    downvoteAnswer(context, id){
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/answers/downvote/${id}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(errorHandler)
      })
    },
    upvoteQuestion(context, id){
      console.log(id)
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/questions/upvote/${id}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          console.log(data)
          resolve(data)
        })
        .catch(errorHandler)
      })
    },
    downvoteQuestion(context, id){
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/questions/downvote/${id}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(errorHandler)
      })
    },    
    fetchAllAnswers(context, id){
      return new Promise((resolve, reject)=>{
        axios({
          url: `${baseUrl}/answers/${id}`,
          method: 'get',
        })
        .then(({data})=>{
          console.log(data);
          resolve(data)
        })
        .catch(errorHandler)
      })
    }
  }
})
