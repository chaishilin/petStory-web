import request from '@/utils/request'
export function userInfoList() {
    return request({
        url:'/userInfoList',
        method:'get'
    })
}