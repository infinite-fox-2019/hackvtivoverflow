import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'
import { loadavg } from 'os'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTag: [],
    isLogin : false
  },
  mutations: {
    SET_ALL_TAG (state, payload) {
      state.allTag = payload
    },
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload
      if (!payload){
        localStorage.clear()
      }
    }
  },
  actions: {
    getAllTag ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/tags'
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ALL_TAG', data.tags)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMyAcc ({commit}, payload){
      axios({
        method: 'get',
        url: '/users',
        headers : {
          token : localStorage.getItem("token")
        }
      })
    }
  }
})
