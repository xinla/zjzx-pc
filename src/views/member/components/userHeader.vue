<template>
    <div class="wrap">
        <div class="header cw clearfix">
            <ul class="header-left fl clearfix">
                <li class="item">推荐</li>
                <li class="item" v-for="(item,index) in classifyList" :key="item.classifycode">
                    {{item.classifyname}}
                </li>
            </ul>
            <ul class="header-right fr clearfix">
                <router-link :to="{path:'login'}" class="item" tag="li">登录</router-link>
                <router-link :to="{path:'login'}" class="item" tag="li">注册</router-link>
                <li class="item">反馈</li>
                <li class="item">投诉</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import articleClassifyService from '@/services/article_classifyService'
    export default {
        name: "userHeader",
        data(){
            return{
                classifyList:[],
                classifyIndex:0,
            }
        },
        mounted(){
            this.$nextTick(()=>{
               if(!localStorage.classify){
                   articleClassifyService.getArticleClassifyList((data) =>{
                       this.classifyList = Object.freeze(data.result.classfyList);;
                       localStorage.classify = JSON.stringify(this.classifyList);
                   });
               }else{
                   this.classifyList = Object.freeze(JSON.parse(localStorage.classify));
               }
            });
        }
    }
</script>

<style lang="less" scoped>
    .wrap{
        background-color: #262626;
        box-shadow:0 2px 19px #9b9b9b;
        .header{
            height: 50px;
            line-height: 50px;
            .item{
                float: left;
                color: #fff;
                cursor: pointer;
            }
            .header-left{
                .item{
                    margin-right: 30px;
                    font-size: 16px;
                }
            }
            .header-right{
                .item{
                    font-size: 12px;
                    margin-right: 16px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>