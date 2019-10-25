import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from 'vue-wysiwyg'

import '@/assets/style.css'
import '../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(wysiwyg, {
  hideModules: { 'image': true }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
