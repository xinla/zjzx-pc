<template>
    <div class="wrap">
        <div class="header wrapper clearfix">
            <div class="header-logo fl">
                <router-link :to="{name:'index'}" @click.native="currentClassiftyCode = 0">
                    <img src="@/assets/images/logo1.png" alt="直击真相">
                </router-link>
            </div>

            <ul class="header-right fr clearfix">
                <router-link :to="{path:'login'}" class="item" tag="li" v-if="noLogin">登录</router-link>
                <router-link :to="{path:'login'}" class="item" tag="li" v-if="noLogin">注册</router-link>
                <li class="item" v-if="logined">
                    <img :src="userPhoto">
                    <span class="username">{{username}}</span>
                </li>
                <li class="item item-quit" @click="signOut">退出登录</li>
                <li class="item">反馈</li>
                <li class="item">投诉</li>
            </ul>
            <div class="search-input fr">
                <input type="search" v-model.trim="keyword" placeholder="双十一打折的背后">
                <div class="search-icon">
                    <i class="iconfont icon-search" @click="search"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import articleClassifyService from '@/services/article_classifyService'
    import userService from '@/services/userService'
    export default {
        name: "userHeader",
        data(){
            return{
                classifyList:[],
                classifyIndex:0,
                noLogin:false,
                logined:false,
                username:'',
                userPhoto:'',
                keyword:'',
            }
        },
        mounted(){
            this.$nextTick(()=>{
               if(!localStorage.classify){
                   articleClassifyService.getArticleClassifyList((data) =>{
                       this.classifyList = Object.freeze(data.result.classfyList);;
                       localStorage.classify = JSON.stringify(this.classifyList);
                   });
               }else{
                   this.classifyList = Object.freeze(JSON.parse(localStorage.classify));
               }
            });
            if(!localStorage.id) {
                this.noLogin = true;
                this.logined = false;
            }else{
                this.noLogin = false;
                this.logined = true;
                this.username = localStorage.userName;
                this.userPhoto = localStorage.userImg;
            }
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
        }
    }
</script>

<style lang="less" scoped>
    .wrap{
        background-color: #262626;
        box-shadow:0 2px 19px #9b9b9b;
        .header{
            height: 50px;
            line-height: 50px;
            .item{
                float: left;
                color: #fff;
                cursor: pointer;
                img{
                    width: 28px;
                    height: 28px;
                    margin-right: 10px;
                    border-radius: 50%;
                }
            }
            .header-right{
                .item{
                    font-size: 12px;
                    margin-right: 16px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
                .item-quit{
                    color: #ec414d;
                }
            }
                .search-input{
                    position: relative;
                    width: 199px;
                    height: 23px;
                    margin-top: 14px;
                    margin-right: 80px;
                    border: 1px solid #7d7d7d;
                    border-radius: 16px;
                    input{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 172px;
                        height: 100%;
                        line-height: 23px\9;
                        padding: 0 10px;
                        border-radius: 16px 0 0 16px;
                    }
                    .search-icon{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 27px;
                        height: 100%;
                        background-color: #fff;
                        border-radius: 0 16px 16px 0;
                        .iconfont{
                            position: relative;
                            top: -14px;
                            left: 0;
                            font-size: 20px;
                        }
                    }
                }

        }
    }
</style>
