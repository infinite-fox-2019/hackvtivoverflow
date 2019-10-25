import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuestionList from './views/QuestionList.vue'
import DetailPage from './views/DetailPage.vue'
import Post from './views/Post.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

const VueRouter = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionList
    },
    {
      path: '/detailpage/:id',
      name: 'detailpage',
      component: DetailPage
    },
    {
      path: '/post',
      name: 'post',
      component: Post
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
    }
  ]
})

VueRouter.beforeEach((to, from, next)=>{
  const token = localStorage.getItem('access_token')
  if(to.name == 'login' && !token){
    next()
  }
  else if(to.name == 'register' && !token){
    next()
  }
  else if(to.name == 'login' && token){
    next('/')
  }
  else if(to.name == 'register' && token){
    next('/')
  }
  else if(token){
    next()
  }
  else{
    next('/login')
  }
})

export default VueRouter
