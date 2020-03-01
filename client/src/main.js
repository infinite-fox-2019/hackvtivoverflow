import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@voerro/vue-tagsinput/dist/style.css'
import wysiwyg from 'vue-wysiwyg'

import VoerroTagsInput from '@voerro/vue-tagsinput'

Vue.use(wysiwyg, {})
Vue.component('tags-input', VoerroTagsInput)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
