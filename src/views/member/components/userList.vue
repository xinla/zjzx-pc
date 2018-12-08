<template>
    <div class="wrap">
        <div class="user-list cw clearfix">
            <div class="user-left fl">
                <ul class="user-tab clearfix">
                    <li class="tab-item" :class="{'tabActive': tabIndex === index}" v-for="(item,index) in tabs" :key="item.id" @click="handleTabs(index)">{{item.title}}</li>
                </ul>
                <div class="user-wrap">
                    <!--文章-->
                    <div class="user-article" v-show="toggleA">
                        <div class="article-item">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                            </ul>
                            <h3 class="article-title" title="">借条写错这个字，你一分钱都要不回来，就算你一分钱都要不回来告到法院也没用</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">2018-12-15 09:53</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>2.6w</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>1.2w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-item">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                            </ul>
                            <h3 class="article-title" title="">借条写错这个字，你一分钱都要不回来，就算你一分钱都要不回来告到法院也没用</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">2018-12-15 09:53</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>2.6w</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>1.2w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-item">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                            </ul>
                            <h3 class="article-title" title="">借条写错这个字，你一分钱都要不回来，就算你一分钱都要不回来告到法院也没用</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">2018-12-15 09:53</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>2.6w</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>1.2w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-item">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                            </ul>
                            <h3 class="article-title" title="">借条写错这个字，你一分钱都要不回来，就算你一分钱都要不回来告到法院也没用</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">2018-12-15 09:53</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>2.6w</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>1.2w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-item">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                                <li class="img-item fl">
                                    <img src="@/assets/images/login-bg.jpg" alt="">
                                </li>
                            </ul>
                            <h3 class="article-title" title="">借条写错这个字，你一分钱都要不回来，就算你一分钱都要不回来告到法院也没用</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">2018-12-15 09:53</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>2.6w</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>1.2w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--视频-->
                    <div class="user-video" v-show="toggleB">
                        <div class="video-item clearfix">
                            <div class="video-cover fl">
                                <img src="@/assets/images/login-bg.jpg">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">盒马鲜生又曝销售过期产品 两听椰浆 过期两个多月</h3>
                                <div class="video-desc">
                                    <p>
                                        “上海金桥盒马鲜生竟然买到过期两个月的食品！”近日，有网
                                        友在微博上爆料，称12月1日在盒马鲜生上海金桥店购买了两听
                                        丽尔泰椰浆，到家后竟然发现该商品已经过期两个多月。
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">2018-12-15 09:53</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>2.6w</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>1.2w</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="video-item clearfix">
                            <div class="video-cover fl">
                                <img src="@/assets/images/login-bg.jpg">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">盒马鲜生又曝销售过期产品 两听椰浆 过期两个多月</h3>
                                <div class="video-desc">
                                    <p>
                                        “上海金桥盒马鲜生竟然买到过期两个月的食品！”近日，有网
                                        友在微博上爆料，称12月1日在盒马鲜生上海金桥店购买了两听
                                        丽尔泰椰浆，到家后竟然发现该商品已经过期两个多月。
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">2018-12-15 09:53</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>2.6w</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>1.2w</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="video-item clearfix">
                            <div class="video-cover fl">
                                <img src="@/assets/images/login-bg.jpg">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">盒马鲜生又曝销售过期产品 两听椰浆 过期两个多月</h3>
                                <div class="video-desc">
                                    <p>
                                        “上海金桥盒马鲜生竟然买到过期两个月的食品！”近日，有网
                                        友在微博上爆料，称12月1日在盒马鲜生上海金桥店购买了两听
                                        丽尔泰椰浆，到家后竟然发现该商品已经过期两个多月。
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">2018-12-15 09:53</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>2.6w</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>1.2w</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="video-item clearfix">
                            <div class="video-cover fl">
                                <img src="@/assets/images/login-bg.jpg">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">盒马鲜生又曝销售过期产品 两听椰浆 过期两个多月</h3>
                                <div class="video-desc">
                                    <p>
                                        “上海金桥盒马鲜生竟然买到过期两个月的食品！”近日，有网
                                        友在微博上爆料，称12月1日在盒马鲜生上海金桥店购买了两听
                                        丽尔泰椰浆，到家后竟然发现该商品已经过期两个多月。
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">2018-12-15 09:53</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>2.6w</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>1.2w</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="video-item clearfix">
                            <div class="video-cover fl">
                                <img src="@/assets/images/login-bg.jpg">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">盒马鲜生又曝销售过期产品 两听椰浆 过期两个多月</h3>
                                <div class="video-desc">
                                    <p>
                                        “上海金桥盒马鲜生竟然买到过期两个月的食品！”近日，有网
                                        友在微博上爆料，称12月1日在盒马鲜生上海金桥店购买了两听
                                        丽尔泰椰浆，到家后竟然发现该商品已经过期两个多月。
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">2018-12-15 09:53</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>2.6w</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>1.2w</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="user-right fr">
                <div class="side-title">
                    <span class="title">风闻专区</span>
                    <i class="iconfont icon-arrow-down"></i>

                </div>
                <div class="side-content">
                    <div class="side-item">
                        <div class="side-user clearfix">
                            <img src="@/assets/images/user_head.jpg" class="side-userPhoto fl" alt="">
                            <span class="name fl">用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名</span>
                        </div>
                        <h4 class="side-tit">D&G辱华，意大利小姐姐都看不</h4>
                        <div class="side-desc">
                            <p>
                                为了撇清和D&G的关系，她拿出买过的品牌围巾直接上
                                剪刀，而弹幕就流口水江东父老都是交了水电费是的而弹幕就流口水江东父老都是交了水电费是的而弹幕就流
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 100</span>
                            <span>赞 100</span>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-user clearfix">
                            <img src="@/assets/images/user_head.jpg" class="side-userPhoto fl" alt="">
                            <span class="name fl">用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名</span>
                        </div>
                        <h4 class="side-tit">D&G辱华，意大利小姐姐都看不</h4>
                        <div class="side-desc">
                            <p>
                                为了撇清和D&G的关系，她拿出买过的品牌围巾直接上
                                剪刀，而弹幕就流口水江东父老都是交了水电费是的而弹幕就流口水江东父老都是交了水电费是的而弹幕就流
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 100</span>
                            <span>赞 100</span>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-user clearfix">
                            <img src="@/assets/images/user_head.jpg" class="side-userPhoto fl" alt="">
                            <span class="name fl">用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名</span>
                        </div>
                        <h4 class="side-tit">D&G辱华，意大利小姐姐都看不</h4>
                        <div class="side-desc">
                            <p>
                                为了撇清和D&G的关系，她拿出买过的品牌围巾直接上
                                剪刀，而弹幕就流口水江东父老都是交了水电费是的而弹幕就流口水江东父老都是交了水电费是的而弹幕就流
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 100</span>
                            <span>赞 100</span>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-user clearfix">
                            <img src="@/assets/images/user_head.jpg" class="side-userPhoto fl" alt="">
                            <span class="name fl">用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名</span>
                        </div>
                        <h4 class="side-tit">D&G辱华，意大利小姐姐都看不</h4>
                        <div class="side-desc">
                            <p>
                                为了撇清和D&G的关系，她拿出买过的品牌围巾直接上
                                剪刀，而弹幕就流口水江东父老都是交了水电费是的而弹幕就流口水江东父老都是交了水电费是的而弹幕就流
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 100</span>
                            <span>赞 100</span>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-user clearfix">
                            <img src="@/assets/images/user_head.jpg" class="side-userPhoto fl" alt="">
                            <span class="name fl">用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名</span>
                        </div>
                        <h4 class="side-tit">D&G辱华，意大利小姐姐都看不</h4>
                        <div class="side-desc">
                            <p>
                                为了撇清和D&G的关系，她拿出买过的品牌围巾直接上
                                剪刀，而弹幕就流口水江东父老都是交了水电费是的而弹幕就流口水江东父老都是交了水电费是的而弹幕就流
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 100</span>
                            <span>赞 100</span>
                        </div>
                    </div>
                </div>
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
                tabIndex:0,
                toggleA: true,
                toggleB: false
            }
        },
        methods:{
            handleTabs(index){
                this.tabIndex = index;
                if(index == 0){
                    this.toggleA = true;
                    this.toggleB = false;
                }else{
                    this.toggleA = false;
                    this.toggleB = true;
                }
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
        .user-wrap{
            margin-top: 25px;
            .user-article{
                .article-item{
                    margin-bottom: 23px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e8e8e8;
                    .img-item{
                        width: 359px;
                        height: 194px;
                        margin-right: 38px;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                    .article-title{
                        line-height: 48px;
                        font-size: 24px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:1;
                    }
                }
            }
            .user-video{
                .video-item{
                    margin-bottom: 25px;
                    padding-bottom: 25px;
                    border-bottom: 1px solid #e8e8e8;
                    .video-cover{
                        width: 360px;
                        height: 194px;
                        position: relative;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        .play-icon{
                            width: 48px;
                            height: 48px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-left: -24px;
                            margin-top: -24px;
                            border-radius: 50%;
                            text-align: center;
                            background-color: rgba(255,255,255,0.5);
                            .iconfont{
                                line-height: 48px;
                                font-size: 26px;
                                color: #fff;
                            }
                        }
                    }
                    .video-content{
                        position: relative;
                        width: 388px;
                        height: 194px;
                        min-height: 194px;
                        overflow: hidden;
                        .video-title {
                            line-height: 30px;
                            font-size: 24px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:2;
                        }
                        .video-desc{
                            margin-top: 6px;
                            /*font-size: 14px;*/
                            line-height: 24px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:4;
                        }
                        .tabs-footer{
                            position: absolute;
                            bottom: 0;
                            line-height: 30px;
                        }
                    }
                }
            }
            /*公共的标题footer*/
            .tabs-footer{
                line-height: 40px;
                color: #505050;
                .time{
                    font-size: 12px;
                    margin-right: 34px;
                }
                .icons{
                    .foot-icon-item{
                        margin-right: 20px;
                        .iconfont{
                            margin-right: 3px;
                            font-size: 18px;
                        }
                        span{
                            font-size: 10px;
                            vertical-align: top;
                        }
                    }
                }
            }
        }
    }
    .user-right{
        width: 360px;
        height: 1000px;
        margin-top: 50px;
        .side-title{
            width: 100%;
            line-height: 32px;
            position: relative;
            font-size: 18px;
            color: #fff;
            letter-spacing: 1px;
            text-align: center;
            background: url("../../../assets/images/title-bg.png") 0 0 repeat-x;
            .iconfont{
                width: 17px;
                display: block;
                position: absolute;
                left: 50%;
                margin-left: -7px;
                bottom: -15px;
                font-size: 13px;
                cursor: default;
            }
        }
        .side-content{
            padding: 30px 10px;
            border: 1px solid #f00;
            border-top: none;
            .side-item{
                margin-bottom: 28px;
                .side-user{
                    .side-userPhoto{
                        display: block;
                        width: 36px;
                        height: 36px;
                        margin-right: 12px;
                        border-radius: 50%;
                    }
                    .name{
                        width: 200px;
                        max-width: 200px;
                        line-height: 36px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .side-tit{
                    padding: 8px 0;
                    line-height: 28px;
                    font-size: 18px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
                .side-desc{
                    margin-bottom: 15px;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:4;
                }
                .side-footer{
                    font-size: 12px;
                    color: #262626;
                    span{
                        margin-right: 16px;
                    }
                }
            }
        }
    }
</style>