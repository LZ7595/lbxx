import axios from "axios";
const request = axios.create({
    timeout: 5000,
    headers:{
        "Content-type": "application/json;charset=UTF-8"
    }
})
function getJwtToken() {
    // 这里应该是你获取JWT令牌的逻辑
    // 例如，从localStorage或Vuex等地方获取
    return localStorage.getItem('user-token') || '';
}

// 添加一个请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 在这里，我们检查是否有JWT令牌，并添加到Authorization头中
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
export default request