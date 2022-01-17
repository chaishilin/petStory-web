import axios from "axios";
import store from "../store"


//创建axios实例
const service = axios.create({
    baseURL:'/api',
    timeout:15000,
})
service.interceptors.request.use((config) => {
    //给请求头的设置Token, Cookies.get()用于获取存放在 Cookie 的 Token
    config.headers["token"] = localStorage.getItem("token");
    config.headers["myToken"] = store.getters.getToken;//两种拿toekn的方法
    config.headers["userId"] = localStorage.getItem("userId");//两种拿toekn的方法
    //这一步是必须的！
    return config
}, (error) => {
    return Promise.reject(error);
});

export default service