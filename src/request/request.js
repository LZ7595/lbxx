import axios from "axios";
const request = axios.create({
    timeout: 5000,
    headers:{
        "Content-type": "application/json;charset=UTF-8"
    }
})
// request.interceptors.request.use((config) => {
//     const userStore = useUserStore()
//     if (userStore.token) {
//         config.headers.token = userStore.token
//     }
//     return config
// })

//响应拦截
// request.interceptors.response.use(
//     (response) => {
//         return response.data
//     },
//     (error) => {
//         let message = ''
//         const status = error.response.status
//         switch (status) {
//             case 401:
//                 message = 'TOKEN过期'
//                 break
//             case 403:
//                 message = '无权访问'
//                 break
//             case 404:
//                 message = '请求地址错误'
//                 break
//             case 500:
//                 message = '服务器出现问题'
//                 break
//             default:
//                 message = '网络出现问题'
//                 break
//         }
//         //提示错误信息
//         //...
//         return Promise.reject(error)
//     },
// )
export default request