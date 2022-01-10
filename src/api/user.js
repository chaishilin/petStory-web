import request from '@/utils/request'

export function newUserId(params) {
    return request({
        url: '/newUserId',
        method: 'post',
        data: params
    })
}


export function getUserCount(params) {
    return request({
        url: '/getUserCount',
        method: 'post',
        data: params
    })
}