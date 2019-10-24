import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

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
    component: () => import('../views/Ask.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/register')
      }
    }
  },
  {
    path: '/users',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: '/users/update/question/:id',
        name: 'updateQuestion',
        component: () => import('../components/UpdateQuestion.vue')
      },
      {
        path: '/users/update/answer/:id',
        name: 'updateAnswer',
        component: () => import('../components/UpdateAnswer.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/register')
      }
    }
  },
  {
    path: '/home',
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
  },
  {
    path: '/',
    name: 'main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
