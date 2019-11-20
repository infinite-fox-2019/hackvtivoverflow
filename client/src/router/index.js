import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'readQuestion',
    component: () => import('../views/ReadQuestion.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/questionForm',
    name: 'questionForm',
    component: () => import('../views/QuestionForm.vue')
  },
  {
    path: '/editquestion/:id',
    name : 'editquestion',
    component: () => import('../views/EditForm.vue')
  }
]

const router = new VueRouter({
  routes,
  mode : 'history'
})

export default router
