import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Questions from './views/Questions.vue'
import ListTag from './views/ListTag.vue'
import Register from './views/Register.vue'
import ListQues from './views/ListQues.vue'
import CreateQues from './views/CreateQues.vue'
import OneDetail from './views/OneDetail.vue'
import MyQuestions from './views/MyQuestions.vue'
import EditQuestion from './views/EditQuestion.vue'
import store from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: function (to, from, next) {
        if (localStorage.getItem('token')) {
          next({
            path: '/questions'
          })
        } else {
          next()
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
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
      children: [
        {
          path: '',
          name: 'all',
          component: ListQues
        }, {
          path: 'owned',
          name: 'owned',
          component: MyQuestions
        }, {
          path: 'edit',
          name: 'edit',
          component: EditQuestion
        },
        {
          path: 'create',
          name: 'create',
          component: CreateQues,
          beforeEnter: function (to, from, next) {
            if (store.state.isLogin) {
              next()
            } else {
              store.commit('SHOWLOGIN_TRUE')
            }
          }
        },
        {
          path: 'tags',
          name: 'listtag',
          component: ListTag
        },
        {
          path: 'tag/:tag',
          name: 'tagname',
          component: ListQues
        },
        {
          path: ':id',
          name: 'detail',
          component: OneDetail
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
