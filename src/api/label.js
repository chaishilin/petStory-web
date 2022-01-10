import request from '@/utils/request'

export function getLabel(params) {
    return request({
        url: '/getLabel',
        method: 'post',
        data: params
    })
}
export function updateLabel(params) {
    return request({
        url: '/updateLabel',
        method: 'post',
        data: params
    })
}
