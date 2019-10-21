import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DetailQuestion from './views/DetailQuestion.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detailquestion',
      name: 'detailQuestion',
      component: DetailQuestion
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
