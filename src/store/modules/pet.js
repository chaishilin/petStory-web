import {newPet} from "../../api/pet"

const pet = {
    actions: {
        NewPet({ commit }, params) {
            return new Promise((resolve, reject) => {
                //封装一个promise
                newPet(params).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
    }
}
export default pet