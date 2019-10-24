import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import AskQuestion from './views/AddQuestion.vue'
import MyAccount from './views/MyAccount.vue'
import EditQuestion from './views/EditQuestion.vue'
import EditAnswer from './views/EditAnswer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/ask',
      name: 'askQuestion',
      component: AskQuestion,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/users',
      name: 'users',
      component: MyAccount,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/answer/:id',
      name: 'editAnswer',
      component: EditAnswer
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditQuestion,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/question/:id',
      name: 'detail',
      component: Detail,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
})
