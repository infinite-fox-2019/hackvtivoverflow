import axios from '../config/axios'
import axiosF from '../config/axios'
export default {
    namespaced: true,
    state: {
        login: false,
        token: "",
        username: "",
        email: "",
        gravatar: "https://www.gravatar.com/avatar/null",
        id: null,
        myThreads: [],
        myReplies: []
    },
    mutations: {
        SETLOGIN(state, data) {
            state.token = data.token
            state.username = data.username
            state.email = data.email
            state.id = data._id
            state.gravatar = data.gravatar || "https://www.gravatar.com/avatar/null"
            state.login = true
        },
        RELOGIN(state, data) {
            state.token = localStorage.getItem('token')
            state.username = localStorage.getItem('username')
            state.email = localStorage.getItem('email')
            state.gravatar = localStorage.getItem('gravatar') || "https://www.gravatar.com/avatar/null"
            state.id = localStorage.getItem('id')
            state.login = true
        },
        DESTROY_CREDENTIALS(state) {
            state.token = ""
            state.login = false
            state.username = ""
            state.email = ""
            state.gravatar = "https://www.gravatar.com/avatar/null"
            state.id = null
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.removeItem('gravatar')
        }
    },
    actions: {
        async login({ state, commit }, payload) {
            let url = '/users/login'
            payload.expire ? url + '?expire=' + 60 * 60 * 24 * 30 : url
            let { data } = await axios.post(url, payload)
            commit('SETLOGIN', data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('email', data.email)
            localStorage.setItem('gravatar', data.gravatar)
            localStorage.setItem('id', data._id)
            axios.defaults.headers.authorization = state.token
            axiosF.defaults.headers.authorization = state.token
        },
        async register({ commit }, payload) {
            await axios.post('/users/register', payload)
        }
    }
}