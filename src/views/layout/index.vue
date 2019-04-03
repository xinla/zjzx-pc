<template>
    <div>
        <header :class="['header-wrap',{tf:isSwitch}]">
            <div class="wrapper clearfix">

                <div class="header-logo-big" v-show="!isSwitch">
                    <img class="logo" src="@/assets/images/logo-icon.png" alt="直击真相">
                    <strong class="">直击真相</strong>
                    <div class="search">
                        <input type="text" class="search-input" v-model.trim="keyword" placeholder="请输入您要搜索的内容">
                        <div class="search-button ac cp" @click="search">搜索</div>
                    </div>
                </div>

                <div class="header">
                    <h1 class="header-logo fl" v-show="isSwitch">
                        <router-link :to="{name:'index'}" @click.native="currentClassiftyCode = 0">
                            <img class="logo" src="@/assets/images/logo-icon.png" alt="直击真相">
                        </router-link>
                    </h1>

                    <div class="nav-wrapper fl" :style="{width:isSwitch?'57%':'85%'}">
                        <nav class="nav">
                            <ul class="nav-list clearfix">
                                <router-link
                                    :to="{name:'/'}"
                                    class="nav-item"
                                    @click.native="currentClassiftyCode = 0"
                                    tag="li">
                                    首页
                                </router-link>
                                <router-link
                                    class="nav-item"
                                    v-for="(item,index) in navList"
                                    :key="index"
                                    :to="{name:'listDetail',params:{classify:item.classifycode,id:0}}"
                                    :class="{'current-nav':currentClassiftyCode == item.classifycode}"
                                    @click.native="currentClassiftyCode = item.classifycode"
                                    tag="li">
                                    {{item.classifyname}}
                                </router-link>
                                <router-link 
                                    :to="{name:'download'}" 
                                    class="nav-item"
                                    @click.native="currentClassiftyCode = 0"
                                    tag="li">
                                  下载App
                                </router-link>
                            </ul>
                        </nav>
                    </div>
                    <div class="header-login fr">
                        <div class="search" v-show="isSwitch">
                            <input type="text" class="search-input" v-model.trim="keyword" placeholder="直击真相">
                            <i class="iconfont icon-search" @click="search"></i>
                        </div>
                        <ul class="login-list">
                            <li class="login-item" v-if="!isLogin">
                                <router-link :to="{name:'login'}" class="login-item">登录</router-link>
                                <span class="line">|</span>
                                <router-link :to="{name:'login'}" class="login-item">注册</router-link>
                            </li>
                            <li class="login-item" v-else>
                                <router-link :to="{name:'publish',query:{userId:$store.state.userId}}">
                                    <img :src="$store.state.userAvatar" class="userPhoto">
                                    <span class="username">{{$store.state.userName}}</span>
                                </router-link>
                                <span class="login-quit" @click="signOut">退出登录</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </header>

            <router-view class="main-view wrapper" :key="$route.params.classify" :style="{marginTop:isSwitch?'156px':'20px'}" />
        <keep-alive>
        </keep-alive>

        <ul class="quick-wrap">
          <li class="li">
            <a href="#" title="">
                <i class="iconfont icon-go-top"></i>
            </a>
          </li>
          <li class="li" @click="$store.commit('SetRelease', 'article')"><i class="iconfont icon-bianji"></i></li>
          <li class="li">
            <img class="qrcode" src="../../assets/images/app-downlad-code.png" alt="下载直击真相APP">
            <h3>
              下载直击真相APP
            </h3>
            <img class="qrcode" src="../../assets/images/open_qrcode.png" alt="下载直击真相APP">
            <h3>
              关注官方公众号
            </h3>
          </li>
        </ul>
        
        <base-footer></base-footer>

    </div>
</template>

