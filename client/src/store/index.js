import Vue from 'vue'
import Vuex from 'vuex'
import reply from './reply'
import tag from './tag'
import thread from './thread'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
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
