import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueQuill from 'vue-quill'
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
 
Vue.use(Notifications, { velocity })
Vue.use(VueQuill)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