<script>
    import articleClassifyService from '@/services/article_classifyService'
    import searchService from '@/services/searchService'
    import userService from '@/services/userService'
    import baseFooter from '@/components/baseFoot'
    export default {
        components:{
            baseFooter
        },
        data () {
            return {
                navList:Object.freeze([
                    {"classifyname":"揭秘","classifycode":1},
                    {"classifyname":"防骗","classifycode":2},
                    {"classifyname":"打假","classifycode":3},
                    {"classifyname":"寻亲","classifycode":4},
                    {"classifyname":"普法","classifycode":5},
                    {"classifyname":"打工","classifycode":6},
                    {"classifyname":"娱乐","classifycode":7}
                ]),
                hotKeywords:[],
                classifyIndex:0,
                currentClassiftyCode:0,
                keyword:'',
                isLogin:false,
                // 顶部样式切换开关
                isSwitch: false,
            }
        },
        watch:{
            '$route'(to,from){
                to.params.classify && (this.currentClassiftyCode = to.params.classify);
            },
        },
        mounted() {
            this.$store.dispatch('getUserInfo')
            document.addEventListener('scroll', this.switchHeader)
            this.$nextTick(()=>{
                // 获取栏目分类
                if(!localStorage.classify) {
                    articleClassifyService.getArticleClassifyList((data)=>{
                        if(data && data.status == "success") {
                            this.navList = Object.freeze(data.result.classfyList);
                            localStorage.classify = JSON.stringify(this.navList);
                        }
                    });
                }else{
                    this.navList = Object.freeze(JSON.parse(localStorage.classify));
                }
                // 判断用户是否登录
                if (!localStorage.getItem('token')) {
                    this.isLogin = false;
                }else{
                    this.isLogin = true;
                }
                //获取最热关键字
                searchService.getHotKeyword(data=>{
                    if (data && data.status == "success") {
                        this.hotKeywords = data.recordList;
                    }
                });
            });
        },
        destroyed () {
            document.removeEventListener('scroll', this.switchHeader); 
        },
        methods:{
            search(){
                this.keyword && this.$Tool.goPage({name:'search',query:{keyword:this.keyword}})
            },
            signOut(){
                this.$confirm('退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(()=>{
                    this.$store.dispatch("logOut")
                });
            },
            switchHeader() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop >= 150 ? this.isSwitch = true : this.isSwitch = false
                // console.log(scrollTop)
            }
        }
    }
</script>

<style lang="less" scoped>
    input::-webkit-input-placeholder { /* WebKit browsers */
      color: #ccc;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #ccc;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #ccc;
    }
   .logo{
        width: 52px;
        height: 52px;
    }
    .header-wrap{
        background-color: @mainColor;
        .header{
          height: 52px;
        }
        .header-logo-big {
            margin: 25px 0;
            .logo,strong,.search{
                vertical-align: middle;
            }
            strong {
                font-size: 40px;
                margin: 0 25px;
            }
            .search {
                display: inline-block;
                line-height: 40px;
            }
            .search-input {
                line-height: 40px;
                width: 300px;
                text-indent: 20px;
            }
            .search-button {
                display: inline-block;
                width: 100px;
                font-size: 20px;
                color: #fff;
                vertical-align: middle;
                background: @currentColor;
                border-radius: 0 5px 5px 0;
            }
        }
        /* box-shadow: 0 2px 19px #9b9b9b; */
        .header-logo{
            overflow: hidden;
            margin-right: 5px;
            a{
                display: block;
            }

        }
        .nav-wrapper{
            // padding-top: 35px;
            .nav-title{
                font-size: 14px;
                color: #999;
            }
            .nav-list{
                .nav-item{
                    float: left;
                    width: 11%;
                    line-height: 50px;
                    text-align: center;
                    font-size: 15px;
                    color: #998760;
                    cursor: pointer;
                }
                .current-nav,.router-link-active{
                    border-bottom: 2px solid #f39800;
                    color: @currentColor;
                }
            }


        }
        .header-login{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            .login-list{
                display: inline-block;
                color: #fff;
                .login-item{
                    font-size: 12px;
                    &:first-child{
                        margin-left: 56px;
                    }
                    &:last-child{
                        max-width: 150px;
                        margin-left: 0;
                    }
                    .line{
                        margin: 0 10px;
                    }
                    .userPhoto{
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        margin-right: 6px;
                        border-radius: 50%;
                    }
                    .username{
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 5px;
                        max-width: 100px;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    .login-quit{
                        vertical-align: middle;
                        font-size: 12px;
                        color: #ec414d;
                        cursor: pointer;
                    }

                }

            }
            .search{
                position: relative;
                width: 250px;
                height: 35px;
                display: inline-block;
                margin-right: 20px;
                input{
                    width: 100%;
                    height: 100%;
                    line-height: 24px;
                    padding-left: 10px;
                    padding-right: 25px;
                }
                .iconfont{
                    position: absolute;
                    line-height: 35px;
                    right: 6px;
                    font-size: 18px;
                }
            }
        }
    }
    .main-view{
        margin: 20px auto;
    }
    sup.download {
        font-size: 10px;
        color: rgba(255, 204, 0, 0.73);
    }
    .quick-wrap {
      // display: flex;
      // flex-direction: column;
      // align-items: flex-end;
      position: fixed;
      right: 35px;
      top: 50%;
      // transform: translateY(-50%);
      transform: translate3d(0,-50%,1px);
      color: #fff;
      z-index: 9;
      .li {
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #aaa;
        margin-bottom: 5px;
        border-radius: 5px;
        margin-left: auto;
        &:last-child {
          white-space: nowrap;
          background: none;
          color: #333;
          line-height: 25px;
          width: 110px;
          height: auto;
          .qrcode {
            border: 1px solid #f5f5f5;
          }
        }
        .iconfont {
          font-size: 22px;
        }
      }
    }
</style>
