import Vue from 'vue'
import Vuex from 'vuex'
import reply from './reply'
import tag from './tag'
import thread from './thread'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        LOAD_START(state) {
            state.loading = true
        },
        LOAD_END(state) {
            state.loading = false
        }
    },
    actions: {
    },
    modules: {
        reply,
        tag,
        thread,
        user
    }
})
