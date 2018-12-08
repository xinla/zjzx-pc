<template>
    <div class="wrap">
        <div class="user-list cw clearfix">
            <div class="user-left fl">
                <ul class="user-tab clearfix">
                    <li class="tab-item" :class="{'tabActive': tabIndex === index}" v-for="(item,index) in tabs" :key="item.id" @click="handleTabs(index)">{{item.title}}</li>
                </ul>
                <div class="user-article">
                    <div class="article-item">
                        <ul class="article-img-list">
                            <li class="img-item">
                                <img src="@/assets/images/login-bg.jpg" alt="">
                            </li>
                            <li class="img-item">
                                <img src="@/assets/images/login-bg.jpg" alt="">
                            </li>
                        </ul>
                        <h3 class="article-title">借条写错这个字，你一分钱都要不回来，就算告到法院也没用</h3>
                        <div class="tabs-footer">
                            <span class="time">2018-12-15 09:53</span>
                            <div class="icons">
                                <div class="foot-read">
                                    <i class="iconfont icon-read"></i>
                                    <span>2.6w</span>
                                </div>
                                <div class="foot-msg">
                                    <i class="iconfont icon-comment"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="user-video">

                </div>
            </div>
            <div class="user-right fr">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userList",
        data(){
            return{
                tabs:[
                    {id:0, title:'文章'},
                    {id:1, title:'视频'}
                ],
                tabIndex:0
            }
        },
        methods:{
            handleTabs(index){
                this.tabIndex = index;
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-left{
        width: 758px;
        height: 1000px;
        .user-tab{
            width: 100%;
            line-height: 49px;
            border-bottom: 1px solid #e8e8e8;
            .tab-item{
                float: left;
                width: 92px;
                font-size: 24px;
                cursor: pointer;
                text-align: center;
                color: #7d7d7d;
            }
            .tabActive{
                color: #f00;
                background: url("../../../assets/images/tab-line.png") 0 bottom no-repeat;
                position: relative;
                bottom: -1px;
            }
        }
    }
    .user-right{
        width: 360px;
        height: 1000px;
        background: #4cd964;
    }
</style>