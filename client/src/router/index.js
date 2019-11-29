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
        path: '',
        name: 'questionHome',
        component: () => import(/* webpackChunkName: "questionHome" */ '../views/QuestionView.vue')
      },
      {
        path: '/rating',
        name: 'rating',
        component: () => import(/* webpackChunkName: 'rating' */ '../views/Rating.vue')
      },
      {
        path: '/watch/tag',
        name: 'watchTag',
        component: () => import(/* webpackChuckName: "watchTag" */ '../views/WatchTag.vue')
      },
      {
        path: '/tag/:name',
        name: 'tag',
        component: () => import(/* webpackChunkName: 'tag' */ '../views/FindTag.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/AllTags.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: 'ask' */ '../views/Ask.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ '../views/Register.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: 'details' */ '../views/Detail.vue')
  },
  {
    path: '/search/:name',
    name: 'search',
    component: () => import(/* webpackChunkName: 'search' */ '../views/Search.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: 'profile' */ '../views/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'userProfile',
    component: () => import(/* webpackChunkName: "userProfile" */ '../views/UserProfile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
