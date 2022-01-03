import { login, logout,resetPassword } from "../../api/login"
import { register } from "../../api/register"
import {userInfoList} from "../../api/userInfoList"

const user = {
    state: {
        token:''
    },
    getters: {
      getToken:state=>state.token  
    },
    mutations: {
        setToken(state, token) {
            state.token = token
      }  
    },
    actions: {
        //登录
        Login({ commit }, userInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                //封装一个promise
                login(username, userInfo.password).then((responce) => {
                    if (responce.data.data != null && responce.data.data.token != null) {
                        commit('setToken', responce.data.data.token)//提交一个mutation，通知状态改变
                    }
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //注册
        Register({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                register(username, userInfo.password).then((responce) => {
                    commit('')
                    resolve(responce)
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获取用户列表
        UserInfoList({ commit }) {
            return new Promise((resolve, reject) => {
                userInfoList().then((responce) => {
                    commit('')
                    resolve(responce)
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //用户退出
        UserLogout({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then((responce) => {
                    commit('')
                    resolve(responce)
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //修改密码
        ResetPassword({ commit },params) {
            return new Promise((resolve, reject) => {
                resetPassword(params).then((responce) => {
                    resolve(responce)
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}
export default user