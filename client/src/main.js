import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Editor from "vue2-editor";
import AWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.css'

import Unicon from 'vue-unicons'

import { uniArrowUp, uniArrowDown, uniFastMail, uniUser } from 'vue-unicons/src/icons'

Unicon.add([uniArrowUp, uniArrowDown, uniFastMail, uniUser])
Vue.use(Unicon)


Vue.use(AWN, {
  durations: {
      global: 2000
  }
})
Vue.use(BootstrapVue)

Vue.use(Vue2Editor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
