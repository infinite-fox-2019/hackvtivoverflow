import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    register: {
      name: '',
      password: '',
      email: '',
      _id: ''
    },
    token: '',
    listQuestion: [],
    upVotes: 0,
    downVotes: 0,
    question: {
      _id: '',
      title: '',
      description: '',
      tags: '',
      UserId: {},
      upVotes: [],
      downVotes: [],
      hasil: []
    },
    answer: {
      _id: '',
      title: '',
      description: '',
      QuestionId: '',
      UserId: '',
      upVotes: [],
      downVotes: []
    }
  },
  mutations: {
    REGISTER (state, payload) {
      state.register.name = payload.name
      state.register.password = payload.password
      state.register.email = payload.email
      state.register._id = payload._id
    },
    LOGIN (state, payload) {
      state.token = payload
    },
    SIGNOUT (state, payload) {
      state.token = payload
    },
    SETLISTQUESTION (state, payload) {
      state.listQuestion = payload
    },
    CREATEQUESTION (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
    },
    QUESTIONDETAIL (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
      state.question.UserId = payload.UserId
      state.question.upVotes = payload.upVotes
      state.question.downVotes = payload.downVotes
      state.question.hasil = payload.hasil
    },
    CREATEANSWER (state, payload) {
      state.answer._id = payload._id
      state.answer.title = payload.title
      state.answer.description = payload.description
      state.answer.UserId = payload.UserId
      state.answer.QuestionId = payload.QuestionId
    },
    DOWNVOTESQUESTION (state, payload) {
      state.question.downVotes = payload.downVotes
      state.question.upVotes = payload.upVotes
    },
    UPVOTESQUESTION (state, payload) {
      state.question.downVotes = payload.downVotes
      state.question.upVotes = payload.upVotes
    },
    DELETEQUESTION (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
      state.question.UserId = payload.UserId
      state.question.upVotes = payload.upVotes
      state.question.downVotes = payload.downVotes
    },
    UPDATEQUESTION (state, payload) {
      state.question._id = payload._id
      state.question.title = payload.title
      state.question.description = payload.description
      state.question.tags = payload.tags
      state.question.UserId = payload.UserId
      state.question.upVotes = payload.upVotes
      state.question.downVotes = payload.downVotes
    },
    UPDATEANSWER (state, payload) {
      state.answer._id = payload._id
      state.answer.title = payload.title
      state.answer.description = payload.description
      state.answer.QuestionId = payload.QuestionId
      state.answer.UserId = payload.UserId
      state.answer.upVotes = payload.upVotes
      state.answer.downVotes = payload.downVotes
    },
    DELETEANSWER (state, payload) {
      state.answer._id = payload._id
      state.answer.title = payload.title
      state.answer.description = payload.description
      state.answer.QuestionId = payload.QuestionId
      state.answer.UserId = payload.UserId
      state.answer.upVotes = payload.upVotes
      state.answer.downVotes = payload.downVotes
    },
    DOWNVOTESANSWER (state, payload) {
      state.answer.downVotes = payload.downVotes
      state.answer.upVotes = payload.upVotes
    },
    UPVOTESANSWER (state, payload) {
      state.answer.downVotes = payload.downVotes
      state.answer.upVotes = payload.upVotes
    }
  },
  actions: {
    upVotesAnswer ({ commit }, payload) {
      Axios({
        url: 'http://localhost:3000/answer/upvote',
        method: 'patch',
        data: {
          UserId: payload.UserId,
          _id: payload._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('UPVOTESANSWER', data)
          this.dispatch('questionDetail', this.state.question._id)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Creating answer Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    downVotesAnswer ({ commit }, payload) {
      Axios({
        url: 'http://localhost:3000/answer/downvote',
        method: 'patch',
        data: {
          UserId: payload.UserId,
          _id: payload._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('DOWNVOTESANSWER', data)
          this.dispatch('questionDetail', this.state.question._id)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Creating answer Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    deleteAnswer ({ commit }, payload) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `http://localhost:3000/answer/${payload}`,
              method: 'DELETE',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(result => {
                commit('DELETEANSWER', result)
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your answer has been deleted.',
                  'success',
                  2000
                )
                this.dispatch('questionDetail', this.state.question._id)
              })
              .catch(() => {
                swal.fire({
                  type: 'error',
                  title: "You're unauthorize to delete this answer",
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your question is safe',
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Failed deleting question',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    updateAnswer ({ commit }, payload) {
      swal.fire({
        title: 'Updating Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `http://localhost:3000/answer/${payload._id}`,
        method: 'patch',
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('UPDATEANSWER', data)
          swal.close()
          swal.fire({
            title: 'Success update',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          })
          this.dispatch('questionDetail', this.state.question._id)
        })
        .catch(() => {
          swal.fire({
            type: 'error',
            title: "You're unauthorize to update this answer",
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    updateQuestion ({ commit }, payload) {
      swal.fire({
        title: 'Updating Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `http://localhost:3000/question/${payload._id}`,
        method: 'patch',
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('UPDATEQUESTION', data)
          swal.close()
          swal.fire({
            title: 'Success update',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          })
          this.dispatch('questionDetail', payload._id)
        })
        .catch(() => {
          swal.fire({
            type: 'error',
            title: "You're unauthorize to update this question",
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    deleteQuestion ({ commit }, payload) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `http://localhost:3000/question/${payload}`,
              method: 'DELETE',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(result => {
                commit('DELETEQUESTION', result)
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your question has been deleted.',
                  'success',
                  2000
                )
                router.push('/question')
              })
              .catch(() => {
                swal.fire({
                  type: 'error',
                  title: "You're unauthorize to delete this question",
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your question is safe',
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Failed deleting question',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    upVotesQuestion ({ commit }, payload) {
      Axios({
        url: 'http://localhost:3000/question/upvote',
        method: 'patch',
        data: {
          UserId: payload.UserId,
          _id: payload._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('UPVOTESQUESTION', data)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Creating answer Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    downVotesQuestion ({ commit }, payload) {
      Axios({
        url: 'http://localhost:3000/question/downvote',
        method: 'patch',
        data: {
          UserId: payload.UserId,
          _id: payload._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('DOWNVOTESQUESTION', data)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Creating answer Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    createAnswer ({ commit }, payload) {
      swal.fire({
        title: 'Creating Answer',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/answer',
        method: 'post',
        data: {
          title: payload.title,
          description: payload.description,
          QuestionId: payload.QuestionId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('CREATEANSWER', data)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success creating answer',
            showConfirmButton: false,
            timer: 2000
          })
          this.dispatch('questionDetail', this.state.question._id)
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Creating answer Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    questionDetail ({ commit }, payload) {
      swal.fire({
        title: 'Fetching Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `http://localhost:3000/question/${payload}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          swal.close()
          commit('QUESTIONDETAIL', data)
        })
        .catch(() => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Need to login first',
            timer: 2000,
            showConfirmButton: false
          })
        })
    },
    createQuestion ({ commit }, payload) {
      swal.fire({
        title: 'Creating Question',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/question',
        method: 'post',
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('CREATEQUESTION', data)
          this.dispatch('setListQuestion')
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success creating question',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Creating question Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    setListQuestion ({ commit }) {
      swal.fire({
        title: 'Fetching Data',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/question',
        method: 'get'
      })
        .then(({ data }) => {
          commit('SETLISTQUESTION', data)
          swal.close()
        })
        .catch(() => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'Need to login first',
            timer: 2000,
            showConfirmButton: false
          })
        })
    },
    signOut ({ commit }) {
      swal.fire({
        title: 'signOut from your current user',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      commit('SIGNOUT', '')
      swal.close()
      swal.fire({
        type: 'success',
        title: 'SignOut success',
        showConfirmButton: false,
        timer: 2000
      })
    },
    login ({ commit }, payload) {
      swal.fire({
        title: 'logging to your User',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: {
          password: payload.password,
          email: payload.email
        }
      })
        .then(({ data }) => {
          commit('LOGIN', data.token)
          localStorage.setItem('token', data.token)
          localStorage.setItem('_id', data._id)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success to login',
            showConfirmButton: false,
            timer: 2000
          })
          router.push('/question')
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'login Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    register ({ commit }, payload) {
      swal.fire({
        title: 'Registering your User',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: 'http://localhost:3000/register',
        method: 'post',
        data: {
          name: payload.name,
          password: payload.password,
          email: payload.email
        }
      })
        .then(({ data }) => {
          commit('REGISTER', data)
          swal.close()
          swal.fire({
            type: 'success',
            title: 'success to register',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          swal.close()
          swal.fire({
            type: 'error',
            title: 'REGISTER Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }
})
