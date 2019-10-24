import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import "vue-awesome-notifications/dist/styles/style.css";
import VueAWN from "vue-awesome-notifications";

Vue.config.productionTip = false;
Vue.use(VueAWN, {
  durations: {
    global: 3000
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
