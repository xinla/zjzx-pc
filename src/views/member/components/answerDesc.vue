<template>
    <div class="wrap">
        <div class="answer-content cw clearfix">
            <div class="answer-left fl">
                <div @scroll="loadMoreQuestion(e)">
                    <div class="item" v-for="(item, index) in wendaList">
                        <div class="item-header clearfix">
                            <div class="item-info fl">
                                <div class="item-userInfo">
                                    <img :src="$Tool.headerImgFilter(item.imageurl)" alt="">
                                    <span class="username">{{item.username}}</span>
                                    <span class="time">{{item.createtime}}</span>
                                </div>
                                <h3 class="item-title">{{item.title}}</h3>
                            </div>
                            <div class="item-count fr">
                                <span>{{item.wendaCount}}</span>
                                <h4>回答</h4>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>{{item.description}}</p>
                            <ul class="item-img clearfix">
                                <li class="img-item fl" v-for="(itemImg, index) in item.imgList" v-if="index < 3" v-show="item.show">
                                    <img :src="fileRoot + itemImg">
                                </li>
                            </ul>
                        </div>
                        <div class="item-footer">
                            <ul class="list clearfix">
                                <li>
                                    <i class="iconfont icon-huida"></i>
                                    <span>{{item.wendaCount}} 回答</span>
                                </li>
                                <li>
                                    <i class="iconfont icon-no-love"></i>
                                    <span>{{item.zanCount}} 赞</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="wenda-loading" v-show="wendaBool.loading">
                        <div class="load-img">
                            <img src="@/assets/images/loading.gif">
                        </div>
                        正在加载
                    </div>
                    <div class="wenda-loaded" v-show="wendaBool.loaded">已加载全部</div>
                    <div class="wenda-null" v-show="ifWenda">
                        <div class="wenda-box">
                            <i class="iconfont icon-no-msg"></i>
                            <div class="wenda-msg">您看的真相消失啦...</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="answer-right fr">
                <div class="question">
                    <span>今天，你遇到了什么问题呢？</span>
                    <div class="question-btn" @click="handleShowDialog">我要提问</div>
                </div>
                <div class="answer-side">
                    <div class="answer-side-title">
                        最新问答
                    </div>
                    <ul class="answer-side-list">
                        <li class="answer-side-item">
                            <div class="userInfo">
                                <img src="@/assets/images/tougao.png" alt="">
                                <span>用户名</span>
                            </div>
                            <h2 class="title">我是标题标题标题标题</h2>
                            <p class="content">我是内容内容尼尔是经我是内容内容尼尔是经费落实到吉林省是经费落实到我是内容内容尼尔是经费落实到吉林省是经费落实到我是内容内容尼尔是经费落实到吉林省是经费落实到我是内容内容尼尔是经费落实到吉林省是经费落实到我是内容内容尼尔是经费落实到吉林省是经费落实到我是内容内容尼尔是经费落实到吉林省是经费落实到费落实到吉林省是经费落实到</p>
                            <div class="tip">
                                <span>评论 19</span>
                                <span>赞 19</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <question-dialog :show="showDialog" @cancel="handleCancelDialog"></question-dialog>
    </div>
</template>

