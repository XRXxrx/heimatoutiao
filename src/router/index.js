import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            name: 'login',
            path: '/login',
            component: () =>
                import ('@/views/user/login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: () =>
                import ('@/views/user/register.vue')
        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () =>
                import ('@/views/user/personal.vue')
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () =>
                import ('@/views/user/edit_profile.vue')
        }
    ]
})

import { Toast } from 'vant';
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') !== -1) {
        let token = localStorage.getItem('heima_token2')
        if (token) {
            next()
        } else {
            Toast('未登录');
            next({ name: 'login' })
        }
    } else {
        next()
    }

})
export default router