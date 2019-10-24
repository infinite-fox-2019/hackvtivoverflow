import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import AWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
import Moment from 'vue-moment'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.config.productionTip = false


Vue.use(Moment);
Vue.use(wysiwyg, {
    hideModules: {
        image: true,
        table: true,
        separator: true,
        removeFormat: true,
        maxHeight: "500px"
    }
});

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
        next: function (error) {
            try {
                const { response } = error
                const { data: { message } } = response
                if (Array.isArray(message)) message = message.join('<br />')
                this.$awn.alert(message, {
                    labels: {
                        alert: response.statusText
                    }
                })
            } catch {
                this.$awn.alert(error)
                console.log(error)
            }
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
