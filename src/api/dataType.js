import request from '@/utils/request'

export function updateDataType(params) {
    //更新模板测试案例接口
    return request({
        url: '/dataType/save',
        method: 'post',
        data: params
    })
}
export function dataTypeList(params) {
    //查询模板测试案例列表
    return request({
        url: '/dataType/list',
        method: 'post',
        data: params
    })
}

export function deleteDataType(params) {
    //删除模板测试案例
    return request({
        url: '/dataType/delete',
        method: 'post',
        data: params,
    })
}

export function enableDataType(params) {
    //应用模板测试案例
    return request({
        url: '/dataType/enable',
        method: 'post',
        data: params,
    })
}
