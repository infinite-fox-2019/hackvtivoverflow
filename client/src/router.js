import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Ask from './views/AskQuestion.vue'
import Question from './views/Question.vue'
import Profile from './views/Profile.vue'
import UpdateQuestion from './views/UpdateQuestion.vue'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/askquestion',
      name: 'ask',
      component: Ask
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/update/:id',
      name: 'updateQuestion',
      component: UpdateQuestion
    }
  ]
})
