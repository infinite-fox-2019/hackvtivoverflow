import axios from '../config/axios'
import { register } from '../../../server/controllers/user'
export default {
    namespaced: true,
    state: {
        login: false,
        token: "",
        username: "",
        email: "",
        gravatar: "https://www.gravatar.com/avatar/null"
    },
    mutations: {
        SETLOGIN(state, data) {
            state.token = data.token
            state.username = data.username
            state.email = data.email
            state.gravatar = data.gravatar || "https://www.gravatar.com/avatar/null"
            state.login = true
        }
    },
    actions: {
        async login({ commit }, payload) {
            let { data } = await axios.post('/users/login', payload)
            commit('SETLOGIN', data)
        },
        async register({ commit }, payload) {
            await axios.post('/users/register', payload)
        }
    },
    getters: {
    }
}