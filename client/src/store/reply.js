import axios from '../config/axios'
export default {
    namespaced: true,
    state: {
        reply: undefined
    },
    mutations: {
    },
    actions: {
        async reply({ commit }, payload) {
            await axios.post('/threads/' + payload.id + '/reply', payload)
        }
    },
    modules: {
    }
}