<script>
    import config from '@/assets/configs/config'
    import listUtil from '@/utils/listUtil'
    import interService from '@/services/interlocutionService'
    import praiseService from '@/services/praiseService'
    import userService from '@/services/userService'
    import questionDialog from "@/components/questionDialog"
    export default {
        name: "answerDesc",
        components: {questionDialog},
        data(){
            return {
                showDialog:true,
                fileRoot: config.fileRoot + '/',
                userId: localStorage.id,
                wendaList:[],
                imgList:[],
                ifWenda:false,
                scrollTop: 0,
                page: 1,
                tip:'正在加载',
                ifImgNull:false,
                wendaTotal: 0,
                wendaCount: 0,
                wendaBool: {
                    ifLoad: false,
                    lock: false,
                    ifNew: false,
                    ifLoading: false,
                    loaded: false,
                    timer: null,
                    loading: true
                },

            }
        },
        computed:{
        },
        mounted(){
            this.$nextTick(()=>{
                this.init();
            });
        },
        methods:{
            // 初始渲染
            init(){
                this.page = 1;
                let wendaData = interService.getQuestionPage(this.page, 10);
                if(wendaData && wendaData.status == "success") {
                    if(this.wendaTotal == wendaData.recordPage.totalRow){
                        this.wendaBool.ifNew = true;
                    }else{
                        this.wendaTotal == wendaData.recordPage.totalRow;
                        this.wendaBool.ifNew = false;
                    }
                    this.page++;
                    listUtil.appendList(this.wendaList, wendaData.recordPage.list);
                    listUtil.asyncSetListPropty(wendaData.recordPage.list, (item)=>{
                        if(this.wendaList.length <= 0) {
                            this.ifWenda = true;
                        }else{
                            this.ifWenda = false;
                        }
                        // 获取头像用户名
                        let userData = userService.getUserById(item.userid);
                        if(userData && userData.status == "success") {
                            this.$set(item, "imageurl", userData.result.user.imageurl);
                            this.$set(item, "username", userData.result.user.username);
                        }
                        //获取问题的答案数量
                        interService.getAnswerCount(item.id, (data)=>{
                            if(data && data.status == "success") {
                                this.$set(item,'wendaCount', this.$Tool.numConvertText(data.count));
                            }
                        });
                        //获取问题发布时间
                        item.createtime = this.$Tool.publishTimeFormat(item.createtime);
                        //获取问题的图片并判断有无图片
                        this.$set(item,'imgList',item.images.split(','));
                        this.$set(item,'imgshow',false);
                        for(let i = 0; i<item.imgList.length; i++){
                            let str = item.imgList[i].indexOf('pic');
                            if(str == -1){
                                item.show = false;
                            }else {
                                item.show = true;
                            }
                        }

                        // 获取问题的点赞数
                        praiseService.getPraiseCount(item.id,1,(data)=>{
                            if(data && data.status == "success") {
                                this.$set(item, 'zanCount', 0);
                                item.zanCount = this.$Tool.numConvertText(data.result.count);
                            }
                        })

                    })
                }
            },
            handleShowDialog(){
              this.showDialog = true;
            },
            handleCancelDialog(){
              this.showDialog = false;
            },
            // 监听问题列表滚动
            loadMoreQuestion(e){
                this.throttle(this.loadMoreQuestions, this, e);
            },
            // 函数节流控制
            throttle(method, context, arg) {
                let cur = +new Date();
                if (cur - (method.last || 0) > 20) {
                    method.call(context, arg);
                    method.last = cur;
                }
            },
            // 获取滚动的文章列表
            loadMoreQuestions(e) {
                let h1 = $(e.target).scrollTop() + $(e.target).height() + 10;
                let h2 = $(e.target).height() + 10;
                this.scrollTop = $(e.target).scrollTop();
                clearTimeout(this.wendaBool.timer);
                this.wendaBool.timer = setTimeout(() => {
                    if (!this.wendaBool.lock && h1 >= h2) {
                        this.getMoreQuestion();
                    }
                }, 400);
            },
            getMoreQuestion(){
                this.wendaBool.loading = true;
                this.wendaBool.lock = true;
                try {
                    let wendaData = interService.getQuestionPage(this.page, 10);
                    if(wendaData && wendaData.status == "success") {
                        listUtil.appendList(this.wendaList, wendaData.recordPage.list);
                        listUtil.asyncSetListPropty(wendaData.recordPage.list, (item)=>{
                            if(this.wendaList.length <= 0) {
                                this.ifWenda = true;
                            }else{
                                this.ifWenda = false;
                            }
                            // 获取头像用户名
                            let userData = userService.getUserById(item.userid);
                            if(userData && userData.status == "success") {
                                this.$set(item, "imageurl", userData.result.user.imageurl);
                                this.$set(item, "username", userData.result.user.username);
                            }
                            //获取问题的答案数量
                            interService.getAnswerCount(item.id, (data)=>{
                                if(data && data.status == "success") {
                                    this.$set(item,'wendaCount', this.$Tool.numConvertText(data.count));
                                }
                            });
                            //获取问题发布时间
                            item.createtime = this.$Tool.publishTimeFormat(item.createtime);
                            //获取问题的图片并判断有无图片
                            this.$set(item,'imgList',item.images.split(','));
                            this.$set(item,'imgshow',false);
                            for(let i = 0; i<item.imgList.length; i++){
                                let str = item.imgList[i].indexOf('pic');
                                if(str == -1){
                                    item.show = false;
                                }else {
                                    item.show = true;
                                }
                            }

                            // 获取问题的点赞数
                            praiseService.getPraiseCount(item.id,1,(data)=>{
                                if(data && data.status == "success") {
                                    this.$set(item, 'zanCount', 0);
                                    item.zanCount = this.$Tool.numConvertText(data.result.count);
                                }
                            })
                        });
                        if(wendaData.recordPage.list.length){
                            this.page++;
                        }else{
                            this.wendaBool.loading = false;
                            this.wendaBool.ifLoading = false;
                            this.wendaBool.loaded = true;
                        }
                    }
                }finally {
                    this.wendaBool.lock = false;
                }
            }
        },

        created() {
            window.addEventListener('scroll', this.loadMoreQuestion, true);
        },
    }
