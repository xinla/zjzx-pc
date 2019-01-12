<template>
    <div>
        <header class="header tf">
            <div class="cw clearfix">
                <h1 class="header-logo fl">
                    <router-link :to="{name:'index'}" @click.native="currentClassiftyCode = 0">
                        <img src="@/assets/images/index-logo.png" alt="直击真相">
                    </router-link>
                </h1>

                <div class="nav-wrapper fl">
                    <h3 class="nav-title">多一个人看到，少一个人受骗！</h3>
                    <nav class="nav">
                        <ul class="nav-list clearfix">
                            <router-link
                                :to="{name:'listDetail',params:{classify:0,id:0}}"
                                class="nav-item"
                                :class="{'current-nav':currentClassiftyCode == 0}"
                                @click.native="currentClassiftyCode = 0"
                                tag="li">
                                推荐
                            </router-link>
                            <router-link
                                :to="{name:'listDetail',params:{classify:item.classifycode,id:0}}"
                                class="nav-item"
                                :class="{'current-nav':currentClassiftyCode == item.classifycode}"
                                v-for="(item,index) in navList"
                                :key="index"
                                @click.native="currentClassiftyCode = item.classifycode"
                                tag="li">
                                {{item.classifyname}}
                            </router-link>
                        </ul>
                    </nav>
                </div>
                <div class="header-login fr">
                    <ul class="login-list">
                        <li class="login-item" v-if="!isLogin">
                            <router-link :to="{name:'login'}" class="login-item">登录</router-link>
                            <span class="line">|</span>
                            <router-link :to="{name:'login'}" class="login-item">注册</router-link>
                        </li>
                        <li class="login-item" v-else>
                            <router-link :to="{name:'userCenter'}">
                                <img :src="userPhoto" class="userPhoto">
                                <span class="username">{{userName}}</span>
                            </router-link>
                            <span class="login-quit" @click="signOut">退出登录</span>
                        </li>
                    </ul>
                    <div class="search">
                        <input type="text" class="search-input" v-model.trim="keyword" placeholder="直击真相">
                        <i class="iconfont icon-search" @click="search"></i>
                    </div>
                </div>
            </div>

        </header>
        <keep-alive>
            <router-view class="main-view cw" />
        </keep-alive>
    </div>
</template>

<script>
    import articleClassifyService from '@/services/article_classifyService'
    import searchService from '@/services/searchService'
    import userService from '@/services/userService'
    export default {
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
                userName: '用户名',
                userPhoto:"",
            }
        },
        mounted () {
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
                    this.userPhoto = localStorage.userImg;
                    this.userName = localStorage.userName;
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
        methods:{
            search(){
                this.keyword && this.$Tool.goPage({name:'search',query:{keyword:this.keyword}})
            },
            signOut(){
                let data = userService.logOut();
                if(data && data.status == "success"){
                    this.$confirm('退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(()=>{
                        this.$store.dispatch("userLogout");
                        this.$Tool.goPage({name:"login",path: "/login"});
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                    });
                }
            }
        },
        watch:{
            '$route'(to,from){
                to.params.classify && (this.currentClassiftyCode = to.params.classify);
            },
        }
    }
</script>

<style lang="less" scoped>
    .header{
        height: 100px;
        background-color: #262626;
        box-shadow: 0 2px 19px #9b9b9b;
        .header-logo{
            overflow: hidden;
            width: 130px;
            height: 125px;
            margin-right: 30px;
            a{
                display: block;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

        }
        .nav-wrapper{
            padding-top: 35px;
            .nav-title{
                font-size: 14px;
                color: #999;
            }
            .nav-list{
                margin-top: 12px;
                padding-right: 60px;
                border-top: 2px solid #696969;
                .nav-item{
                    float: left;
                    margin-top: -2px;
                    width: 60px;
                    line-height: 32px;
                    text-align: center;
                    font-size: 15px;
                    color: #fff;
                    border-top: 2px solid #696969;
                    cursor: pointer;
                }
                .current-nav{
                    border-top-color: #fc0;
                }
            }


        }
        .header-login{
            min-width: 188px;
            height: 100px;
            position: relative;
            .login-list{
                position: absolute;
                bottom: 45px;
                color: #fff;
                .login-item{
                    font-size: 12px;
                    &:first-child{
                        margin-left: 56px;
                    }
                    &:last-child{
                        width: 200px;
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
                position: absolute;
                bottom: 6px;
                left: 0;
                width: 100%;
                height: 24px;
                input{
                    width: 100%;
                    height: 100%;
                    line-height: 24px\9;
                    padding-left: 10px;
                    padding-right: 25px;
                    border-radius: 10px;
                }
                .iconfont{
                    position: absolute;
                    top: 2px;
                    right: 6px;
                    font-size: 18px;
                }
            }
        }
    }
    .main-view{
        margin: 135px auto 0;
    }

</style>
