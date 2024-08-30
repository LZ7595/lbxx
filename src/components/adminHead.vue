<template>
    <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
    >
        <li>
            <router-link to="/admin">
                <img
                        style="height: 45px;"
                        src="../assets/adminlogo.png"
                        alt="lbxx admin logo"
                />
            </router-link>
        </li>
        <el-menu-item index="/admin">Processing Center</el-menu-item>
        <el-sub-menu index="2">
            <template #title>{{ user }}</template>
            <el-menu-item index="2-1">用户中心</el-menu-item>
            <el-menu-item @click="handleLogout">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import {useUserStore} from "../store/user.js";
import {ref} from 'vue';
import { storeToRefs } from "pinia";
import router from "../router.js";

export default {
    name: "adminHead",
    setup() {
        const userStore = useUserStore();
        const { authenticatedUser } = storeToRefs(userStore);
        const user = ref(authenticatedUser.value || localStorage.getItem('user')?.user || '未登录');
        const handleLogout = async () => {
            // 首先调用store的logout方法来重置状态
            userStore.logout();
            // 然后调用API服务来执行登出逻辑
            try {
                await userStore.logout(userStore.token); // 假设userStore中存储了token
                router.push('/login'); // 登出成功后重定向到登录页面
            } catch (error) {
                console.error('Failed to logout:', error);
                // 处理登出失败的情况
            }
        };

        return {
            user,
            handleLogout
        };
    }
}
</script>

<style scoped>
.el-menu--horizontal > li:nth-child(1) {
    margin: 10px auto 10px 5px;
}
</style>