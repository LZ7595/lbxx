import {createRouter, createWebHistory} from "vue-router";
import Home from './views/frontend/home.vue';
import IndexNav from "./views/frontend/IndexNav.vue";
import Rcdh from './views/frontend/rcdh.vue';
import Jcgy from './views/frontend/jcgy.vue';
import Rwjs from './views/frontend/rwjs.vue';
import Gywe from './views/frontend/gywe.vue';
import Gkxq from './views/frontend/gkIndex.vue';
import Login from './views/backend/Login.vue';

// 定义用户路由
const userRouter = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: IndexNav
            },
            {
                path: '/rcdh',
                component: Rcdh,
                // meta: {requiresAuth: true}
            },
            {
                path: '/jcgy',
                component: Jcgy
            },
            {
                path: '/rwjs',
                component: Rwjs
            },
            {
                path: '/gywe',
                component: Gywe
            },
            {
                path: '/:service/gkxq/:id',
                component: Gkxq,
                props: true
            }
        ]
    }
];
// 定义管理员路由
const adminRouter = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {}
];


// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: [...userRouter, ...adminRouter]
});
router.beforeEach((to, from, next) => {
    // 假设我们有一个函数来检查用户是否已登录
    const isAuthenticated = checkAuthentication(); // 你需要实现这个函数

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 如果目标路由需要认证
        if (!isAuthenticated) {
            // 用户未登录，重定向到登录页面
            next({
                name: 'Login',
                query: {redirect: to.fullPath} // 将尝试访问的URL作为参数传递给登录页面
            });
        } else {
            // 用户已登录，继续执行路由跳转
            next();
        }
    } else {
        // 如果路由不需要认证，直接放行
        next();
    }
});

// 确保你的项目中有一个checkAuthentication函数来检查用户是否已登录
// 这个函数可能会检查localStorage、Vuex状态管理或其他认证服务
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated;
}

export default router;