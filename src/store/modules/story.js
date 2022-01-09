import {updateStory,getStory} from "../../api/story"

const story = {
    actions: {
        //保存程序模板
        GetStory({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                getStory(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获得程序模板列表
        UpdateStory({ commit }, dataTypeInfo) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                updateStory(dataTypeInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
       
    }
}
export default story