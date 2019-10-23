import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Questions from './views/Questions.vue'
import ListTag from './views/ListTag.vue'
import Register from './views/Register.vue'

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
      path: '/questions',
      name: 'questions',
      component: Questions,
      children: [
        {
          path: 'tag',
          name: 'listtag',
          component: ListTag,
          children: [
            {
              path: ':tag',
              name: 'tagname',
              component: Questions
            }
          ]
        },
        {
          path: ':id',
          name: 'detail'
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
