import Vue from 'vue'
import Vuex from 'vuex'
import loginService from '@/services/login'
import userService from '@/services/user'

Vue.use(Vuex);

class State {
  constructor() {
        this.userId = 0
        this.userMobile = ''
        this.inviteCode = ''
        this.userName = ''
        this.userAvatar = ''
        this.isScolling = false
        this.selectedPublishName = ''
        this.selectedPublishAddress =''
        this.blacklist = []
    }
}

let state = new State();
localStorage.blacklist && (state.blacklist = JSON.parse(localStorage.blacklist))

function loginCallback(data) {
  localStorage.token = data.token
  window.GoTruth.$Tool.goPage({name: 'index', replace:true})
  location.reload()
}

export default new Vuex.Store({
    state,
    mutations: {
        SetUserId(state, data) {
            state.userId = data
        },
        SetUserMobile(state, data) {
            state.userMobile = data
        },
        SetInviteCode(state, data) {
            state.inviteCode = data
        },
        SetUserName(state, data) {
            state.userName = data
        },
        SetUserAvatar(state, data) {
            state.userAvatar = data
        },
        LogOut(state){
          debugger
            state = new State()
            window.localStorage.clear()
            window.location.reload()
        },
        SetIsScolling(state, data) {
            state.isScolling = data
        },
        SetSelectedPublishName(state, data) {
            state.selectedPublishName = data
        },
        SetSelectedPublishAddress(state, data) {
            state.selectedPublishAddress = data
        },
    },
    actions: {
        setUserId({commit}, data) {
            commit("SetUserId", data)
        },
        setUserMobile({commit}, data) {
            commit("SetUserMobile", data)
        },
        setInviteCode({commit}, data) {
            commit("SetInviteCode", data)
        },
        setUserName({commit}, data) {
            commit("SetUserName", data)
        },
        setUserAvatar({commit}, data) {
            commit("SetUserAvatar", data)
        },
        setIsScolling({commit}, data) {
            commit("SetIsScolling", data)
        },
        login({commit}, user) {
            loginService.loginByMobile(user.mobile, user.verifyCode).then(data => {
              loginCallback(data)
            })
        },
        loginByQQ({commit}, user) {
            loginService.loginByQQ(user).then(data => {
              loginCallback(data)
            })
        },
        loginByWx({commit}, user) {
            loginService.loginByWx(user).then(data => {
              loginCallback(data)
            })
        },
        loginByXl({commit}, user) {
            loginService.loginByXl(user).then(data => {
              loginCallback(data)
            })
        },
        getUserInfo({commit}) {
          if (localStorage.token) {
            userService.getCurentUser().then(data => {
                let user = data.user
                commit("SetUserId", user.id)
                commit("SetUserMobile", user.mobile)
                commit("SetInviteCode", user.invitecode)
                commit("SetUserAvatar", GoTruth.$Tool.headerImgFilter(user.imageurl))
                commit("SetUserName", user.username)
            })
          }
        },
        logOut({commit}) {
          debugger
            loginService.logOut(localStorage.token).then(data => {
                commit('LogOut')
                window.GoTruth.$message({
                    type: 'success',
                    message: '退出成功!'
                });

            })
        },
    }
})
