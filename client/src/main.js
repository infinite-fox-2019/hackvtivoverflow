import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'
import 'buefy/dist/buefy.css'
import Swal from 'sweetalert2'
import wysiwyg from 'vue-wysiwyg'

Vue.use(Buefy)
Vue.use(wysiwyg)

Vue.config.productionTip = false

new Vue({
  Swal,
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
