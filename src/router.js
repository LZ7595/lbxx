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
                component: Rcdh
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
const adminRouter = [{
    path: '/login',
    component: Login
}];


// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: [...userRouter,...adminRouter]
});
export default router;