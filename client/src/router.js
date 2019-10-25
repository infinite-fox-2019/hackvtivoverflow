import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ './views/register.vue'),
  },
  {
    path: '/overflow',
    name: 'overflow',
    component: () => import(/* webpackChunkName: "overflow" */ './views/overflow.vue'),
    children: [{
      path: 'all',
      name: 'all',
      component: () => import(/* webpackChunkName: "allQuestions" */ './views/allQuestions.vue'),
    },
    {
      path: 'myquestions',
      name: 'myquestions',
      component: () => import(/* webpackChunkName: "myQuestions" */ './views/myQuestions.vue'),
    },
    {
      path: 'byTags',
      name: 'byTags',
      component: () => import(/* webpackChunkName: "byTags" */ './views/byTags.vue'),
    },
    {
      path: 'myAnswers',
      name: 'myAnswers',
      component: () => import(/* webpackChunkName: "myAnswers" */ './views/myAnswers.vue'),
    },
    {
      path: ':id',
      name: 'allDetails',
      component: () => import(/* webpackChunkName: "allDetails" */ './views/allDetails.vue'),
    },
    ],
  },
  ],
});
