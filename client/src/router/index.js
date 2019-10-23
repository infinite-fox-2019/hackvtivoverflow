import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'login' */ '../views/Login'),
        children:
            [
                {
                    path: '',
                    name: 'login',
                    component: () => import(/* webpackChunkName: 'loginForm' */ '../views/Login/LoginForm')
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import(/* webbpackChunkName: 'registerForm' */ '../views/Login/RegisterForm')
                }
            ]
    },
    {
        path: '/thread',
        component: () => import(/* webpackChunkName: "Thread" */ '../views/RouteThread.vue'),
        children:
            [
                {
                    path: '',
                    name: 'thread',
                    beforeEnter(to, from, next) {
                        next('/')
                    }
                },
                {
                    path: 'create',
                    name: 'create-thread',
                    component: import(/* webpackChunkName: "CreateThread" */'../views/Thread/CreateThread.vue'),
                    beforeEnter(to, from, next) {
                        if (!Store.state.user.login) {
                            next('/login')
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: ':id',
                    children:
                        [
                            {
                                path: '',
                                name: 'single-thread',
                                component: import(/* webpackChunkName: 'SingleThread' */'../views/Thread/SingleThread.vue'),
                            },
                            {
                                path: 'reply',
                                name: "reply-thread",
                                component: import(/* webpackChunkName: 'ReplyThread' */ '../views/Thread/ReplyThread.vue'),
                                beforeEnter(to, from, next) {
                                    if (!Store.state.user.login) {
                                        next('/login')
                                    } else {
                                        next()
                                    }
                                }
                            }
                        ]
                }
            ]
    },
    {
        path: '/tags',
        name: 'Tag',
        component: import(/* webpackChunkName: 'Tags' */ '../views/Tag.vue'),
        children:
            [
                {
                    path: ':id',
                    name: 'single-tag',
                    component: import(/* webpackChunkName: 'SingleTag' */ '../views/Tags/SingleTag.vue')
                }
            ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    if (token && username && email) {
        Store.commit("user/RELOGIN");
    }
    next()
})

export default router
