import axios from "axios";
import router from "@/router.js";
const request = axios.create({
    timeout: 5000,
    headers: {
        "Content-type": "application/json;charset=UTF-8",
    }
});

function getJwtToken() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const userObj = JSON.parse(userData);
        return userObj && userObj.token? userObj.token : null;
    }
    return null;
}

// 添加一个请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 在这里，我们检查是否有 JWT 令牌，并添加到 Authorization 头中
        const token = getJwtToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加一个响应拦截器
request.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert('Token 过期，需要重新登录');
            localStorage.removeItem('user')
            router.push('/login');
        } else {
            alert('请求失败');
        }
        return Promise.reject(error);
    }
);

export default request;