import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Question from './views/Question.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import Ask from './views/Ask.vue'
import UpdateQuest from './views/UpdateQuest.vue'
import UpdateAnswer from './views/UpdateAnswer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question
    },
    {
      path: '/questions/:id',
      name: 'questionsId',
      component: QuestionDetail
    },
    {
      path: '/ask',
      name: 'ask',
      component: Ask
    },
    {
      path: '/updateQuestion',
      name: 'updateQuestion',
      component: UpdateQuest
    },
    {
      path: '/updateAnswer',
      name: 'updateAnswer',
      component: UpdateAnswer
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
