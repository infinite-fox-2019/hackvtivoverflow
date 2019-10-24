import Vue from 'vue'
import Vuex from 'vuex'
import axios from './myAxios/axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    username: '',
    email: '',
    isLogin: false,
    inLoginPage: false,
    questions: [],
    oneQuestion: '',
    upQuestId: '',
    updateTitle: '',
    updateDescription: '',
    upAnsId: '',
    updateAnsTitle: '',
    updateAnsDescription: '',
    ansQuestionId: '',
    error: ''
  },
  mutations: {
    STATUSSIGNIN (state, payload) {
      console.log('MUTATED')
      state.email = payload.email
      state.userId = payload.id
      state.username = payload.username
    },
    SETLOGIN (state, payload) {
      state.isLogin = payload // ini bisa mutation
    },
    SIGNOUT (state, payload) {
      state.isLogin = payload
      state.email = ''
      state.username = ''
      state.userId = ''
    },
    INLOGINPAGE (state, payload) {
      state.inLoginPage = payload
    },
    GETQUESTIONS (state, payload) {
      state.questions = payload
    },
    GETQUESTDETAIL (state, payload) {
      state.oneQuestion = payload
    },
    DATATOUPDATE (state, payload) {
      state.upQuestId = payload.id
      state.updateTitle = payload.title
      state.updateDescription = payload.description
    },
    UPDATEANSWER (state, payload) {
      state.upAnsId = payload.id
      state.updateAnsTitle = payload.title
      state.updateAnsDescription = payload.description
      state.ansQuestionId = payload.questionId
    },
     ERROR (state, payload){
      state.error = payload
    }
  },
  actions: {
    inLoginPage (context, payload) {
      context.commit('INLOGINPAGE', payload)
      router.push('/login')
    },
    signinToStateAct (context, payload) {
      // context.state.coba // ambil data aja

      axios.post('/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          context.commit('STATUSSIGNIN', data.payload)
          context.commit('SETLOGIN', true)
          router.push('/questions')
          context.commit('INLOGINPAGE', false)
        })
        .catch(err => {
          console.log(err.response.data.message)
          context.commit('ERROR', err.response.data.message)
        })
    },
    registerToStateAct (context, payload) {
      // context.state.coba // ambil data aja
      console.log(payload.email, payload.password)
      axios.post('/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
        .then((data) => {
          router.push('/login')
        })
        .catch(err => {
          context.commit('ERROR', err.response.data.message.join('\n'))
        })
    },
    generateQuestions (context) {
      axios.get('/questions')
        .then(questions => {
          context.commit('GETQUESTIONS', questions.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailQuest (context, id) {
      axios.get(`/questions/${id}`)
        .then(question => {
          context.commit('GETQUESTDETAIL', question.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuestion (context, payload) {
      axios.post('/questions', {
        title: payload.title,
        description: payload.description
      }, { headers: {
        token: localStorage.getItem('token')
      } })
        .then(question => {
          router.push('/questions')
          console.log(question)
        })
        .catch(err => {
          console.log(err)
        })
    },
    makeAnswer ({ commit, dispatch }, payload) {
      console.log(payload)
      axios.post(`/answers/${payload.id}`, {
        title: payload.title,
        description: payload.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(answer => {
          console.log(answer)
          dispatch('getDetailQuest', payload.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQuestion (context, payload) {
      axios.patch(`/questions/${this.state.upQuestId}`, {
        title: payload.title,
        description: payload.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(question => {
          console.log(question)
          router.push('/questions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateAnswer (context, payload) {
      axios.patch(`/answers/${this.state.upAnsId}`, {
        title: payload.title,
        description: payload.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(question => {
          router.push(`/questions/${this.state.ansQuestionId}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuest ({ commit, dispatch }, id) {
      axios.delete(`/questions/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          dispatch('generateQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAns ({ commit, dispatch }, payload) {
      axios.delete(`/answers/${payload.answerId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          dispatch('getDetailQuest', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvote ({ commit, dispatch }, id) {
      axios.patch(`/users/upvote/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          dispatch('getDetailQuest', id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvote ({ commit, dispatch }, id) {
      axios.patch(`/users/downvote/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          dispatch('getDetailQuest', id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvoteAns ({ commit, dispatch }, payload) {
      axios.patch(`/users/upvote/${payload.answerId}`,
        {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          dispatch('getDetailQuest', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvoteAns ({ commit, dispatch }, payload) {
      axios.patch(`/users/downvote/${payload.answerId}`,
        {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          dispatch('getDetailQuest', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

})
