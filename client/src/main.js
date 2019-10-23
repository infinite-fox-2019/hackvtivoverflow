import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Editor from "vue2-editor";
import {
  Quasar,
  QVirtualScroll
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QVirtualScroll
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
