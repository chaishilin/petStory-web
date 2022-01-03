import request from '@/utils/request'
export function register(username, password) {
    return request({
        url:'/register',
        method:'post',
        data: {
            username,
            password
        }
    })
}