import request from '@/utils/request'
export function login(username, password) {
    //登录接口
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function logout() {
    //退出登录接口
    return request({
        url: '/logout',
        method: 'post'
    })
}


export function resetPassword(params) {
    //修改密码接口
    return request({
        url: '/resetPassword',
        method: 'post',
        data:params
    })
}
