import {testProgramTemplate,runProgramTemplate,updateProgramTemplate,programTemplateList,deleteProgramTemplate} from "../../api/programTemplate"

const programTemplate = {
    actions: {
        //保存程序模板
        SaveProgramTemplate({ commit }, programTemplateInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                updateProgramTemplate(programTemplateInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获得程序模板列表
        ProgramTemplateList({ commit }, programTemplateInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                programTemplateList(programTemplateInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //删除程序
        DeleteProgramTemplate({ commit }, programTemplateInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                deleteProgramTemplate(programTemplateInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //测试程序模板
        RunProgramTemplate({ commit }, programTemplateInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                runProgramTemplate(programTemplateInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //测试程序模板
        TestProgramTemplate({ commit }, programTemplateInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                testProgramTemplate(programTemplateInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}
export default programTemplate