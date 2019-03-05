import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


function State(){
    this.isScolling = false;
    this.selectedPublishName = "";
    this.selectedPublishAddress ="";
    this.blacklist = [];
}

let state = new State();
localStorage.blacklist && (state.blacklist = JSON.parse(localStorage.blacklist))
const mutations = {
    setIsScolling(state,data){
        state.isScolling = data;
    },
    setSelectedPublishName(state,data){
        state.selectedPublishName = data;
    },
    setSelectedPublishAddress(state,data){
        state.selectedPublishAddress = data;
    },

}



export default new Vuex.Store({
    state: {
        isScolling: false,
        selectedPublishName: "",
        selectedPublishAddress: "",
    },
    mutations: {
        loginOut(state){
            state = new State();
            window.localStorage.clear();
        },
        setIsScolling(state,data){
            state.isScolling = data;
        },
        setSelectedPublishName(state,data){
            state.selectedPublishName = data;
        },
        setSelectedPublishAddress(state,data){
            state.selectedPublishAddress = data;
        },

    },
    actions: {
        setIsScolling({commit},data) {
            commit("setIsScolling",data);
        },
        userLogout({commit}) {
            commit('loginOut');
        },
    }
})
