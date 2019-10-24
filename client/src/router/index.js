import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/questions/ask',
    name: 'ask',
    component: () => import('../views/Ask.vue')
  },
  {
    path: '/users',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/questions',
        name: 'questions',
        component: () => import('../views/Questions.vue')
      },
      {
        path: '/questions/:id',
        name: 'questionDetail',
        component: () => import('../views/QuestionDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
