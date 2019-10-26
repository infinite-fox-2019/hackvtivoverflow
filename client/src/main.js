//css
import "@/assets/yeti-bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-wysiwyg/dist/vueWysiwyg.css";

//core
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//package
import BootstrapVue from "bootstrap-vue";
import Swal from "sweetalert2";
import axios from "axios";
import wysiwyg from "vue-wysiwyg";

Vue.use(BootstrapVue);
Vue.use(wysiwyg, {
  hideModules: { image: true }
});
Vue.prototype.Swal = Swal;
Vue.prototype.axios = axios;

// development
// Vue.prototype.baseURL = "http://localhost:3000";

// production
Vue.prototype.baseURL = "http://35.247.133.81";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
