import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTag: [],
    isLogin: false,
    user: {},
    tagname: {},
    showLogin: false,
    questions: [],
    questiondet: {},
    oneQuestionDetail: {}
  },
  mutations: {
    SET_TAGNAME (state, payload) {
      state.tagname = payload
    },
    SET_ALL_TAG (state, payload) {
      state.allTag = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
      if (!payload) {
        localStorage.clear()
      }else{
        router.push('/questions')
      }
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    CHANGE_SHOWLOGIN (state, payload) {
      state.showLogin = payload
    },
    SHOWLOGIN_TRUE (state, payload) {
      state.showLogin = true
    },
    SET_QUES (state, payload) {
      state.questions = payload
    },
    SET_DETAIL (state, payload) {
      state.questiondet = payload
    },
    SET_ONEDETAIL (state, payload) {
      state.oneQuestionDetail = payload
    }
  },
  actions: {
    getAllTag ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/tags'
      })
        .then(({ data }) => {
          commit('SET_ALL_TAG', data.tags)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMyAcc ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/users',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_USER', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuesTag ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/tags/' + payload
      })
        .then(({ data }) => {
          let payload = {
            name: data.name,
            display: data.display,
            description: data.description
          }
          commit('SET_TAGNAME', payload)
          commit('SET_QUES', data.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAll ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/questions'
      })
        .then(({ data }) => {
          commit('SET_QUES', data.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestions ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/questions/' + payload
      })
        .then(({ data }) => {
          let totalAnswer = data.answer.length
          let answers = data.answer
          let { title, description, tags, user, likes, dislikes, createdAt } = data.question
          let payload = {
            title, description, tags, user, likes, dislikes, createdAt, answers, totalAnswer
          }
          commit('SET_DETAIL', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOneQues ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/questions/' + payload
      })
        .then(({ data }) => {
          let { title, description, createdAt, user, likes, dislikes } = data.question
          let answers = data.answer
          let payload = { title, description, createdAt, user, answers, likes, dislikes }
          commit('SET_ONEDETAIL', payload)
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
})
