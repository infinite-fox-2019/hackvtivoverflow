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
      axios({
        method: 'POST',
        url: '/users/register',
        data: { name, email, password }
      })
        .then(({ data }) => {
          alert(data.message)
          router.push('/login')
        })
        .catch(alert)
    },
    login ({ commit }, payload) {
      const { email, password } = payload
      axios({
        method: 'POST',
        url: '/users/login',
        data: { email, password }
      })
        .then(({ data }) => {
          commit('LOGIN', data.token)
        })
        .catch(alert)
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
        .catch(alert)
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
        .catch(alert)
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
        .catch(alert)
    },
    askQuestion ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/questions',
        data: payload,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(alert)
    },
    updateQuestion ({ commit }, payload) {
      const { id, title, description, tags } = payload
      axios({
        method: 'PATCH',
        url: `/questions/${id}`,
        data: { title, description, tags },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          alert(data.message)
        })
        .catch(alert)
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
        .catch(alert)
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
        .catch(alert)
    },
    addAnswer (context, payload) {
      const { description, questionId } = payload
      axios({
        method: 'POST',
        url: '/answers',
        data: { description, questionId },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          alert('post answer success')
          context.dispatch('fetchAnswers', { questionId })
        })
        .catch(alert)
    },
    updateAnswer (context, payload) {
      const { description, id } = payload
      axios({
        method: 'PATCH',
        url: `/answers/${id}`,
        data: { description },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          alert(data.message)
          router.push('/')
        })
        .catch(alert)
    },
    verifyToken ({ commit }) {
      axios({
        method: 'GET',
        url: '/users/verify',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('LOGIN', localStorage.getItem('token'))
        })
        .catch(alert)
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
          alert(data.message)
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(alert)
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
          alert(data.message)
          context.dispatch('fetchAnswers', { questionId })
          context.dispatch('getQuestionById', { id: questionId })
        })
        .catch(alert)
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
          alert(data.message)
          context.dispatch('fetchAnswers', { questionId })
        })
        .catch(alert)
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
          alert(data.message)
          context.dispatch('fetchAnswers', { questionId })
        })
        .catch(alert)
    },
    deleteQuestion (context, payload) {
      const { questionId } = payload
      axios({
        method: 'DELETE',
        url: `/questions/${questionId}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          alert(data.message)
        })
        .catch(alert)
    }
  }
})
