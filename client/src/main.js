import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import AWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
Vue.config.productionTip = false


Vue.use(require('vue-moment'));

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
    next: function ({ response: { data: { status, message } } }) {
      if (Array.isArray(message)) message = message.join('<br />')
      this.$awn.alert(message, {
        labels: {
          alert: 'Error ' + status
        }
      })
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
