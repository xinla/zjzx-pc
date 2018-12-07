<template>
    <div class="wrap">
        <div class="user-info cw">
            <div class="user-bg">
                <div class="user-fans user-public">
                    <div class="user-position">
                        <span class="fans-num">140</span>
                        <h4 class="fans-tit">粉丝</h4>
                    </div>
                </div>
                <div class="user-focus user-public">
                    <div class="user-position">
                        <span class="focu-num">140</span>
                        <h4 class="focus-tit">关注</h4>
                    </div>
                </div>
            </div>
            <div class="user-desc">
                <div class="user-head">
                    <img src="@/assets/images/login-header.png" alt="">
                </div>
                <span class="user-name">陈寒是大帅比</span>
                <div class="focus-btn">
                    + 关注
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userInfo"
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
        text-align: center;
        .user-head{
            width: 111px;
            height: 111px;
            margin: 0 auto;
            border: 8px solid #fff;
            border-radius: 50%;
            background: red;
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