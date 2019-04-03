<template>
    <div class="wrap">
        <div class="user-info wrapper">
            <div class="user-desc-wrap">
                <img class="user-head" :src="$Tool.headerImgFilter(user.imageurl)">
                <div class="user-name-wrap">
                    <span class="user-name">{{user.username}}</span>
                    <span class="focus-btn" @click="handelFocus" v-if="!userId">
                        {{focusState?'已关注':'+ 关注'}}
                    </span>
                    <!-- <div class="edit">
                        编辑资料
                    </div> -->
                    <p class="user-desc">{{user.introduce}}</p>
                </div>
                
            </div>
            <div class="user-right">

                <ul class="info common">
                  <li class="li">
                    <span class="num">{{focusCount}}</span>
                    <p>关注</p>
                  </li>
                  <li class="li">
                    <span class="num">{{fansCount}}</span>
                    <p>粉丝</p>
                  </li>
                  <li class="li">
                    <span class="num">0</span>
                    <p>消息</p>
                  </li>
                </ul>
                
                <ul class="publish common">
                  <li class="li" @click="handleOpenDialog('article')">
                    <i class="iconfont icon-sketch"></i>
                    <p>发布图文</p>
                  </li>
                  <li class="li" @click="handleOpenDialog('video')">
                    <i class="iconfont icon-video"></i>
                    <p>发布视频</p>
                  </li>
                  <li class="li" @click="handleOpenDialog('question')">
                    <i class="iconfont icon-question"></i>
                    <p>发布问答</p>
                  </li>
                </ul>

            </div>

        </div>

    </div>
</template>
<script>
    import articleService from '@/services/articleService'
    import followService from '@/services/followService'
    import userService from '@/services/userService'
    import fileService from '@/services/fileService'
    import classifyService from '@/services/article_classifyService'
    export default {
        name: "userInfo",
        props: {
            userId:{
                type: [Number, String],
                required: true,
                default: 0
            },
        },
        data(){
            return{
                classifyList:[],
                fansCount:0,
                focusCount:0,
                user:{},
                dialogShow:false,
                fileRoot:window.urls.fileRoot +'/',
                focusState: false,
                record:{
                    title:"",
                    content:"",
                    author:0,
                    type:0,
                    publishtime:'',
                    classify:"",
                    selectedpublishname:'',
                    selectedpublishaddress:''
                },
                recordShow:true,
                record_file:[],
                dialogTitle:"",
                dialogDescShow:true,
                accept:"",
            }
        },
        computed:{
          isType(){
              return this.record.type == 1;
          },
          loginUserId() {
            return this.$store.state.userId
          }
        },
        watch: {
            userId() {
                this.init();
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init();
            });
        },
        methods:{
            init(){
                if (!this.userId) {
                    return
                }
                userService.getUserById(this.userId,(data)=>{
                    if(data && data.status == "success") {
                        this.user = data.result.user;
                        // console.log(this.user.introduce)
                    }
                })

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

                //获取文章分类
                if(!localStorage.classify){
                    classifyService.getArticleClassifyList((data)=>{
                        if(data && data.status == "success") {
                            this.classifyList = data.result.classifyList;
                            localStorage.classify = JSON.stringify(this.classifyList);
                        }
                    });
                }else {
                    this.classifyList = JSON.parse(localStorage.classify);
                }
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

            },
            //弹出发布弹框
            handleOpenDialog(type){
              this.$store.commit('SetRelease', type)
            },
        },
    }
</script>

