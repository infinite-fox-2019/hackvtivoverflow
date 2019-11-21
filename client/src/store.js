import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    questions: []
  },
  getters : {
    myQuestions(){
      // console.log(this.state.questions)
      // return state.questions
    }
  },
  mutations: {
    LOGIN(state,payload){
      state.login = payload
    },
    STORE_QUESTION(state,payload){
      state.questions = payload
    }
  },
  actions: {
    loggingIn(context,payload){
      console.log(payload)
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'post',
          // url: 'http://localhost:3000/users/login',
          url: 'http://54.179.189.163/users/login',
          data : {
            email: payload.email,
            password: payload.password
          }
        })
          .then((token)=>{
            localStorage.setItem('token',token.data.token)
            context.commit('LOGIN',true)
            console.log(token);
            resolve()
          })
          .catch((err)=>{
            console.log(err);
            reject(err)
          })
      })
    },
    register(context,payload){
      console.log(payload);
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'post',
          // url: 'http://localhost:3000/users/add',
          url: 'http://54.179.189.163/users/add',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then((token)=>{
            localStorage.setItem('token',token.data.token)
            context.commit('LOGIN',true)
            resolve()
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    getQuestions(context){
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'get',
          // url: 'http://localhost:3000/questions'
          url: 'http://54.179.189.163/questions'
          
        })
          .then((question)=>{
            // console.log(question);
            console.log(question.data)
            context.commit('STORE_QUESTION',question.data)
            resolve(question.data)
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    getScore(context,payload){
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'get',
          // url: `http://localhost:3000/questions/score/${payload}`
          url: `http://54.179.189.163/questions/score/${payload}`
        })
          .then((score)=>{
            resolve(score.data)
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    submitQuestion(context,payload){
      console.log(payload,'ini payload dari store');
      let token = localStorage.getItem('token')
      return new Promise ((resolve, reject)=>{
        Axios({
          method: 'post',
          // url : 'http://localhost:3000/questions/add',
          url : 'http://54.179.189.163/questions/add',
          data : {
            payload
          },
          headers : {
            token
          }
        })
          .then((report)=>{
            console.log(report)
            resolve()
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    getQuestion(context,payload){
      console.log(payload)
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'get',
          // url: `http://localhost:3000/questions/${payload}`
          url: `http://54.179.189.163/questions/${payload}`
        })
          .then((question)=>{
            resolve(question)
          })
          .catch((err)=>{
            console.log(err);
            reject(err)
          })
      })
    },
    getAnswerScore(context,payload){
      console.log(payload)
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'get',
          // url: `http://localhost:3000/answers/score/${payload}`
          url: `http://54.179.189.163/answers/score/${payload}`
          
        })
          .then((question)=>{
            resolve(question)
          })
          .catch((err)=>{
            reject(err)
          })
      })
    },
    submitAnswer(context,payload){
      console.log(payload)
      let token = localStorage.getItem('token')
      console.log(token)
      return new Promise ((resolve,reject)=>{
        Axios({
          method: 'post',
          // url: `http://localhost:3000/answers/add`,
          url: `http://54.179.189.163/answers/add`,
          
          data : {
            payload
          },
          headers : {
            token
          }
        })
          .then((success)=>{
            console.log(success)
            resolve()
          })
          .catch((err)=>{
            console.log(err);
            reject()
          })
      })
    },
    upvoteQuest(context,payload){
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/questions/upvote/${payload}`,
          url: `http://54.179.189.163/questions/upvote/${payload}`,
          
          headers: {
            token
          }
        })
          .then((report)=>{
            console.log(report)
            resolve()
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    downvoteQuest(context,payload){
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/questions/downvote/${payload}`,
          url: `http://54.179.189.163/questions/downvote/${payload}`,
          
          headers: {
            token
          }
        })
          .then((report)=>{
            console.log(report)
            resolve()
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    upvoteAnswer(context,payload){
      console.log(payload)
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/answers/upvote/${payload}`,
          url: `http://54.179.189.163/answers/upvote/${payload}`,
          
          headers: {
            token
          }
        })
          .then((report)=>{
            console.log(report)
            resolve()
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    downvoteAnswer(context,payload){
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/answers/downvote/${payload}`,
          url: `http://54.179.189.163/answers/downvote/${payload}`,
          
          headers: {
            token
          }
        })
          .then((report)=>{
            console.log(report)
            resolve()
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    deleteQuestion(context,payload){
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'delete',
          // url: `http://localhost:3000/questions/${payload}`,
          url: `http://54.179.189.163/questions/${payload}`,
          
          headers: {
            token
          }
        })
          .then((success)=>{
            console.log(success)
            resolve(success)
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    updateQuestion(context,payload){
      let token = localStorage.getItem('token')
      let {id,title,desc,tags} = payload 
      console.log(payload,'ini payload dari store')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/questions/${id}`,
          url: `http://54.179.189.163/questions/${id}`,
          
          headers: {
            token
          },
          data: {
            title,desc,tags
          }
        })
          .then((report)=>{
            console.log(report);
            resolve(report)
          })
          .catch((err)=>{
            console.log(err);
            reject(err)
          })
      })
    },
    getMyAnswer(context,payload){
      let token = localStorage.getItem('token')
      console.log(payload)
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'get',
          // url: `http://localhost:3000/answers/specific/${payload}`,
          url: `http://54.179.189.163/answers/specific/${payload}`,
          
          headers : {
            token
          }
        })
          .then((answers)=>{
            console.log(answers)
            resolve(answers)
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
    },
    updateAnswer(context,payload){
      console.log(payload)
      let token = localStorage.getItem('token')
      return new Promise((resolve,reject)=>{
        Axios({
          method: 'patch',
          // url: `http://localhost:3000/answers/${payload.id}`,
          url: `http://54.179.189.163/answers/${payload.id}`,
          
          data: {
            desc : payload.desc
          },
          headers: {
            token
          }
        })
          .then((report=>{
            console.log(report)
            resolve(report)
          }))
          .catch((err)=>{
            reject(err)
          })
      })
    }
  }
})
