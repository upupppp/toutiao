import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '@/store'
import {Toast} from 'vant'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            name: 'login',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register')
        },
        {
            path: '/search',
            name: 'search',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/search')
        },
        {
            path: '/article/:articleId',
            name: 'article',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/article'),
            props: true
        },
        {
            path: '/user/profile',
            name: 'userprofile',
            meta: {
                requireAuth: true
            },
            component: () => import('@/views/userprofile'),
            props: true
        },
        {
            path: '/userchat',
            name: 'userchat',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/userchat'),
            props: true
        },
        {
            path: '/usercollect',
            name: 'usercollect',
            meta: {
                requireAuth: true // 表示进入这个路由需要登录
            },
            component: () => import('@/views/usercollect'),
            props: true
        },
        {
            path: '/userhistory',
            name: 'userhistory',
            meta: {
                requireAuth: true
            },
            component: () => import('@/views/usercollect'),
            props: true
        },
        {
            path: '/',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/layout'),
            children: [{
                    path: '', //默认子路由
                    component: () => import('@/views/home')
                },
                {
                    path: '/todolist',
                    meta: {
                        requireAuth: false
                    },
                    component: () => import('@/views/todolist')
                },
                {
                    path: '/weather',
                    meta: {
                        requireAuth: false
                    },
                    component: () => import('@/views/weather')
                },
                {
                    path: '/my',
                    meta: {
                        requireAuth: false
                    },
                    component: () => import('@/views/my')
                }
            ]
        }
    ]
})
// 定义了meta中是否需要登陆, 然后再router.beforeEach中添加条件语句
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.user) { yield
            next();
        } else {
            Toast('请登录后访问')
        }
    } else {
        next();
    }
})


export default router;