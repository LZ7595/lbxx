import {createRouter, createWebHistory} from "vue-router";
// 定义用户路由
const userRouter = [
    {
        path: '/',
        component: ()=> import('@/views/frontend/home.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: ()=> import('@/views/frontend/IndexNav.vue')
            },
            {
                path: '/rcdh',
                component: ()=> import('@/views/frontend/rcdh.vue'),
            },
            {
                path: '/jcgy',
                component: ()=> import('@/views/frontend/jcgy.vue')
            },
            {
                path: '/rwjs',
                component: ()=> import('@/views/frontend/rwjs.vue')
            },
            {
                path: '/gywe',
                component: ()=> import('@/views/frontend/gywe.vue')
            },
            {
                path: '/:service/gkxq/:id',
                component: ()=> import('@/views/frontend/gkIndex.vue'),
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
        component: ()=> import('@/views/backend/Login.vue')
    },
    {
        path: '/admin/',
        component: ()=> import('@/views/backend/adminHome.vue'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '',
                component: () => import('@/views/backend/rcgl.vue')
            },
            {
                path: 'jcgl',
                component: ()=>import('@/views/backend/jcgl.vue')
            },
            {
                path: 'userManage',
                component: ()=>import('@/views/backend/userManage.vue')
            },
            {
                path: 'userCenter',
                component: ()=>import('@/views/backend/userCenter.vue')
            }
            ]
    }
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
    const userData = localStorage.getItem('user');
    if (userData) {
        const userObj = JSON.parse(userData);
        return userObj && userObj.isAuthenticated!== undefined? userObj.isAuthenticated : false;
    }
    return false;
}
export default router;