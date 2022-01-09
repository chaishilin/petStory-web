import request from '@/utils/request'

export function getStory(params) {
    return request({
        url: '/getStory',
        method: 'post',
        data: params
    })
}
export function updateStory(params) {
    return request({
        url: '/updateStory',
        method: 'post',
        data: params
    })
}
