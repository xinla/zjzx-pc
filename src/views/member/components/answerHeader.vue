<template>
    <div class="wrap">
        <div class="answer-header clearfix cw">
            <div class="answer-logo fl">
                <img src="@/assets/images/answer-logo.png" alt="在线问答">
            </div>
            <div class="answer-search fl">
                <input type="search" placeholder="搜索你感兴趣的问题">
                <span class="answer-button">搜索</span>
            </div>
            <ul class="answer-list fl clearfix">
                <li class="answer-item">问答首页</li>
                <li class="answer-item">热门回答</li>
                <li class="answer-item">精选回答</li>
                <li class="answer-item">等我来答</li>
            </ul>
            <ul class="answer-right clearfix fr">
                <li class="item">登录</li>
                <li class="item">注册</li>
                <li class="item">反馈</li>
                <li class="item">投诉</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "answerHeader"
    }
</script>

<style scoped lang="less">
    .wrap{
        height: 50px;
        line-height: 50px;
        border-top: 2px solid #3385ff;
        border-bottom: 1px solid #b4b4b4;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 3px 20px #dedede;
        .answer-logo{
            margin-right: 20px;
            vertical-align: middle;
        }
        .answer-search{
            margin-right: 16px;
            input{
                width: 346px;
                height: 24px;
                padding: 0 10px;
                margin-right: 15px;
                border-radius: 4px;
                border: 1px solid #ccc;
                background-color: #fff;
            }
            .answer-button{
                display: inline-block;
                width: 60px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                border-radius: 4px;
                cursor: pointer;
                background-color: #3385ff;
                color: #fff;
            }
        }
        .answer-list{
            .answer-item{
                float: left;
                margin-right: 12px;
            }
        }
        .answer-right{
            .item{
                float: left;
                margin-right: 12px;
            }
        }
    }
</style>