<style lang="less" scoped>
    .user-info {
        position: relative;
        overflow: initial;
    }
    .user-desc-wrap{
        position: relative;
        padding:155px 0 10px;
        border: 1px solid #e8e8e8;
        border-top: none;
        border-radius: 0 0 8px 8px;
        background: #fff url("../../../assets/images/user_bg.png") 0 0 no-repeat;
        box-shadow: 0px 14px 12px 2px #e8e8e8;
        .user-head{
            width: 111px;
            height: 111px;
            margin: 0 20px 0 35px;
            border-radius: 50%;
            float: left;
            position: relative;
            top: -65px;
        }
        .user-name{
            display: inline-block;
            line-height: 44px;
            font-size: 22px;
        }
        .user-desc {
            font-size: 18px;
            color: #ddd;
        }
        .edit {
            float: right;
            margin-right: 30px;
            border-radius: 10px;
            border: 1px solid #0099ff;
            padding: 8px 20px;
            color: #0099ff;
        }
        .focus-btn{
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 16px;
            letter-spacing: 1px;
            cursor: pointer;
            background: linear-gradient(#3aebf6, #1268ea);
            color: #fff;
        }
        .fabu-box{
            text-align: center;
            .fabu-btn{
                display: inline-block;
                width: 100px;
                margin-right: 10px;
                font-size: 14px;
                background: linear-gradient(@basicColor, #f89a1e);
                .iconfont{
                    font-size:16px;
                }
            }

        }

    }
    .release-dialog{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        display: flex;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.6);
        .dialog-wrapper{
            width: 620px;
            min-height: 580px;
            position: relative;
            padding: 10px 30px 26px 30px;
            border-radius: 12px;
            background-color: #fff;
            .dialog-header{
                height: 50px;
                line-height: 50px;
                .dialog-tit{
                    position: relative;
                    padding-left: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: #f56c6c;
                    &:before{
                        position: absolute;
                        left: 0;
                        top: 16px;
                        content: "";
                        display: block;
                        width: 3px;
                        height: 18px;
                        border-radius: 20px;
                        background-color: #f56c6c;
                    }
                }
                .iconfont{
                    font-size: 18px;
                    font-weight: 700;
                    color: #666;
                    transition: all .5s;
                    &:hover{
                        opacity: .6;
                        transform: rotate(180deg);
                    }
                }
            }
            .dialog-body{
                padding-top: 10px;
                .dialog-upload{
                    padding-top: 10px;
                    padding-bottom: 40px;
                    .dialog-thumbnail{
                        position: relative;
                        margin-right: 8px;
                        margin-bottom: 8px;
                        width: 130px;
                        height: 130px;
                        border: 1px solid #c0ccda;
                        border-radius: 8px;
                        .dialog-mask{
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 9;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                            border-radius: 6px;
                            background-color: rgba(0,0,0,0.6);
                            .iconfont{
                                font-size: 20px;
                                padding: 0 10px;
                                color: #fff;
                                opacity: .6;
                                transition: all .4s;
                            }
                            &:hover .iconfont{
                                font-size: 30px;
                                opacity: 1;
                            }
                        }
                        .dialog-img{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            margin-bottom: 8px;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                                border-radius: 6px;
                                object-fit: cover;

                            }
                        }
                    }
                    .dialog-add{
                        width: 128px;
                        height: 128px;
                        border-radius: 6px;
                        border: 1px dashed #999;
                        transition: all .2s;
                        &:hover{
                            border: 1px  dashed #409eff;
                            .iconfont{
                                color: #409eff;
                            }
                        }
                        label{
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: block;
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                        .iconfont{
                            display: block;
                            width: 100%;
                            height: 100%;
                            line-height: 128px;
                            text-align: center;
                            color: #8c939d;
                            font-size: 28px;
                        }
                    }
                }
            }
            .dialog-footer{
                position: absolute;
                bottom: 26px;
                right: 30px;
            }

        }
    }

    .user-right {
        position: absolute;
        top: 265px;
        right: 10px;
        width: 410px;
        .common {
          text-align: center;
          margin-bottom: 30px;
          p{
            margin-top: 5px;
          }
        }
        .info {
          background: #fff;
          padding: 25px 0;
          .li {
            display: inline-block;
            padding: 0 35px;
            border-right: 1px solid #ddd;
            font-size: 18px;
            &:last-child {
              border: 0;
            }
            .num {
              font-size: 20px;
            }
          }
        }
        .publish {
          .li {
            display: inline-block;
            padding: 0px 25px;
          }
          .iconfont {
            font-size: 56px;
          }
        }
        .side-title {
          width: 100%;
          line-height: 32px;
          position: relative;
          font-size: 18px;
          color: #fff;
          letter-spacing: 1px;
          text-align: center;
          background: #ccc;
          border-radius: 5px 5px 0 0;
        }
        .side-content {
          padding: 15px 10px;
          border: 1px solid #ded;
          .side-item {
            margin-bottom: 28px;
            cursor: pointer;
            .side-user {
              .side-userPhoto {
                display: block;
                width: 36px;
                height: 36px;
                margin-right: 12px;
                border-radius: 50%;
              }
              .name {
                width: 200px;
                max-width: 200px;
                line-height: 36px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .side-tit {
              padding: 8px 0;
              line-height: 28px;
              font-size: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              color: #222;
              text-align: left;
              margin-bottom: 0;
            }
            .side-footer {
              font-size: 12px;
              color: #262626;
              span {
                margin-right: 16px;
              }
            }
          }
        }
      }
</style>
<style lang="less">
    .el-tabs__item{
        font-size: 16px;
        &:hover{
            color: #f56c6c;
        }
        &.is-active{
            color: #f56c6c;
        }
    }
    .el-tabs__active-bar{
        background-color: #f56c6c;
    }
    .el-form-item{
        .el-input{
            width: 60%;
        }
        .el-input--suffix{
            width: 100%;
        }
        .el-textarea__inner{
            height: 150px;
            resize: none;
        }
        .el-form-item__label{
            text-align: center;
        }
    }
    .el-upload--picture-card{
        width: 100px;
        height: 100px;
        line-height: 110px;
    }
</style>
