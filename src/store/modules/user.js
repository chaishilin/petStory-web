import {newUserId,getUserCount} from "../../api/user"

const user = {
    actions: {
        NewUserId({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                newUserId(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        GetUserCount({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                getUserCount(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
       
    }
}
export default user