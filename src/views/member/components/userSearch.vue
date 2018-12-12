<template>
    <div class="wrap">
        <div class="search cw clearfix">
            <div class="logo fl">
                <img src="@/assets/images/user-logo.jpg" alt="">
            </div>
            <div class="search-input fr">
                <input type="search" v-model.trim="keyword" placeholder="双十一打折的背后">
                <div class="search-icon">
                    <i class="iconfont icon-search" @click="search"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "userSearch",
        data(){
            return{
                keyword:'',
            }
        },
        methods:{
            search(){
                this.keyword && this.$Tool.goPage({name:'search',query:{keyword:this.keyword}})
            }
        }
    }
</script>

<style lang="less" scoped>
    .search {
        height: 50px;
        line-height: 50px;
        .search-input{
            position: relative;
            width: 199px;
            height: 23px;
            margin-top: 13px;
            border: 1px solid #7d7d7d;
            border-radius: 16px;
            input{
                position: absolute;
                top: 0;
                left: 0;
                width: 172px;
                height: 100%;
                line-height: 23px\9;
                padding: 0 10px;
                border-radius: 16px 0 0 16px;
            }
            .search-icon{
                position: absolute;
                top: 0;
                right: 0;
                width: 27px;
                height: 100%;
                border-radius: 0 16px 16px 0;
                .iconfont{
                    position: relative;
                    top: -14px;
                    left: 0;
                    font-size: 20px;
                }
            }
        }
    }
</style>