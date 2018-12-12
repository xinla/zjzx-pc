<template>
    <div class="wrap">
        <div class="user-info cw">
            <div class="user-bg">
                <div class="user-fans user-public">
                    <div class="user-position">
                        <span class="fans-num">{{fansCount}}</span>
                        <h4 class="fans-tit">粉丝</h4>
                    </div>
                </div>
                <div class="user-focus user-public">
                    <div class="user-position">
                        <span class="focu-num">{{focusCount}}</span>
                        <h4 class="focus-tit">关注</h4>
                    </div>
                </div>
            </div>
            <div class="user-desc">
                <div class="user-head">
                    <img :src="$Tool.headerImgFilter(user.imageurl)">
                </div>
                <span class="user-name">{{user.username}}</span>
                <div class="focus-btn" @click="handelFocus">{{focusState?'已关注':'+ 关注'}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import followService from '@/services/followService'
    import userService from '@/services/userService'
    export default {
        name: "userInfo",
        data(){
            return{
                fansCount:0,
                focusCount:0,
                userId: 0,
                user:{},
                focusState: false
            }
        },
        mounted(){
            this.$route.query.userId ? this.userId = this.$route.query.userId : this.userId = localStorage.id;
            this.$nextTick(()=>{
                this.init();
            });
        },
        methods:{
            init(){
                // 判断用户是否登录
              if (localStorage.id && localStorage.id == this.userId) {
                this.user = {
                    imageurl:localStorage.userImg,
                    username:localStorage.userName
                }
              }else{
                // 获取用户信息
                userService.getUserById(this.userId,(data)=>{
                    if(data && data.status == "success") {
                        this.user = data.result.user;
                    }
                });
              }
                // 获取粉丝数量
                followService.getUserVermicelliCount(this.userId,(data)=>{
                    if(data && data.status == "success") {
                        this.fansCount = data.result.count;
                    }
                });

                //获取关注数量
                followService.getUserFollowCount(this.userId,(data)=>{
                   if(data && data.status == "success") {
                       this.focusCount = data.result.count;
                   }
                });


                // 获取用户关注状态
                followService.testFollow(this.userId,(data) =>{
                    if(data && data.status == "success") {
                        if(data.result == 1) {
                            this.focusState = true;
                        }else{
                            this.focusState = false;
                        }
                    }
                });
            },
            // 关注该用户
            handelFocus(){
                followService.doFollow(this.userId,(data)=>{
                    if(data && data.status == "success") {
                        if(data.result == 1) {
                            this.$message({
                                message: '关注成功',
                                type: 'success',
                                center:true
                            });
                            this.focusCount ++;
                            this.focusState = true;
                        }else{
                            this.$message({
                                message: '取消关注',
                                center:true
                            });
                            this.focusCount --;
                            this.focusState = false;
                        }
                    }
                });

            }
        },
    }
</script>

<style lang="less" scoped>
    .user-bg{
        position: relative;
        width: 100%;
        height: 251px;
        background: url("../../../assets/images/user-bg.jpg") 0 0 no-repeat;
        background-size: cover;
        .user-public{
            width: 38%;
            position: absolute;
            bottom: 12px;
            color: #030303;
            .user-position{
                display: inline-block;
                width: 56px;
                text-align: center;
                span{
                    letter-spacing: 1px;
                    font-size: 16px;
                }
                h4{
                    letter-spacing: 2px;
                    font-size: 18px;
                }
            }
        }
        .user-fans{
            left: 0;
            text-align: right;
        }
        .user-focus{
            right: 0;
            text-align: left;
        }

    }
    .user-desc{
        position: relative;
        top: -55px;
        padding-bottom: 10px;
        border: 1px solid #e8e8e8;
        border-top: none;
        border-radius: 0 0 8px 8px;
        text-align: center;
        .user-head{
            width: 111px;
            height: 111px;
            margin: 0 auto;
            border: 8px solid #fff;
            border-radius: 50%;
            img{
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .user-name{
            display: inline-block;
            line-height: 44px;
            font-size: 24px;
        }
        .focus-btn{
            width: 118px;
            height: 38px;
            margin: 0 auto;
            line-height: 38px;
            border-radius: 10px;
            font-size: 18px;
            letter-spacing: 1px;
            cursor: pointer;
            background: linear-gradient(#3aebf6, #1268ea);
            color: #fff;
        }
    }
</style>