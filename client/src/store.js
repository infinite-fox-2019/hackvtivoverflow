import Vue from 'vue'
import Vuex from 'vuex'
import axios from './components/configs/axios'
import Swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    userQuestion: [],
    answers: [],
    oneAnswer: {},
    userId: '',
    isEdit: false
  },
  mutations: {
    SET_IS_EDIT(state){
      state.isEdit = !state.isEdit
    },
    SET_LOCAL_STORAGE (state, data) {
      localStorage.setItem('token', data.token)
      state.userId = data.id
      state.isLogin = true
    },
    SET_USER_ID(state, data){
      state.userId = data
    },
    LOGOUT (state) {
      localStorage.clear()
      state.isLogin = false
    },
    LOGGED (state) {
      state.isLogin = true
    },
    SET_QUESTIONS (state, data) {
      state.questions = data
    },
    SET_USER_QUESTIONS (state, data) {
      state.userQuestion = data
    },
    SET_ONE_QUESTION (state, data) {
      state.question = data
    },
    SET_ANSWERS (state, data) {
      state.answers = data
    },
    SET_ONE_ANSWER (state, data) {
      state.oneAnswer = data
    },
    REMOVE_ONE_ANSWARE (state, data) {
      state.oneAnswer = {}
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: `users/login`,
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          context.commit('SET_LOCAL_STORAGE', data)
          router.push(`/`)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    logout (context) {
      context.commit('LOGOUT')
    },
    register (context, payload) {
      axios({
        url: `/users/register`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          if (data.role === 'admin') {
            context.commit('ADMIN')
          }
          context.commit('SET_LOCAL_STORAGE', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.message}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    logged (context) {
      context.commit('LOGGED')
    },
    getQuestion (context, keyword) {
      axios({
        method: 'get',
        url: `/questions/search?keyword=${keyword}`
      })
        .then(({ data }) => {
          context.commit('SET_QUESTIONS', data)
        })
        .catch(err => {
          console.log(err.response, 'ini error')
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    getQuestionByTag (context, keyword) {
      axios({
        method: 'get',
        url: `/questions/tag?keyword=${keyword}`
      })
        .then(({ data }) => {
          context.commit('SET_QUESTIONS', data)
        })
        .catch(err => {
          console.log(err.response, 'ini error')
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    getUserQuestion (context) {
      axios({
        method: 'get',
        url: `/questions/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_USER_QUESTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    createQuestion (context, { title, description, tags }) {
      axios({
        method: 'post',
        url: 'questions',
        data: { title, description, tags },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          context.dispatch('getQuestion', ' ')
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    deleteQuestion (context, questionId) {
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
            method: 'delete',
            url: `/questions/${questionId}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(() => {
              context.dispatch('getUserQuestion')
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(err => {
              Swal.fire({
                title: `${err.response.data.errors[0]}`,
                animation: false,
                customClass: {
                  popup: 'animated tada'
                }
              })
            })
        }
      })
    },
    getOneQuestion (context, questionId) {
      axios({
        method: 'get',
        url: `/questions/${questionId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_ONE_QUESTION', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    updateQuestion (context, { title, description, tags, id }) {
      axios({
        method: 'patch',
        url: `/questions/${id}`,
        data: { title, description, tags },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          context.dispatch('getUserQuestion')
          router.push('/myaccount')
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    getAnswers (context, questionId) {
      axios({
        method: 'get',
        url: `/answers/question/${questionId}`
      })
        .then(({ data }) => {
          context.commit('SET_ANSWERS', data)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    createAnswer (context, { title, description, questionId }) {
      axios({
        method: 'post',
        url: '/answers',
        data: { title, description, questionId },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          context.dispatch('getAnswers', questionId)
          router.push(`/answer/${questionId}`)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    deleteAnswer (context, { answerId, questionId }) {
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
            method: 'delete',
            url: `/answers/${answerId}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(() => {
              context.dispatch('getAnswers', questionId)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(err => {
              Swal.fire({
                title: `${err.response.data.errors[0]}`,
                animation: false,
                customClass: {
                  popup: 'animated tada'
                }
              })
            })
        }
      })
    },
    findOneAnswer (context, { answerId, questionId }) {
      axios({
        method: 'get',
        url: `/answers/${answerId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_ONE_ANSWER', data)
          context.dispatch('getAnswers', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    updateAnswer (context, { title, description, answerId, questionId }) {
      axios({
        method: 'patch',
        url: `/answers/${answerId}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: { title, description }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          context.dispatch('getAnswers', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    edit(context){
      context.commit('SET_IS_EDIT')
    },
    cancelUpdate (context) {
      context.commit('REMOVE_ONE_ANSWARE')
      context.commit('SET_IS_EDIT')
    },
    upVoteAnswer (context, { answerId, questionId }) {
      axios({
        method: 'post',
        url: `/answers/${answerId}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          context.dispatch('getAnswers', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    downVoteAnswer (context, { answerId, questionId }) {
      axios({
        method: 'post',
        url: `/answers/${answerId}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          context.dispatch('getAnswers', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    upVoteQuestion (context, questionId) {
      axios({
        method: 'post',
        url: `/questions/${questionId}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          context.dispatch('getOneQuestion', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    downVoteQuestion (context, questionId) {
      axios({
        method: 'post',
        url: `/questions/${questionId}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          context.dispatch('getOneQuestion', questionId)
        })
        .catch(err => {
          Swal.fire({
            title: `${err.response.data.errors[0]}`,
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          })
        })
    },
    getUserId(context){
      axios({
        method: 'get',
        url:'/users/userid',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('SET_USER_ID', data)
      })
      .catch(err => {
        Swal.fire({
          title: `${err.response.data.errors[0]}`,
          animation: false,
          customClass: {
            popup: 'animated tada'
          }
        })
      })
    }
    

  }
})
