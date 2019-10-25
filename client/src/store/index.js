import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../configs/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    currentQuestion: ''
  },
  mutations: {
    getQuestions: function (state, questions) {
      state.questions = questions
    },
    setCurrentQuestion: function (state, question) {
      state.currentQuestion = question
    }
  },
  actions: {
    fetchQuestions ({ commit }) {
      return axios.get('/questions')
        .then(({ data }) => {
          console.log(data.questions)
          commit('getQuestions', data.questions)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    addQuestion (context, question) {
      axios.post('/questions', {
        title: question.title,
        description: question.description,
        tags: question.tags
      }, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data.question)
          console.log('data added')
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    }
  },
  modules: {
  }
})
