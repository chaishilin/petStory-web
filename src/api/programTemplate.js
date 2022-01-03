import request from '@/utils/request'

export function updateProgramTemplate(params) {
    //更新程序模板接口
    return request({
        url: '/programTemplate/save',
        method: 'post',
        data: params
    })
}
export function programTemplateList(params) {
    //查询程序模板列表
    return request({
        url: '/programTemplate/list',
        method: 'post',
        data: params
    })
}

export function deleteProgramTemplate(params) {
    //删除程序模板
    return request({
        url: '/programTemplate/delete',
        method: 'post',
        data: params,
    })
}

export function runProgramTemplate(params) {
    //测试程序模板
    return request({
        url: '/programTemplate/runTemplate',
        method: 'post',
        data: params,
    })
}

export function testProgramTemplate(params) {
    //测试程序模板
    return request({
        url: '/programTemplate/testTemplate/',
        method: 'post',
        data: params,
    })
}