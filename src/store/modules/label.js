import {getLabel,updateLabel} from "../../api/label"

const label = {
    actions: {
        GetLabel({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                getLabel(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        UpdateLabel({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                updateLabel(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
       
    }
}
export default label