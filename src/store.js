import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isScolling: false,
    selectedPublishName: "",
    selectedPublishAddress: "",
  },
  mutations: {
    setIsScolling(state,data){
      state.isScolling = data; 
    },
    setSelectedPublishName(state,data){
      state.selectedPublishName = data;
    },
    setSelectedPublishAddress(state,data){
      state.selectedPublishAddress = data;
    }
  },
  actions: {
    setIsScolling({commit},data) {
      commit("setIsScolling",data);
    },
  }
})
