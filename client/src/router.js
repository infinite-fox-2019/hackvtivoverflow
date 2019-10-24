import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AllQuestion from './views/AllQuestion.vue'
import Ask from './views/Ask.vue'
import MyQuestion from './views/MyQuestion.vue'
import MyQuestionDetail from './views/MyQuestionDetail.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/questions',
      name: 'questions',
      component: AllQuestion
    },
    {
      path: '/ask',
      name: 'ask',
      component: Ask
    },
    {
      path: '/myquestion/:id',
      name: 'myquestiondetail',
      component: MyQuestionDetail
    },
    {
      path: '/myquestion',
      name: 'my1question',
      component: MyQuestion
    }
    
  ]
})
