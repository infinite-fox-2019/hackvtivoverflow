import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'ask',
        component: () => import('../components/Ask-list.vue')
      },
      {
        path: 'myask',
        component: () => import('../components/My-ask.vue')
      },
      {
        path: 'users',
        component: () => import('../components/User-list.vue')
      },
      {
        path: 'tags',
        component: () => import('../components/Tag-list.vue')
      },
      {
        path: 'ask/:id',
        component: () => import('../views/Ask-detail.vue')
      },
      {
        path: 'tag/:name',
        component: () => import('../views/Tag-detail.vue')
      }
    ]
  },
  {
    path: '/writeask',
    name: 'write ask',
    component: () => import('../views/Write.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
