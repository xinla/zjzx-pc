<template>
    <div>
        <div class="module clearfix">
            <div class="wrap-left fl">
                <!-- banner -->
                <div class="banner-top">
                    <div class="banner fl">
                        <carousel height="341px">
                            <carousel-item v-for="(item,index) in slideList" :key="index" v-if="item.image" @click.native="goDetail(item.classify,item.id)">
                                <img class="slide-img" :src="item.image">
                                <div class="slide-desc">
                                    <h3 class="slide-title oe">{{item.title}}</h3>
                                    <div class="slide-tip clearfix">
                                        <!-- <div class="slide-left fl">
                                            <span>{{item.publisher}}</span>
                                            <span>{{item.publishtime}}</span>
                                        </div> -->
                                        <div class="slide-right fr">
                                            <span><i class="iconfont icon-read"></i>{{item.readNum}}</span>
                                            <span><i class="iconfont icon-xiaoxi"></i>{{item.commentNum}}</span>

                                        </div>
                                    </div>
                                </div>
                            </carousel-item>
                        </carousel>
                    </div>
                    <ul class="fr top-news">
                        <li class="li" v-for="(item,index) in topList" v-if="index<2" :key="index" @click="goDetail(item.classify,item.id)">
                            <div class="img-wrap">
                              <img class="img" :src="item.image" :alt="item.title">
                            </div>
                            <h3 class="title ellipsis-line">{{item.title}}</h3>
                        </li>
                    </ul>
                </div>
                <div class="type-wrapper clearfix">
                    <div class="type-left fl">
                        <h4 class="column-title">
                            <i class="icon"></i>推荐视频
                        </h4>
                        <ul class="cheat-list">
                            <li class="cheat-item" v-for="(item,index) in videoList" :key="index" @click="goDetail(item.classify,item.id)">
                                <div class="cheat-img" v-if="item.image">
                                    <i class="iconfont icon-video cc"></i>
                                    <img :src="item.image">
                                </div>
                                <div class="cheat-desc">
                                    <h3 class="title">{{item.title}}</h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="type-right fr">
                        <h4 class="column-title">
                            <i class="icon"></i>最新资讯
                        </h4>
                        <ul class="expose-list">
                            <li class="cheat-item" v-for="(item,index) in newsList" :key="index" @click="goDetail(item.classify,item.id)">
                              <!-- 单图 -->
                                <div class="expose-img" v-if="item.image">
                                   <img class="img" :src="item.image" >
                                </div>
                                <!-- 三图 -->
                                <!-- <div class="three" v-for="(item,index) in item.image">
                                  <img class="img" :src="item.image" >
                                  <img class="img" :src="item.image" >
                                  <img class="img" :src="item.image" >
                                </div> -->
                                <div class="expose-desc">
                                    <h3 class="title">{{item.title}}</h3>
                                    <div class="expose-tip clearfix">
                                        <div class="expose-left fl">
                                            <span>{{item.publisher}}</span>
                                            <span>{{item.publishtime}}</span>
                                        </div>
                                        <div class="expose-right fr">
                                            <span><i class="iconfont icon-read"></i>{{item.readNum}}</span>
                                            <span><i class="iconfont icon-xiaoxi"></i>{{item.commentNum}}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div class="wrap-right fr">
                <div class="logined" v-if="isLogin">
                    <div class="publish" @click="release('article')">
                      <i class="iconfont icon-bianji1"></i>
                      我要发布
                    </div>
                    <div class="publish" @click="release('question')">
                      <i class="iconfont icon-warning-circle"></i>
                      我要提问
                    </div>
                </div>
                <div class="side-content">
                    <div class="column-title">
                      <i class="icon"></i>
                      寻人启事
                    </div>
                    <carousel indicator-position="outside" height="216px">
                        <carousel-item v-for="(item,index) in xqList" :key="index" v-if="item.image" @click.native="goDetail(item.classify,item.id)">
                            <img class="slide-img" :src="item.image">
                            <div class="slide-desc">
                                <h3 class="slide-title oe">{{item.title}}</h3>
                            </div>
                        </carousel-item>
                    </carousel>
                </div>
                <div class="side-content">
                    <div class="column-title">
                      <i class="icon" style="background: #78c7fb;"></i>
                      问答专题
                    </div>
                    <ul class="side-list">
                        <li class="side-item bfc-o" v-for="(item,index) in qaList" :key="index" @click="goDetail('wenda',item.id)">
                            <div class="fl side-userInfo">
                                <img class="side-userPhoto" :src="item.header">
                            </div>
                            <div style="margin-left: 46px">
                              <h4 class="title title1">{{item.title}}</h4>
                              {{item.createtime}}
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    // import config from '@/assets/configs/config'
    import articleService from '@/services/articleService'
    import articleFileService from '@/services/article_fileService'
    import articleCommentService from '@/services/article_commentService'
    import userService from '@/services/userService'
    import readHistoryService from '@/services/readHistoryService'
    import interService from '@/services/interlocutionService'
    export default {
        data () {
            return {
                slideList: [],
                topList: [],
                xqList: [],
                videoList: [],
                newsList: [],
                qaList: [],
                fileRoot:window.urls.fileRoot+'/',
            }
        },
        computed: {
          isLogin() {
            return localStorage.token
          }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init();
            })
        },
        methods:{
            init(){
                // 获取推荐滚动列表
                let resSlide = articleService.articlePage(1,5);
                if (resSlide && resSlide.status == "success") {
                    let res = resSlide.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.slideList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.slideList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.slideList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.slideList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取评论数量
                        articleCommentService.getArticleCommentCount(temp.id,data=>{
                            data && data.status == "success" && (this.slideList[i].commentNum = this.$Tool.numConvertText(data.result.count));
                        })
                        // 获取阅读量
                        readHistoryService.getReadCount(temp.id,data=>{
                            data && data.status == "success" && (this.slideList[i].readNum = this.$Tool.numConvertText(data.count));
                        })
                        // 获取发布时间
                        this.slideList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.slideList[i].publisher = data.result.user.username);
                        });
                        // 获取用户头像&昵称
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.slideList[i].publisher = data.result.user.username) && (this.slideList[i].header = this.$Tool.headerImgFilter(data.result.user.imageurl));
                        });

                    }
                }

                // 获取置顶
                articleService._getTodayArticle().then(res => {
                  // console.log(res)
                  let _res = res.list
                  for (let i = 0,len = _res.length; i < len; i++) {
                    let temp = _res[i]
                    // 获取封面图
                    if (temp.type !== 3) {
                        articleFileService.getFileByArticle(temp.id,data=>{
                            if (data && data.status  == "success" && data.result.filelist.length) {
                              temp.image = this.fileRoot + ( temp.type === 1 ? data.result.filelist[0].url : data.result.filelist[0].thumbnail)
                            }
                        })
                    }else{
                        temp.image = this.$Tool.extractImg(temp.content,1)[0]
                    }
                  }
                  this.topList = _res
                })

                // 获取视频
                articleService.articleVideoPage(1,6,'',2,res => {
                  let _res = res.recordPage.list
                  this.videoList = _res
                  for (let i = 0,len = _res.length; i < len; i++) {
                    let temp = _res[i]
                    // 获取封面图
                    if (temp.type !== 3) {
                        articleFileService.getFileByArticle(temp.id,data=>{
                            if (data && data.status  == "success" && data.result.filelist.length) {
                                1 === temp.type ? this.$set(this.videoList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.videoList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                            }
                        })
                    } else {
                        this.videoList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                    }
                  }
                  // console.log(this.videoList)
                })

                // 获取资讯
                let resNews = articleService.articlePage(1,10,'',1);
                if (resNews && resNews.status == "success") {
                    let res = resNews.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.newsList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id,// 获取文章id
                            classify: temp.classify
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.newsList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.newsList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.newsList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取评论数量
                        articleCommentService.getArticleCommentCount(temp.id,data=>{
                            data && data.status == "success" && (this.newsList[i].commentNum = this.$Tool.numConvertText(data.result.count));
                        })
                        // 获取阅读量
                        readHistoryService.getReadCount(temp.id,data=>{
                            data && data.status == "success" && (this.newsList[i].readNum = this.$Tool.numConvertText(data.count));
                        })
                        // 获取发布时间
                        this.newsList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.newsList[i].publisher = data.result.user.username);
                        });
                        // 获取用户头像&昵称
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.newsList[i].publisher = data.result.user.username) && (this.newsList[i].header = this.$Tool.headerImgFilter(data.result.user.imageurl));
                        });

                    }
                }
                // 获取寻亲
                let resXq = articleService.articlePage(1,5,4);
                if (resXq && resXq.status == "success") {
                    let res = resXq.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.xqList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id,// 获取文章id
                            desc:temp.content,//提取描述
                            classify: temp.classify
                        });

                        // 获取评论数量
                        articleCommentService.getArticleCommentCount(temp.id,data=>{
                            data && data.status == "success" && (this.xqList[i].commentNum = this.$Tool.numConvertText(data.result.count));
                        })
                        // 获取阅读量
                        readHistoryService.getReadCount(temp.id,data=>{
                            data && data.status == "success" && (this.xqList[i].readNum = this.$Tool.numConvertText(data.count));
                        })
                        // 获取用户头像&昵称
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.xqList[i].publisher = data.result.user.username) && (this.xqList[i].header = this.$Tool.headerImgFilter(data.result.user.imageurl));
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status  == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.xqList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.xqList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.xqList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取发布时间
                        this.xqList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.xqList[i].publisher = data.result.user.username);
                        });

                    }
                }

                // 获取问答
                let resQa = interService.getQuestionPage(1,13);
                if (resQa && resQa.status == "success") {
                  let res = resQa.recordPage.list
                  this.qaList = res
                  for (let i = 0,len = res.length; i < len; i++) {
                    let temp = res[i];
                    // 获取用户头像&昵称
                    userService.getUserById(temp.userid,data=>{
                        data && data.status == "success" && (this.qaList[i].publisher = data.result.user.username) && (this.qaList[i].header = this.$Tool.headerImgFilter(data.result.user.imageurl));
                    });
                  }
                  // console.log(this.qaList)
                }
            },
            /**
             * 跳转详情页
             * @param  Number classify 当前文章所属分类
             * @param  Number id       当前文章id
             */
            goDetail(classify,id){
                // this.$router.push({name:"listDetail",params:{classify,id,}});
                if (classify === 'wenda') {
                    this.$router.push({name:"answer",params:{classify,id,}});
                    return
                }
                this.$router.push({name:"listDetail",params:{classify,id,}});
            },
            release(type) {
                this.$store.commit('SetRelease', type)
            }
        }
    }
