<template>
    <div class="back-top" @click="handleBackTop" v-show="backTopShow">
        <i class="iconfont icon-go-top"></i>
        <span>返回顶部</span>
    </div>
</template>

<script>
    export default {
        name: "backTop",
        data(){
            return{
                backTopShow:false,
                timer: null
            }
        },
        mounted(){
            window.addEventListener('scroll', this.loadScroll);
        },
        methods:{
            handleBackTop() {
                this.timer = setInterval(() => {
                    if(document.body.scrollTop||document.documentElement.scrollTop){
                        document.body.scrollTop-=100;
                        document.documentElement.scrollTop-=100;
                    }else {
                        clearInterval(this.timer);
                    }
                },10);
            },
            loadScroll(){
                if(document.documentElement.scrollTop + document.body.scrollTop > 300){
                    this.backTopShow=true;
                } else {
                    this.backTopShow=false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .back-top{
        width: 56px;
        height: 56px;
        position: fixed;
        right: 94px;
        bottom: 215px;
        text-align: center;
        background-color: #b3b2b2;
        color: #fff;
        cursor: pointer;
        .iconfont{
            font-size: 40px;
        }
        span{
            display: block;
            position: relative;
            bottom: 5px;
            font-size: 12px;
        }
    }
</style>