import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Question from './views/Question.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AddQuestion from './views/AddQuestion.vue'
import EditQuestion from './views/EditQuestion.vue'
import Swal from 'sweetalert2'

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
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/editquestion/:id',
      name: 'editquestion',
      component: EditQuestion
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
      path: '/addquestion',
      name: 'addquestion',
      component: AddQuestion,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('access_token')) {
          next()
        } else {
          Swal.fire(
            'Stop!',
            'You must login first to continue!',
            'error'
          )
          next('/login')
        }
      }
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
