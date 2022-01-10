import Vue from "vue";
import Vuex from "vuex"
import user from '@/store/modules/user'
import story from '@/store/modules/story'
import pet from '@/store/modules/pet'
import label from '@/store/modules/label'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,//使用user.js 中的action
        story,
        pet,
        label,
    }
})

export default store