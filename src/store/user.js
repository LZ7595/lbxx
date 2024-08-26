// store/user.js
import {defineStore} from 'pinia';
import request from "@/request/request.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        token: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await request.post(`/api/login`, credentials);
                console.log(response.data)
                switch (response.data.code) {
                    case 200: {
                        this.token = response.data.data.token;
                        this.user = response.data.data.user;
                        this.isAuthenticated = true;
                        localStorage.setItem('user-token', this.token);
                        return {success: true, user: this.user}; // 返回一个成功对象
                    }
                    case 500: {
                        return {success: false, error: response.data.msg}; // 返回一个错误对象
                    }
                    default: {
                        return {success: false, error: "未知错误"}; // 返回一个错误对象
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                this.reset();
                return {success: false, error: error.message}; // 返回一个错误对象
            }
        },

        logout() {
            // 清除状态
            this.reset();

            // 清除 localStorage 中的令牌
            localStorage.removeItem('user-token');

            // 可以在这里触发一个事件或通知，让其他组件知道用户已登出
            // 例如：通过 Vuex 的 mutation 或 Pinia 的 action 触发一个登出状态
        },

        reset() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
        },
    },
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        authenticatedUser: (state) => state.user,
    },
});