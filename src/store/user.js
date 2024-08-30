// store/user.js
import {defineStore} from 'pinia';
import request from "@/request/request.js";
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        token: null,
    }),
    persist: {
        enable: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage
            }
        ]
    },
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
            request.post(`/api/logout`).then(
                () => {this.reset();
                    console.log("登出成功")
                }
            ).catch(error => {
                // 使用.catch()来处理错误
                console.error('Logout failed', error);
            });
        },

        reset() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('user')

        }
    },
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        authenticatedUser: (state) => state.user,
    },
});