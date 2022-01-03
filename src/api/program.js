import request from '@/utils/request'
export function doProgram(params) {
    //远程运行程序接口
    return request({
        url: '/doRemoteProgram',
        method: 'post',
        data: params
    })
}
export function saveProgram(params) {
    //保存程序接口
    return request({
        url: '/saveProgram',
        method: 'post',
        data: params
    })
}
export function programList(params) {
    //查询程序列表接口
    return request({
        url: '/programList',
        method: 'post',
        data: params
    })
}

export function deleteProgram(params) {
    //删除程序
    return request({
        url: '/deleteProgram',
        method: 'post',
        data: params,
    })
}

export function supportLanguageList() {
    //系统支持的编程语言
    return request({
        url: '/supportLanguageList',
        method: 'get'
    })
}