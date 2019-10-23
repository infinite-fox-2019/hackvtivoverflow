import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import AWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
import Moment from 'vue-moment'
Vue.config.productionTip = false


Vue.use(Moment);

Vue.use(AWN, {
    durations: {
        global: 2500
    },
    minDurations: {
        async: 0,
        "async-block": 0
    }
})

Vue.mixin({
    methods: {
        next: function ({ response }) {
            const { data: { message } } = response
            if (Array.isArray(message)) message = message.join('<br />')
            this.$awn.alert(message, {
                labels: {
                    alert: response.statusText
                }
            })
        },
        loadStart: function () {
            this.$store.commit('LOAD_START')
        },
        loadEnd: function () {
            this.$store.commit('LOAD_END')
        }
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
