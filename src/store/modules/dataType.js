import {enableDataType,updateDataType,dataTypeList,deleteDataType} from "../../api/dataType"

const dataType = {
    actions: {
        //保存程序模板
        SaveDataType({ commit }, dataTypeInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                updateDataType(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获得程序模板列表
        DataTypeList({ commit }, dataTypeInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                dataTypeList(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //删除程序
        DeleteDataType({ commit }, dataTypeInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                deleteDataType(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //测试程序模板
        EnableDataType({ commit }, dataTypeInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                enableDataType(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}
export default dataType