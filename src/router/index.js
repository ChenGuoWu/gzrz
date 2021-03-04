import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
    base: '/mobile/tyjgzrz/',
    routes: [{
        path: '/',
        name: 'login',
        component: () =>
            import('@/pages/Login.vue'),
        meta: {
            title: 'login'
        }
    },{
        path: '/home',
        name: 'home',
        component: () =>
            import('@/pages/index.vue'),
        meta: {
            title: '工作日志',
            keepAlive: true
        }
    },{
        path: '/Editlogs/day.vue',
        name: 'dayEdit',
        component: () =>
            import ('@/pages/Editlogs/day.vue'),
        meta: {
            title: '日写实'
        }
    },{
        path: '/Editlogs/quarter.vue',
        name: 'quarterEdit',
        component: () =>
            import ('@/pages/Editlogs/quarter.vue'),
        meta: {
            title: '季小结'
        }
    },{
        path: '/Editlogs/year.vue',
        name: 'yearEdit',
        component: () =>
            import ('@/pages/Editlogs/year.vue'),
        meta: {
            title: '年总结'
        }
    },{
        path: '/Editlogs/special.vue',
        name: 'special',
        component: () =>
            import ('@/pages/Editlogs/special.vue'),
        meta: {
            title: '特殊情况'
        }
    },{
        path: '/Editlogs/history.vue',
        name: 'history',
        component: () =>
            import ('@/pages/Editlogs/history.vue'),
        meta: {
            title: '历史'
        }
    },{
        path: '/Mylogs/day.vue',
        name: 'special',
        component: () =>
            import ('@/pages/Mylogs/day.vue'),
        meta: {
            title: '日写实'
        }
    },{
        path: '/Mylogs/year.vue',
        name: 'special',
        component: () =>
            import ('@/pages/Mylogs/year.vue'),
        meta: {
            title: '年总结'
        }
    },{
        path: '/Mylogs/quarter.vue',
        name: 'special',
        component: () =>
            import ('@/pages/Mylogs/quarter.vue'),
        meta: {
            title: '季小结',
            // keepAlive: true
        }
    },{
        path: '/Mylogs/details.vue',
        name: 'details',
        component: () =>
            import ('@/pages/Mylogs/details.vue'),
        meta: {
            title: '详情'
        }
    },{
        path: '/Todolist/quarter.vue',
        name: 'quarter',
        component: () =>
            import ('@/pages/Todolist/quarter.vue'),
        meta: {
            title: '季点评'
        }
    },{
        path: '/Todolist/details.vue',
        name: 'details',
        component: () =>
            import ('@/pages/Todolist/details.vue'),
        meta: {
            title: '详情'
        }
    },{
        path: '/Todolist/history.vue',
        name: 'history',
        component: () =>
            import ('@/pages/Todolist/history.vue'),
        meta: {
            title: '详情',
            other:'do'
        }
    },{
        path: '/Todolist/year.vue',
        name: 'year',
        component: () =>
            import ('@/pages/Todolist/year.vue'),
        meta: {
            title: '列表'
        }
    },{
        path: '/Todolist/yearDetails.vue',
        name: 'yearDetails',
        component: () =>
            import ('@/pages/Todolist/yearDetails.vue'),
        meta: {
            title: '详情'
        }
    },{
        path: '/Mylogs/evaluate.vue',
        path: '/Phone/phoneIndex.vue',
        name: 'phoneIndex',
        component: () =>
            import ('@/pages/Phone'),
        meta: {
            title: '查询'
        }
    },
    {
        path: '/Phone/detail.vue',
        name: 'phoneDetail',
        component: () =>
            import ('@/pages/Phone/detail'),
        meta: {
            title: '查询详情'
        }
    },
    { 
        path: '/Mylogs/evaluate.vue',
        name: 'evaluate',
        component: () =>
            import ('@/pages/Mylogs/evaluate.vue'),
        meta: {
            title: '评价详情',
            keepAlive: true
        }
    },
    { 
        path: '/Mylogs/yearDetails.vue',
        name: 'myyearDetails',
        component: () =>
            import ('@/pages/Mylogs/yearDetails.vue'),
        meta: {
            title: '详情'
        }
    }]
})