import Vue from 'vue'
import Vuex from 'vuex'
import axios from './apis/axios'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    answers: [],
    keyword: ''
  },
  mutations: {
    LOGIN (state, payload) {
      state.isLogin = true
      localStorage.setItem('token', payload)
      router.push('/')
    },
    VERIFY (state, payload) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      localStorage.removeItem('token')
      router.push('/login')
    },
    GET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    GET_ANSWERS (state, payload) {
      state.answers = payload
    },
    GET_A_QUESTION (state, payload) {
      state.question = payload
    },
    UPDATE_KEYWORD (state, payload) {
      state.keyword = payload.keyword
    }
  },
  actions: {
    register (context, payload) {
      const { name, email, password } = payload
      return new Promise ((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/users/register',
          data: { name, email, password }
        })
        .then(({ data }) => {
          router.push('/login')
          resolve(data.message)  
        })
        .catch(({ response }) => {
          reject(response.data)
        })
      })
    },
    login ({ commit }, payload) {
      return new Promise ((resolve, reject) => {
        const { email, password } = payload
        axios({
          method: 'POST',
          url: '/users/login',
          data: { email, password }
        })
        .then(({ data }) => {
          commit('LOGIN', data.token)
          resolve('Welcome back')
        })
        .catch(({ response }) => {
          reject(response.data)
        })
      })
    },
    fetchQuestions ({ commit }) {
      let keyword = this.state.keyword
      axios({
        method: 'GET',
        url: `/questions?keyword=${keyword}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('GET_QUESTIONS', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    getQuestionById ({ commit }, payload) {
      const { id } = payload
      axios({
        method: 'GET',
        url: `/questions/${id}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('GET_A_QUESTION', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    getMyQuestions (context) {
      axios({
        method: 'GET',
        url: `/questions/my`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          context.commit('GET_QUESTIONS', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    askQuestion ({ commit }, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/questions',
          data: payload,
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          resolve()
          router.push('/')
        })
        .catch(({ response }) => {
          reject(response.data)
        })
      })
    },
    updateQuestion ({ commit }, payload) {
      const { id, title, description, tags } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/questions/${id}`,
          data: { title, description, tags },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data.message)
          })
          .catch(({ response }) => {
            reject(response.data.message)
          })
      })
    },
    fetchAnswers ({ commit }, payload) {
      const { questionId } = payload
      axios({
        method: 'GET',
        url: `/answers/question/${questionId}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('GET_ANSWERS', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    getAnswer (context, payload) {
      const { id } = payload
      axios({
        method: 'GET',
        url: `/answers/${id}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          router.push(`/answer/${id}`)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    addAnswer (context, payload) {
      return new Promise ((resolve, reject) => {

        const { description, questionId } = payload
        axios({
          method: 'POST',
          url: '/answers',
          data: { description, questionId },
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          resolve('Success add answer')
          context.dispatch('fetchAnswers', { questionId })
        })
        .catch(({ response })=>{
          reject(response.data)
        })
      })
    },
    updateAnswer (context, payload) {
      return new Promise ((resolve, reject) => {
        const { description, id } = payload
        axios({
          method: 'PATCH',
          url: `/answers/${id}`,
          data: { description },
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          resolve(data.message)
          router.push('/')
        })
        .catch(({ response}) => {
          reject(response.data)
        })
      })
    },
    verifyToken ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/users/verify',
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            commit('VERIFY')
            resolve()
          })
          .catch(({ response }) => {
            reject(response.data.message)
          })
      })
    },
    qUpVote (context, payload) {
      const { questionId } = payload
      axios({
        method: 'PATCH',
        url: 'questions/upvote',
        data: { questionId },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    qDownVote (context, payload) {
      const { questionId } = payload
      axios({
        method: 'PATCH',
        url: 'questions/downvote',
        data: { questionId },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    aUpVote (context, payload) {
      const { answerId, questionId } = payload
      axios({
        method: 'PATCH',
        url: 'answers/upvote',
        data: { answerId },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    aDownVote (context, payload) {
      const { answerId, questionId } = payload
      axios({
        method: 'PATCH',
        url: 'answers/downvote',
        data: { answerId },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    deleteQuestion (context, payload) {
      const { questionId } = payload
      return new Promise ((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `/questions/${questionId}`,
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          resolve(data.message)
        })
        .catch(({ response }) => {
          reject(response.data)
        })
      })
    }
  }
})
