import request from '@/utils/request'

export function newPet(params) {
    return request({
        url: '/newPet',
        method: 'post',
        data: params
    })
}
