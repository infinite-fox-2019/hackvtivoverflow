import Vue from 'vue'
import Swal from 'sweetalert2'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/ask',
      name: 'askquestion',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          Swal.fire({
            title: 'you have to Login',
            text: 'You have to login first before create new question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'login'
          }).then((result) => {
            if (result.value) {
              next('/login')
            }
          })
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/AskQuestion.vue')
    },
    {
      path: '/answer/:id',
      name: 'answer',
      component: () => import(/* webpackChunkName: "about" */ './views/Answer.vue')
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: () => import(/* webpackChunkName: "about" */ './views/MyAccount.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import(/* webpackChunkName: "about" */ './views/UpdateQuestion.vue')
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
