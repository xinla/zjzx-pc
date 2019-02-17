<template>
    <div class="wrap">
        <div class="answer-content cw clearfix">
            <div class="answer-left fl">
                <div class="item">
                    <div class="item-header clearfix">
                        <div class="item-info fl">
                            <h3 class="item-title">我是标题标题标我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题题</h3>
                            <div class="item-userInfo">
                                <img src="@/assets/images/wenda.png" alt="">
                                <span class="username">用户名</span>
                                <span class="time">时间</span>
                            </div>
                        </div>
                        <div class="item-count fr">
                            <span>16</span>
                            <h4>回答</h4>
                        </div>
                    </div>
                    <div class="item-body">
                        <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我
                            是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
                    </div>
                    <div class="item-footer">
                        <ul class="list clearfix">
                            <li>
                                <i class="iconfont icon-no-love"></i>
                                <span>33赞</span>
                            </li>
                            <li>
                                <i class="iconfont icon-xiaoxi"></i>
                                <span>33评论</span>
                            </li>
                            <li>
                                <i class="iconfont icon-not-collection"></i>
                                <span>33收藏</span>
                            </li>
                            <li>
                                <i class="iconfont icon-fenxiang"></i>
                                <span>分享</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="item">
                    <div class="item-header clearfix">
                        <div class="item-info fl">
                            <h3 class="item-title">我是标题标题标我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题我是标题标题标题题</h3>
                            <div class="item-userInfo">
                                <img src="@/assets/images/wenda.png" alt="">
                                <span class="username">用户名</span>
                                <span class="time">时间</span>
                            </div>
                        </div>
                        <div class="item-count fr">
                            <span>16</span>
                            <h4>回答</h4>
                        </div>
                    </div>
                    <div class="item-body">
                        <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我
                            是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
                    </div>
                    <div class="item-footer">
                        <ul class="list clearfix">
                            <li>
                                <i class="iconfont icon-no-love"></i>
                                <span>33赞</span>
                            </li>
                            <li>
                                <i class="iconfont icon-xiaoxi"></i>
                                <span>33评论</span>
                            </li>
                            <li>
                                <i class="iconfont icon-not-collection"></i>
                                <span>33收藏</span>
                            </li>
                            <li>
                                <i class="iconfont icon-fenxiang"></i>
                                <span>分享</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="answer-right fr">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "answerDesc"
    }
</script>

<style scoped lang="less">
    .wrap{
        margin-top: 20px;
        .answer-left{
            width: 760px;
            height: 500px;
            .item{
                padding: 20px 14px;
                margin-bottom: 10px;
                background-color: #fff;
                .item-header{
                    margin-bottom: 12px;
                    .item-info{
                        .item-title{
                            margin-bottom: 15px;
                            width: 625px;
                            font-size: 16px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .item-userInfo{
                            line-height: 32px;
                            img{
                                display: inline-block;
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                margin-right: 8px;
                            }
                            .username{
                                font-weight: 600;
                                margin-right: 8px;
                            }
                            .time{
                                color: #999;
                            }
                        }
                    }
                    .item-count{
                        padding: 10px 12px;
                        border-radius: 4px;
                        text-align: center;
                        background-color: #fba705;
                        color: #fff;
                    }
                }
                .item-body{
                    p{
                        font-size: 15px;
                        line-height: 24px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }
                }
                .item-footer{
                    margin-top: 20px;
                    line-height: 25px;
                    li{
                        float: left;
                        margin-right: 30px;
                        vertical-align: middle;
                        .iconfont{
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
</style>