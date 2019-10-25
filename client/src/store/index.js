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
    baseUrl: `http://52.14.60.30`,
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
    findAsk(context) {
      axios({
        method: `get`,
        url: `${context.state.baseUrl}/asks`
      })
        .then(({ data }) => {
          context.commit('INITIAL_ASKS', data)
          context.commit("LOADER", false);
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
          context.commit("LOADER", false);
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
          context.commit('LOADER', false)
          Vue.notify({
            group: 'foo',
            type: 'success',
            title: 'Success!',
            text: 'Create Ask Success!'
          })
          context.dispatch('findAsk')
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
    }
  },
  modules: {
  }
})
