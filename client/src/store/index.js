import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Notifications from 'vue-notification'

Vue.use(Vuex)
Vue.use(Notifications)

export default new Vuex.Store({
  state: {
    showCustomizeLoader: false,
    baseUrl: `http://localhost:3000`,
    tags: [],
    asks: [],
    ask: null,
    tagdetail: null
  },
  mutations: {
    LOADER(state, payload) {
      state.showCustomizeLoader = payload
    },
    INITIAL_TAGS(state, payload) {
      state.tags = payload
    },
    INITIAL_ASKS(state, payload) {
      state.asks = payload
    },
    INITIAL_ASK(state, payload) {
      state.ask = payload
    },
    INITIAL_TAGDETAIL(state, payload) {
      state.tagdetail = payload
    }
  },
  actions: {
    getTag(context) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/tags`
      })
        .then(({ data }) => {
          context.commit('INITIAL_TAGS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findTagByName(context, name) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/tags/${name}`
      })
        .then(({ data }) => {
          context.commit('INITIAL_TAGDETAIL', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAsk(context) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/asks`
      })
        .then(({ data }) => {
          context.commit('INITIAL_ASKS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findMyAsk(context) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/asks/myask`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('INITIAL_ASKS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAskById(context, id) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/asks/${id}`,
      })
        .then(({ data }) => {
          context.commit('INITIAL_ASK', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postAsk(context, payload) {
      context.commit('LOADER', true)
      axios({
        method: `post`,
        url: `${context.state.baseUrl}/asks`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('LOADER', false)
          Vue.notify({
            group: 'foo',
            type: 'success',
            title: 'Success!',
            text: 'Create Ask Success!'
          })
        })
        .catch(err => {
          console.log(err)
          context.commit('LOADER', false)
          Vue.notify({
            group: 'foo',
            type: 'error',
            title: 'Error!',
            text: 'Create Ask failed!'
          })
        })
    },
    postAnswer(context, payload) {
      axios({
        method: `post`,
        url: `${context.state.baseUrl}/answers/${payload.id}`,
        data: {
          content: payload.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
