<template>
    <div>

        <footer class="footer-wrapper">
            <div class="footer wrapper">
                <ul class="foot-list clearfix">
                    <li class="foot-item">皖ICP备18025845号-1</li>
                    <li class="foot-item">池州康有保网络科技有限公司2018</li>
                    <li class="foot-item">网络经营文化许可</li>
                </ul>
                <ul class="foot-list clearfix">
                    <li class="foot-item">地址：安徽省池州市贵池区君越广场15012室</li>
                    <li class="foot-item">电话：18756686768</li>
                    <li class="foot-item">邮箱：1570728529@qq.com</li>
                    <li class="foot-item">客服热线：400-1106768</li>
                    <li class="foot-item">反馈中心</li>
                    <li class="foot-item">商务合作</li>
                </ul>
                <ul class="foot-list foot-style clearfix">
                    <li class="foot-item">友情链接:</li>
                    <li class="foot-item">康有保</li>
                    <li class="foot-item">315</li>
                    <li class="foot-item">央视网</li>
                    <li class="foot-item">新华社</li>
                    <li class="foot-item">反假联盟</li>
                    <li class="foot-item">反传联盟</li>
                    <li class="foot-item">百度知道</li>
                </ul>
            </div>
            <div class="footer-linear"></div>
        </footer>

    </div>
</template>

<script>
    export default {
        name: "baseFoot"
    }
</script>

<style lang="less" scoped>
    .footer-wrapper{
        position: absolute;
        left: 0;
        width: 100%;
        height: 250px;
        padding-top: 65px;
        padding-bottom: 45px;
        background-color: #262626;
        .foot-list{
            display: flex;
            justify-content: center;
            .foot-item{
                margin-bottom: 24px;
                margin-right: 15px;
                color: #fff;
            }
        }
        .foot-style{
            padding: 10px 60px;
            background-color: #313131;
            .foot-item{
                margin-bottom: 0;
            }
        }
    }
    .footer-linear{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: url("../assets/images/foot-bg.png");
    }
</style>