</script>

<style lang="less" scoped>
    .column-title {
        font-size: 16px;
        line-height: 30px;
        vertical-align: text-top;
    }
    .icon {
        display: inline-block;
        width: 4px;
        height: 16px;
        border-radius: 2px;
        background: #09f;
        margin-right: 5px;
        vertical-align: text-top;
    }
    .slide-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .slide-desc {
        width: 100%;
        height: 80px;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 0 5px;
        background-color: rgba(0, 0, 0, .5);
        .slide-title {
            line-height: 45px;
            font-size: 20px;
            color: #efece5;
        }
        .slide-tip {
            color: #efece5;
            .slide-left {
                font-size: 12px;
                span {
                    margin-right: 10px;
                }
            }
            .slide-right {
                transform: scale(.9);
                span {
                    margin-right: 20px;
                    .iconfont {
                        margin-right: 3px;
                    }
                }
            }
        }
    }
    .wrap-left {
        width: 850px;
        .banner-top {
            height: 341px;
            position: relative;
        }
        .banner {
            width: 600px;
            position: relative;
            background-color: #6b6b6b;
            
        }
        .top-news {
            width: 200px;
            margin-left: 50px;
            height: 100%;
            .li {
                height: 50%;
                .img {
                    height: 120px;
                    width: 100%;
                    object-fit: cover;
                }
                .title {
                    .ellipsis-line;
                }
            }
        }
        .type-wrapper {
            margin-top: 30px;
            .cheat-item {
                padding-top: 10px;
                border-top: 2px solid #f2f2f2;
                &:first-child {
                    border-top-color: rgba(0, 153, 255, .2);
                }
            }
            .type-right {
                width: 520px;
                .icon {
                    background: @currentColor;
                }
                .cheat-item {
                    padding-bottom: 10px;
                    &:first-child {
                      border-top-color: rgba(255, 102, 51, .2);
                    }
                }
                .expose-list {
                    .expose-img {
                        float: left;
                        margin-right: 10px;
                    }
                    .three {
                      display: flex;
                      justify-content: space-between;
                    }
                    .img {
                        width: 155px;
                        height: 105px;
                        object-fit: cover;
                    }
                    .expose-desc {
                        .title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            margin-bottom: 13px;
                            line-height: 30px;
                            font-size: 18px;
                            color: #222;
                        }
                        .expose-tip {
                            padding-top: 12px;
                            font-size: 12px;
                            color: #505050;
                            span {
                                margin-right: 10px;
                                .iconfont {
                                    vertical-align: middle;
                                    margin-right: 3px;
                                }
                            }
                        }
                    }
                }
            }
            .type-left {
                width: 280px;
                .cheat-list {
                    .cheat-img {
                        position: relative;
                        width: 100%;
                        height: 156px;
                        .icon-video {
                            font-size: 36px;
                            color: #ddd;
                        }
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .cheat-desc {
                        padding: 8px 0 10px;
                        .title {
                            line-height: 22px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                        .cheat-tip {
                            padding-top: 12px;
                            font-size: 12px;
                            color: #262626;
                            span {
                                margin-right: 8px;
                            }
                        }
                    }
                }
            }
        }
    }
    .wrap-right {
        width: 300px;
        margin-left: 50px;
        .logined {
            background: #eee;
            text-align: center;
            padding: 30px 0;
            .publish {
                display: inline-block;
                width: 50%;
                font-size: 16px;
                cursor: pointer;
                &:first-child {
                  border-right: 1px solid #ddd;
                  color: @currentColor;
                }
                &:last-child {
                  color: #09f;
                }
                .iconfont {
                  font-size: 18px;
                  margin-right: 5px;
                  vertical-align: middle;
                }
            }
        }
        .column-title {
          line-height: 40px;
        }
        .icon {
          margin-left: 5px;
          background: @mainColor;
        }
        .slide-desc {
            width: 100%;
            height: 50px;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 0 5px;
            background-color: rgba(0, 0, 0, .5);
            .slide-title {
                line-height: 45px;
                font-size: 16px;
                color: #efece5;
            }
        }
        .side-content{
          margin-top: 20px;
            box-shadow: 0 0 5px 2px #ddd;
            .side-item{
                padding: 15px 5px;
                border-bottom: 1px solid #e8e8e8;
                &:first-child{
                    padding-top: 0;
                }
                &:last-child{
                    // padding-bottom: 0;
                    border-bottom: none;
                }
                .side-userInfo{
                    margin-bottom: 12px;
                    .side-userPhoto{
                        width: 36px;
                        height: 36px;
                        margin-right: 10px;
                        border-radius: 50%;
                    }
                    .side-username{
                        color: #222;
                    }
                }
                .side-img{
                    width: 100%;
                    height: 200px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .title{
                    font-size: 16px;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .title1{
                    line-height: 24px;
                    padding-bottom: 5px;
                }
                .side-desc{
                    font-size: 15px;
                    line-height: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .side-tip{
                    padding-top: 8px;
                    span{
                        margin-right: 12px;
                        font-size: 14px;
                    }
                    .iconfont{
                        font-size: 16px;
                        margin-right: 3px;
                    }
                    .icon-xiaoxi{
                        font-size: 14px;
                    }
                }
            }
        }
        .side-pic{
            width: 100%;
            height: 222px;
            margin-top: 25px;
            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .module-wrapper{
        margin-top: 90px;
        padding-bottom: 70px;
        .module-header{
            border-top: 2px solid #c6c6c7;
            .title{
                width: 116px;
                height: 36px;
                margin: 0 auto;
                position: relative;
                line-height: 36px;
                text-align: center;
                background: linear-gradient(@basicColor, #f8981f, #f98823);
                box-shadow: 3px 4px 15px rgba(155, 155, 155, 0.8);
                font-size: 16px;
                letter-spacing: 2px;
                color: #fff;
                &:before{
                    display: block;
                    position: absolute;
                    top: -2px;
                    left: -148px;
                    content: '';
                    width: 454px;
                    height: 2px;
                    background-color: @basicColor;
                }
            }
        }
        .module-body{
            margin-top: 30px;
            .module-list{
                .module-item{
                    float: left;
                    width: 568px;
                    margin-right: 44px;
                    &:last-child{
                        margin-right: 0;
                    }
                    .item-img{
                        width: 100%;
                        height: 300px;
                        padding: 2px;
                        border: 1px solid #bfbfbf;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .title{
                        margin: 8px 18px;
                        line-height: 24px;
                        font-size: 18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .module-tip{
                        padding: 8px 18px;
                        font-size: 14px;
                        span{
                            margin-right: 10px;
                        }
                    }
                }
                .module-small-item{
                    margin-top: 30px;
                    &:nth-child(2n){
                        margin-right: 0;
                    }
                    .item-img{
                        width: 222px;
                        height: 129px;
                        margin-right: 20px;
                    }
                    .module-desc{
                        width: 303px;
                        min-height: 129px;
                        position: relative;
                        .title{
                            font-size: 16px;
                        }
                        .module-tip{
                            position: absolute;
                            bottom: 6px;
                        }
                    }

                }
            }
        }
        
    }
    .xunqing{
        color: @deepMainColor;
        margin-top: 10px;
    }

</style>

<style lang="less">

    // /*el-carousel 样式定制*/
    .el-carousel__button{
        width: 32px;
        height: 3px;
    }
    .el-carousel__item{
        background: #262626;
        color: #fff;
    }
    .el-carousel__arrow{
        width: 45px;
        height: 45px;
        background-color: rgba(0,0,0,0.5);
    }
    .el-carousel__arrow:hover{
        background-color: rgba(0,0,0,0.8);
    }
    // .el-icon-arrow-left,
    // .el-icon-arrow-right{
    //     transform: scale(2.2);
    // }
    // .el-carousel__indicators--outside{
    //     position: absolute;
    //     bottom: 0;
    //     -webkit-transform: translateX(-50%);
    //     transform: translateX(-50%);
    // }
    .el-carousel__indicators--outside button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .wrap-right .el-carousel__arrow{
        width: 35px;
        height: 35px;
    }
    /*当前样式*/
    .el-carousel__indicator.is-active button {
        background-color: @currentColor;
    }
</style>
