import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations.js'
const store = new Vuex.Store({
    state: {
        userInfo: {},
        userToken: '',
        showloading: false,
        showBh: false,
        delet:false,//删除按钮是否存在
        deletIdL:'',//删除按钮id
        breadList:[],//查询面包屑
        idList:[],//查询id集合
        backs:false,//判断是否是综合查询的返回按钮
        objectId: '', //保存后的ID
    },
    mutations
})

export default store