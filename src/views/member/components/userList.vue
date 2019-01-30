<template>
    <div class="wrap">
        <div class="user-list wrapper clearfix">
            <div class="user-left fl">
                <ul class="user-tab clearfix">
                    <li class="tab-item" :class="{'tabActive': tabIndex === index}" v-for="(item,index) in tabs"
                        :key="item.id" @click="handleTabs(index)">{{item.title}}
                    </li>
                </ul>
                <div class="user-wrap" >
                    <!--文章-->
                    <div class="user-article" v-show="toggleA" @scroll="loadMoreArticle(e)">
                        <div class="article-item" v-for="item in articleList" @click="goDetail(null,item.id)">
                            <ul class="article-img-list clearfix">
                                <li class="img-item fl" v-for="(itemfile,index) in item.articleFile" v-if="index < 2">
                                    <img :src="fileRoot + itemfile.url">
                                </li>
                            </ul>
                            <h3 class="article-title" :title="item.title">{{item.title}}</h3>
                            <div class="tabs-footer clearfix">
                                <span class="time fl">{{item.publishtime}}</span>
                                <div class="icons fl clearfix">
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-read"></i>
                                        <span>{{item.readCount}}</span>
                                    </div>
                                    <div class="foot-icon-item fl">
                                        <i class="iconfont icon-comment"></i>
                                        <span>{{item.articleCount}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-loading" v-show="articleBool.loading">
                            <div class="load-img">
                                <img src="@/assets/images/loading.gif">
                            </div>
                            正在加载
                        </div>
                        <div class="article-loaded" v-show="articleBool.loaded">已加载全部内容</div>
                        <div class="article-null" v-show="ifArticle">
                            <div class="article-box">
                                <i class="iconfont icon-no-msg"></i>
                                <div class="article-msg">您想看的真相消失啦...</div>
                            </div>

                        </div>
                    </div>
                    <!--视频-->
                    <div class="user-video" v-show="toggleB" @scroll="loadMoreVideo(e)">
                        <div class="video-item clearfix" v-for="item in videoList" @click="goDetail(null,item.id)">
                            <div class="video-cover fl" v-for="itemfile in item.videoFile">
                                <img :src="fileRoot + itemfile.thumbnail">
                                <div class="play-icon">
                                    <i class="iconfont icon-play"></i>
                                </div>
                            </div>
                            <div class="video-content fr">
                                <h3 class="video-title">{{item.title}}</h3>
                                <div class="video-desc">
                                    <p>
                                        <!--视频没有内容-->
                                    </p>
                                </div>
                                <div class="tabs-footer clearfix">
                                    <span class="time fl">{{item.publishtime}}</span>
                                    <div class="icons fl clearfix">
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-read"></i>
                                            <span>{{item.readCount}}</span>
                                        </div>
                                        <div class="foot-icon-item fl">
                                            <i class="iconfont icon-comment"></i>
                                            <span>{{item.articleCount}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="article-loading" v-show="videoBool.loading">
                            <div class="load-img">
                                <img src="@/assets/images/loading.gif">
                            </div>
                            正在加载
                        </div>
                        <div class="article-loaded" v-show="videoBool.loaded">已加载全部内容</div>
                        <div class="video-null" v-show="ifVideos">
                            <div class="video-box">
                                <i class="iconfont icon-no-msg"></i>
                                <div class="video-msg">您想看的真相消失啦...</div>
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
                    <div class="side-item" v-for="(item, index) in groomList" @click="goDetail(0,item.id)">
                        <div class="side-user clearfix">
                            <img :src="$Tool.headerImgFilter(item.imageurl)" class="side-userPhoto fl" alt="">
                            <span class="name fl">{{ item.username}}</span>
                        </div>
                        <h4 class="side-tit">{{item.title}}</h4>
                        <div class="side-desc">
                            <p v-html="item.content">
                            </p>
                        </div>
                        <div class="side-footer">
                            <span>评论 {{item.articleCount}}</span>
                            <span>赞 {{item.zanCount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/assets/configs/config'
    import listUtil from '@/utils/listUtil'
    import pageUtil from '@/utils/pageUtil'
    import articleService from '@/services/articleService'
    import articleFileService from '@/services/article_fileService'
    import articleCommentService from '@/services/article_commentService'
    import readHistoryService from '@/services/readHistoryService'
    import praiseService from '@/services/praiseService'
    import userService from '@/services/userService'

    export default {
        name: "userList",
        data() {
            return {
                fileRoot: config.fileRoot + '/',
                tabs: [
                    {id: 0, title: '文章'},
                    {id: 1, title: '视频'}
                ],
                tabIndex: 0,
                toggleA: true,
                toggleB: false,
                articleList: [],
                videoList: [],
                articleCount: 0,
                userId: localStorage.id,
                type: 0,
                ifArticle: false,
                ifVideos: false,
                scrollTop: 0,
                articlePage: 1,
                page: 0,
                articleTotal: 0,
                articleBool: {
                    ifLoad: false,
                    lock: false,
                    ifNew: false,
                    ifLoading: false,
                    loaded: false,
                    timer: null,
                    loading: true
                },
                videoPage: 1,
                videoTotal: 0,
                videoBool: {
                    ifLoad: false,
                    lock: false,
                    ifNew: false,
                    ifLoading: false,
                    loaded: false,
                    timer: null,
                    loading: true
                },
                groomList:[],
                groomPage:1,
                userInfo:{
                    username:'',
                    imageurl:''
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
                console.log(this.$route)
            });
        },
        methods: {
            init() {
                this.articlePage = 1;
                // 获取文章列表
                let articleData = articleService.getArticleByUser(this.userId, this.articlePage, 5, 1);

                if (articleData && articleData.status == "success") {
                    if (this.articleTotal == articleData.result.recordPage.totalRow) {
                        this.articleBool.ifNew = true;
                    } else {
                        this.articleTotal = articleData.result.recordPage.totalRow;
                        this.articleBool.ifNew = false;

                    }
                    this.articlePage++;
                    listUtil.appendList(this.articleList, articleData.result.recordPage.list);
                    listUtil.asyncSetListPropty(articleData.result.recordPage.list, (item) => {
                        if (this.articleList.length <= 0) {
                            this.ifArticle = true;
                        } else {
                            this.ifArticle = false;
                        }
                        // 获取文章列表图片
                        articleFileService.getFileByArticle(item.id, (data) => {
                            this.$set(item, 'articleFile', []);
                            item.articleFile = data.result.filelist;
                        });
                        // 获取文章发布时间
                        item.publishtime = this.$Tool.publishTimeFormat(item.publishtime);
                        //获取文章评论数量
                        articleCommentService.getArticleCommentCount(item.id, (data) => {
                            if (data && data.status == "success") {
                                this.$set(item, 'articleCount', 0);
                                item.articleCount = this.$Tool.numConvertText(data.result.count);
                            }
                        });
                        // 获取文章阅读数量
                        readHistoryService.getReadCount(item.id, (data) => {
                            if (data && data.status == "success") {
                                this.$set(item, 'readCount', 0);
                                item.readCount = this.$Tool.numConvertText(data.count);
                            }
                        });

                    });
                }
                this.videoPage = 1;
                // 获取视频列表
                let videoData = articleService.getArticleByUser(this.userId, this.videoPage, 8, 2);
                if (videoData && videoData.status == "success") {
                    if (this.videoTotal == articleData.result.recordPage.totalRow) {
                        this.videoBool.ifNew = true;
                    } else {
                        this.videoTotal = articleData.result.recordPage.totalRow;
                        this.videoBool.ifNew = false;

                    }
                    this.videoPage++;
                    listUtil.appendList(this.videoList, videoData.result.recordPage.list);
                    listUtil.asyncSetListPropty(videoData.result.recordPage.list, (item) => {
                        if (this.videoList.length <= 0) {
                            this.ifVideos = true;
                        } else {
                            this.ifVideos = false;
                        }
                        // 获取视频列表封面图片
                        articleFileService.getFileByArticle(item.id, (data) => {
                            this.$set(item, 'videoFile', '');
                            item.videoFile = data.result.filelist;
                        });
                        // 获取文章发布时间
                        item.publishtime = this.$Tool.publishTimeFormat(item.publishtime);
                        //获取文章评论数量
                        articleCommentService.getArticleCommentCount(item.id, (data) => {
                            if (data && data.status == "success") {
                                this.$set(item, 'articleCount', 0);
                                item.articleCount = this.$Tool.numConvertText(data.result.count);
                            }
                        });
                        // 获取文章阅读数量
                        readHistoryService.getReadCount(item.id, (data) => {
                            if (data && data.status == "success") {
                                this.$set(item, 'readCount', 0);
                                item.readCount = this.$Tool.numConvertText(data.count);
                            }
                        });
                    });
                }
                // 获取风闻专区推荐列表
                let groomData =  articleService.articlePage(this.groomPage,5);
                if(groomData && groomData.status == "success") {
                    listUtil.appendList(this.groomList, groomData.recordPage.list);
                    listUtil.asyncSetListPropty(groomData.recordPage.list, (item) => {
                        let userData = userService.getUserById(item.author);
                        if(userData && userData.status == "success") {
                            this.$set(item, "imageurl", userData.result.user.imageurl);
                            this.$set(item, "username", userData.result.user.username);
                        }

                        //获取文章评论数量
                        articleCommentService.getArticleCommentCount(item.id, (data) => {
                            if (data && data.status == "success") {
                                this.$set(item, 'articleCount', 0);
                                item.articleCount = this.$Tool.numConvertText(data.result.count);
                            }
                        });
                        //获取文章点赞数量
                        praiseService.getPraiseCount(item.id,1,(data)=>{
                            if(data && data.status == "success") {
                                this.$set(item, 'zanCount', 0);
                                item.zanCount = this.$Tool.numConvertText(data.result.count);
                            }
                        })
                    });
                }
            },

            goDetail(classify,id){
                // this.$router.push({name:"listDetail",params:{classify,id,}});
                this.$router.push({name:"listDetail",params:{classify,id,}});
            },

            // 文章视频选项卡切换
            handleTabs(index) {
                this.tabIndex = index;
                if (index == 0) {
                    this.toggleA = true;
                    this.toggleB = false;
                } else {
                    this.toggleA = false;
                    this.toggleB = true;
                }
            },

            // 监听文章列表滚动
            loadMoreArticle(e) {
                this.throttle(this.loadMoreArticles, this, e);
            },
            //函数节流控制
            throttle(method, context, arg) {
                let cur = +new Date();
                if (cur - (method.last || 0) > 20) {
                    method.call(context, arg);
                    method.last = cur;
                }
            },
            // 获取滚动的文章列表
            loadMoreArticles(e) {
                let h1 = $(e.target).scrollTop() + $(e.target).height() + 10;
                let h2 = $(e.target).height() + 10;
                this.scrollTop = $(e.target).scrollTop();
                clearTimeout(this.articleBool.timer);
                this.articleBool.timer = setTimeout(() => {
                    if (!this.articleBool.lock && h1 >= h2) {
                        this.getMoreArticle();
                    }
                }, 400);
            },

            getMoreArticle() {
                this.articleBool.loading = true;
                this.articleBool.lock = true;
                try {
                    let articleData = articleService.getArticleByUser(this.userId, this.articlePage, 5, 1);
                    if (articleData && articleData.status == "success") {
                        listUtil.appendList(this.articleList, articleData.result.recordPage.list);
                        listUtil.asyncSetListPropty(articleData.result.recordPage.list, (item) => {
                            articleFileService.getFileByArticle(item.id, (data) => {
                                this.$set(item, 'articleFile', []);
                                item.articleFile = data.result.filelist;
                            });
                        });
                        if (articleData.result.recordPage.list.length) {
                            this.articlePage++;
                        } else {
                            this.articleBool.loading = false;
                            this.articleBool.ifLoading = false;
                            this.articleBool.loaded = true;
                        }
                    }
                } finally {
                    this.articleBool.lock = false;
                }
            },

            // 监听视频列表滚动
            loadMoreVideo(e) {
                this.throttle(this.loadMoreVideos, this, e);
            },
            // 获取滚动的视频列表
            loadMoreVideos(e){
                let h1 = $(e.target).scrollTop() + $(e.target).height() + 10;
                let h2 = $(e.target).height() + 10;
                this.scrollTop = $(e.target).scrollTop();
                clearTimeout(this.videoBool.timer);
                this.videoBool.timer = setTimeout(() => {
                    if (!this.videoBool.lock && h1 >= h2) {
                        this.getMoreVideo();
                    }
                }, 400);
            },
            getMoreVideo() {
                this.videoBool.loading = true;
                this.videoBool.lock = true;
                try {
                    let videoData = articleService.getArticleByUser(this.userId, this.videoPage, 8, 2);
                    if (videoData && videoData.status == "success") {
                        listUtil.appendList(this.videoList, videoData.result.recordPage.list);
                        listUtil.asyncSetListPropty(videoData.result.recordPage.list, (item) => {
                            articleFileService.getFileByArticle(item.id, (data) => {
                                this.$set(item, 'videoFile', []);
                                item.videoFile = data.result.filelist;
                            });
                        });
                        if (videoData.result.recordPage.list.length) {
                            this.videoPage++;
                        } else {
                            this.videoBool.loading = false;
                            this.videoBool.ifLoading = false;
                            this.videoBool.loaded = true;
                        }
                    }
                } finally {
                    this.videoBool.lock = false;
                }
            },
        },
        created() {
            window.addEventListener('scroll', this.loadMoreArticle, true);
            window.addEventListener('scroll', this.loadMoreVideo, true);
        },
    }
</script>

<style lang="less" scoped>
    .wrap{
        margin-bottom: 60px;

        .user-left {
            width: 758px;
            .user-tab {
                width: 100%;
                line-height: 49px;
                border-bottom: 1px solid #e8e8e8;
                .tab-item {
                    float: left;
                    width: 92px;
                    font-size: 24px;
                    cursor: pointer;
                    text-align: center;
                    color: #7d7d7d;
                }
                .tabActive {
                    color: @basicColor;
                    background: url("../../../assets/images/tab-line.png") 0 bottom no-repeat;
                    position: relative;
                }
            }
            .user-wrap {
                margin-top: 25px;
                .user-article {
                    .article-item {
                        margin-bottom: 23px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #e8e8e8;
                        .img-item {
                            width: 359px;
                            height: 194px;
                            margin-right: 38px;
                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                            &:last-child {
                                margin-right: 0;
                            }
                        }
                        .article-title {
                            line-height: 48px;
                            font-size: 18px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                        }
                    }
                }
                .article-loading {
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
                .article-loaded {
                    width: 100%;
                    font-size: 15px;
                    padding: 15px 0;
                    line-height: 30px;
                    text-align: center;
                    color: #222;
                }
                .article-null {
                    width: 100%;
                    position: relative;
                    height: 300px;
                    color: #999;
                    .article-box {
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
                        .article-msg {
                            line-height: 40px;
                            text-align: center;
                            font-size: 15px;
                            letter-spacing: 1px;
                        }
                    }

                }
                .user-video {
                    .video-item {
                        margin-bottom: 25px;
                        padding-bottom: 25px;
                        border-bottom: 1px solid #e8e8e8;
                        .video-cover {
                            width: 360px;
                            height: 194px;
                            position: relative;
                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                            .play-icon {
                                width: 48px;
                                height: 48px;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                margin-left: -24px;
                                margin-top: -24px;
                                border-radius: 50%;
                                text-align: center;
                                background-color: rgba(255, 255, 255, 0.5);
                                .iconfont {
                                    line-height: 48px;
                                    font-size: 26px;
                                    color: #fff;
                                }
                            }
                        }
                        .video-content {
                            position: relative;
                            width: 388px;
                            height: 194px;
                            min-height: 194px;
                            overflow: hidden;
                            .video-title {
                                line-height: 30px;
                                font-size: 24px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                            }
                            .video-desc {
                                margin-top: 6px;
                                /*font-size: 14px;*/
                                line-height: 24px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 4;
                            }
                            .tabs-footer {
                                position: absolute;
                                bottom: 0;
                                line-height: 30px;
                            }
                        }
                    }
                    .video-null {
                        width: 100%;
                        position: relative;
                        height: 300px;
                        color: #999;
                        .video-box {
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
                            .video-msg {
                                line-height: 40px;
                                text-align: center;
                                font-size: 15px;
                                letter-spacing: 1px;
                            }
                        }

                    }

                }
                /*公共的标题footer*/
                .tabs-footer {
                    line-height: 40px;
                    color: #505050;
                    .time {
                        font-size: 12px;
                        margin-right: 34px;
                    }
                    .icons {
                        .foot-icon-item {
                            margin-right: 20px;
                            .iconfont {
                                margin-right: 3px;
                                font-size: 18px;
                            }
                            span {
                                font-size: 10px;
                                vertical-align: top;
                            }
                        }
                    }
                }
            }
        }

        .user-right {
            width: 360px;
            margin-top: 50px;
            .side-title {
                width: 100%;
                line-height: 32px;
                position: relative;
                font-size: 18px;
                color: #fff;
                letter-spacing: 1px;
                text-align: center;
                background: linear-gradient(@basicColor, #f89a1e);
                .iconfont {
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
            .side-content {
                padding: 30px 10px;
                border: 1px solid @basicColor;
                border-top: none;
                .side-item {
                    margin-bottom: 28px;
                    cursor: pointer;
                    .side-user {
                        .side-userPhoto {
                            display: block;
                            width: 36px;
                            height: 36px;
                            margin-right: 12px;
                            border-radius: 50%;
                        }
                        .name {
                            width: 200px;
                            max-width: 200px;
                            line-height: 36px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    .side-tit {
                        padding: 8px 0;
                        line-height: 28px;
                        font-size: 18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        color: #222;
                        text-align: left;
                        margin-bottom: 0;
                    }
                    .side-desc {
                        margin-bottom: 15px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                    }
                    .side-footer {
                        font-size: 12px;
                        color: #262626;
                        span {
                            margin-right: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