</script>

<style scoped lang="less">
    .wrap{
        margin-top: 20px;
        .answer-left{
            width: 760px;
            .item{
                padding: 20px 14px;
                margin-bottom: 10px;
                background-color: #fff;
                .item-header{
                    margin-bottom: 12px;
                    .item-info{
                        .item-title{
                            width: 625px;
                            font-size: 16px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .item-userInfo{
                            margin-bottom: 10px;
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
                        margin-bottom: 8px;
                        font-size: 15px;
                        line-height: 24px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }
                    .item-img{
                        .img-item{
                            width: 240px;
                            height: 160px;
                            margin-right: 6px;
                            margin-bottom: 6px;
                            &:nth-child(3n){
                                margin-right: 0;
                            }
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }

                        }
                    }
                }
                .item-footer{
                    margin-top: 20px;
                    line-height: 25px;
                    li{
                        float: left;
                        margin-right: 15px;
                        vertical-align: middle;
                        .iconfont{
                            margin-right: 4px;
                            color: #666;
                            vertical-align: middle;
                        }
                    }
                }
            }
            .wenda-loading{
                width: 100%;
                display: flex;
                justify-content: center;
                text-align: center;
                padding: 15px 0;
                line-height: 30px;
                color: #222;
                .load-img {
                    width: 28px;
                    height: 28px;
                    margin-right: 5px;
                    img {
                        display: block;
                    }
                }
            }
            .wenda-loaded {
                width: 100%;
                font-size: 15px;
                padding: 15px 0;
                line-height: 30px;
                text-align: center;
                color: #222;
            }
            .wenda-null {
                width: 100%;
                position: relative;
                height: 300px;
                color: #999;
                .wenda-box {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -150px;
                    margin-top: -50px;
                    width: 300px;
                    height: 100px;
                    text-align: center;
                    .iconfont {
                        font-size: 65px;
                    }
                    .wenda-msg {
                        line-height: 40px;
                        text-align: center;
                        font-size: 15px;
                        letter-spacing: 1px;
                    }
                }

            }
        }
        .answer-right{
            width: 360px;
            height: 500px;
            .question{
                padding: 20px 72px;
                margin-bottom: 22px;
                text-align: center;
                background-color: #fff;
                span{
                    color: #aaa;
                }
                .question-btn{
                    width: 100%;
                    line-height: 32px;
                    margin-top: 10px;
                    border-radius: 4px;
                    letter-spacing: 1px;
                    background-color: #3385ff;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .answer-side{
                padding: 0 12px;
                background-color: #fff;
                .answer-side-title{
                    line-height: 35px;
                    border-bottom: 2px solid #3385ff;
                    letter-spacing: 1px;
                    font-weight: 600;
                    color: #3385ff;
                }
                .answer-side-list{
                    .answer-side-item{
                        padding: 10px 0;
                        .userInfo{
                            line-height: 36px;
                            img{
                                width: 36px;
                                height: 36px;
                                margin-right: 10px;
                                border-radius: 50%;
                            }
                        }
                        .title{
                            margin: 10px 0;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            line-height: 24px;
                            font-size: 16px;
                        }
                        .content{
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                        }
                        .tip{
                            padding: 15px 0;
                            span{
                                margin-right: 16px;
                                color: #999;
                            }
                        }
                    }
                }
            }
        }
    }
</style>