const mutations = {
    Login_in(state, info) {
        state.userInfo = info
    },
    set_token(state, info) {
        state.userToken = info
    },
    show_loading(state) {
        state.showloading = true
    },
    hide_loading(state) {
        state.showloading = false
    },
    show_delet(state) {
        state.delet = true;
    },
    hide_delet(state) {
        state.delet = false;
    },
    id_delet(state,info) {
        state.deletIdL = info;
    },
    addBreadList(state,info){
        state.breadList.push(info)
    },
    popBreadList(state,info){
        state.breadList.pop();
    },
    addIdList(state,info){
        state.idList.push(info);
    },
    PopIdList(state,info){
        state.idList.pop();
    },
    backsTrue(state,info){
        state.backs=true;
    },
    backsFalse(state,info){
        state.backs=false;
    },
    setobjectId(state,info){
        state.objectId=info;
    }
}
export default mutations