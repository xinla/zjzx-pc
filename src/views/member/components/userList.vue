<template>
    <div class="wrap">
        <div class="user-list cw clearfix">
            <div class="user-left fl">
                <ul class="user-tab">
                    <li class="tab-item">文章</li>
                    <li class="tab-item">视频</li>
                </ul>
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
                activeName: 'second'
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-left{
        width: 758px;
        height: 1000px;
        background: #d60139;
    }
    .user-right{
        width: 360px;
        height: 1000px;
        background: #4cd964;
    }
</style>