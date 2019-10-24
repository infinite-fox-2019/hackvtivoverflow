import axios from '../config/axios'

export default {
    namespaced: true,
    state: {
        threads: [],
        thread: undefined
    },
    mutations: {
        SET_THREADS(state, payload) {
            state.threads = payload
        },
        SET_SINGLE_THREAD(state, payload) {
            state.thread = payload
        }
    },
    actions: {
        async getThreads({ state, commit }, payload) {
            let url = '/threads'
            let arr = []
            if (payload && payload.query) {
                for (const key in payload.query) {
                    arr.push(`${key}=${payload.query[key]}`)
                }
            }
            arr.length ? url += '?' + arr.join('&') : url
            let { data } = await axios.get(url)
            commit('SET_THREADS', data)
            return state.threads
        },
        async getSingleThread({ commit }, payload) {
            let url = '/threads/' + payload.id
            let arr = []
            for (const key in payload.query) {
                arr.push(`${key}=${payload.query[key]}`)
            }
            arr.length ? url += '?' + arr.join('&') : url
            let { data } = await axios.get(url)
            commit('SET_SINGLE_THREAD', data)
            return data
        },
        async getUserThread({ commit }) {
            let { data } = await axios.get('/threads/user')
            commit('SET_THREADS', data)
        },
        async createNewThread({ commit }, payload) {
            let { data } = await axios.post('/threads', payload)
            commit('SET_SINGLE_THREAD', data)
            return data
        },
        async upvote({ commit }, id) {
            await axios.patch('/threads/upvote/' + id)
        },
        async downvote({ commit }, id) {
            await axios.patch('/threads/downvote/' + id)
        },
        async unvote({ commit }, id) {
            await axios.patch('/threads/unvote/' + id)
        }
    },
    modules: {
    }
}