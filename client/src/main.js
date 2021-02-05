import 'vue-wysiwyg/dist/vueWysiwyg.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'
import store from './store'
import wysiwyg from 'vue-wysiwyg'

Vue.use(wysiwyg,{})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
