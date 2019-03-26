<template>
    <div>
        <div class="module clearfix">
            <div class="wrap-left fl">
                <!-- banner -->
                <div class="banner-top">
                    <div class="banner fl">
                        <carousel height="341px">
                            <carousel-item v-for="(item,index) in slideList" :key="index" v-if="item.image" @click.native="goDetail(0,item.id)">
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
                        <li class="li" v-for="(item,index) in jmList" v-if="index<2" :key="index" @click="goDetail(1,item.id)">
                            <div class="img-wrap">
                              <img class="img" :src="item.image" alt="">
                            </div>
                            <h3 class="title">{{item.title}}</h3>
                        </li>
                    </ul>
                </div>
                <div class="type-wrapper clearfix">
                    <div class="type-left fl">
                        <h4 class="column-title">
                            <i class="icon"></i>推荐视频
                        </h4>
                        <ul class="cheat-list">
                            <li class="cheat-item" v-for="(item,index) in fpList" :key="index" @click="goDetail(2,item.id)">
                                <div class="cheat-img" v-if="item.image">
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
                            <li class="cheat-item" v-for="(item,index) in jmList" :key="index" @click="goDetail(1,item.id)">
                                <div class="expose-img" v-if="item.image">
                                    <img :src="item.image" >
                                </div>
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
                <!-- <div class="report">
                    <img src="@/assets/images/jubao.png" alt="举报专区">
                </div> -->
                <div class="side-content">
                    <div class="column-title">
                      <i class="icon"></i>
                      寻人启事
                    </div>
                    <carousel indicator-position="outside" height="216px">
                        <carousel-item v-for="(item,index) in slideList" :key="index" v-if="item.image" @click.native="goDetail(0,item.id)">
                            <img class="slide-img" :src="item.image">
                            <div class="slide-desc">
                                <h3 class="slide-title oe">{{item.title}}</h3>
                            </div>
                        </carousel-item>
                    </carousel>
                </div>
                <div class="side-content">
                    <div class="column-title">
                      <i class="icon"></i>
                      问答专题
                    </div>
                    <ul class="side-list">
                        <li class="side-item bfc-o" v-for="(item,index) in slideList" :key="index" @click="goDetail(0,item.id)">
                            <div class="fl side-userInfo">
                                <img class="side-userPhoto" :src="item.header">
                            </div>
                            <h4 class="title title1">{{item.title}}</h4>
                        </li>
                    </ul>
                </div>
                <!-- <router-link to="/answer" tag="div" class="side-pic">
                    <img src="@/assets/images/wenda.png" alt="在线问答">
                </router-link>
                <div class="side-pic">
                    <img src="@/assets/images/tougao.png" alt="在线投稿">
                </div> -->

            </div>
        </div>
        <!-- <div class="module-wrapper">
            <div class="module-header ac">
                <h4 class="title">寻亲</h4>
                <p class="xunqing">公益寻亲：免费发布寻人寻亲信息，利用网络信息技术帮助失散人群，早日回家团圆。邮箱：2787064791@qq.com</p>
            </div>
            <div class="module-body">
                <ul class="module-list clearfix">
                    <li class="module-item fl" v-for="(item,index) in xqList" v-if="index <= 1" @click="goDetail(4,item.id)">
                        <div class="item-img" v-if="item.image">
                            <img :src="item.image" alt="">
                        </div>
                        <h5 class="title">{{item.title}}</h5>
                        <div class="module-tip">
                            <span>{{item.publisher}}</span>
                            <span>{{item.publishtime}}</span>
                        </div>
                    </li>
                </ul>
                <ul class="module-list clearfix">
                    <li class="module-item module-small-item clearfix" v-for="(item,index) in xqList" v-if="index >= 2" @click="goDetail(4,item.id)">
                        <div class="item-img fl" v-if="item.image">
                            <img :src="item.image" alt="">
                        </div>
                        <div class="module-desc fl">
                            <h5 class="title">{{item.title}}</h5>
                            <div class="module-tip">
                                <span>{{item.publisher}}</span>
                                <span>{{item.publishtime}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div> -->
        <base-footer></base-footer>
    </div>
</template>

<script>
    import config from '@/assets/configs/config'
    import articleService from '@/services/articleService'
    import articleFileService from '@/services/article_fileService'
    import articleCommentService from '@/services/article_commentService'
    import userService from '@/services/userService'
    import readHistoryService from '@/services/readHistoryService'
    import baseFooter from '@/components/baseFoot'
    export default {
        components:{
            baseFooter
        },
        data () {
            return {
                slideList:[],
                jmList:[],
                fpList:[],
                djList:[],
                xqList:[],
                pfList:[{},{},{}],
                dgList:[{},{},{}],
                gcwList:[{},{},{}],
                fileRoot:config.fileRoot+'/',
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init();
            })
        },
        methods:{
            init(){
                // 获取推荐
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
                // 获取揭秘
                let resJm = articleService.articlePage(1,6,1);
                if (resJm && resJm.status == "success") {
                    let res = resJm.recordPage.list;
                    // console.log(res)
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.jmList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.jmList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.jmList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.jmList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取评论数量
                        articleCommentService.getArticleCommentCount(temp.id,data=>{
                            data && data.status == "success" && (this.jmList[i].commentNum = this.$Tool.numConvertText(data.result.count));
                        })
                        // 获取阅读量
                        readHistoryService.getReadCount(temp.id,data=>{
                            data && data.status == "success" && (this.jmList[i].readNum = this.$Tool.numConvertText(data.count));
                        })
                        // 获取发布时间
                        this.jmList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.jmList[i].publisher = data.result.user.username);
                        });

                    }
                    // console.log(this.jmList)
                }
                // 获取防骗
                let resFp = articleService.articlePage(1,8,2);
                if (resFp && resFp.status == "success") {
                    let res = resFp.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.fpList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    try {
                                        1 === temp.type ? this.$set(this.fpList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.fpList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                    }catch (e) {

                                    }
                                }
                            })
                        }else{
                            this.fpList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取评论数量
                        articleCommentService.getArticleCommentCount(temp.id,data=>{
                            data && data.status == "success" && (this.fpList[i].commentNum = this.$Tool.numConvertText(data.result.count));
                        })
                        // 获取发布时间
                        this.fpList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.fpList[i].publisher = data.result.user.username);
                        });

                    }
                }
                // 获取打假
                let resDj = articleService.articlePage(1,5,3);
                if (resDj && resDj.status == "success") {
                    let res = resDj.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.djList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.djList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.djList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.djList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取发布时间
                        this.djList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        // 获取用户头像&昵称
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.djList[i].publisher = data.result.user.username);
                        });

                    }
                }
                // 获取寻亲
                let resXq = articleService.articlePage(1,8,4);
                if (resXq && resXq.status == "success") {
                    let res = resXq.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.xqList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id,// 获取文章id
                            desc:temp.content//提取描述
                        });
                        //提取描述
                        /*console.log(temp.content)
                        let arr = temp.content.match(/\W+/g),
                            desc = '';
                        if (arr) {
                            for (let j = 0; j < arr.length; j++) {
                                desc += arr[j];
                                if (desc.length > 36) {
                                    break;
                                }
                            }
                            this.xqList[i].desc = desc.substring(0,36) + '...';
                        }*/
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
                // 获取普法
                let resPf = articleService.articlePage(1,5,5);
                if (resPf && resPf.status == "success") {
                    this.pfList = [];
                    let res = resPf.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.pfList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.pfList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.pfList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.pfList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // console.log(this.pfList[i].image)
                        // 获取发布时间
                        this.pfList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.pfList[i].publisher = data.result.user.username);
                        });

                    }
                }
                // 获取打工
                let resDg = articleService.articlePage(1,8,6);
                if (resDg && resDg.status == "success") {
                    this.dgList = [];
                    let res = resDg.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.dgList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.dgList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.dgList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.dgList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取发布时间
                        this.dgList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.dgList[i].publisher = data.result.user.username);
                        });

                    }
                }
                // 获取广场舞
                let resGwc = articleService.articlePage(1,5,7);
                if (resGwc && resGwc.status == "success") {
                    this.gcwList = [];
                    let res = resGwc.recordPage.list;
                    for (let i = 0,len = res.length; i < len; i++){
                        let temp = res[i];
                        this.gcwList.push({
                            title:temp.title,// 获取文章标题
                            id:temp.id// 获取文章id
                        });
                        // 获取封面图
                        if (temp.type !== 3) {
                            articleFileService.getFileByArticle(temp.id,data=>{
                                if (data && data.status == "success" && data.result.filelist.length) {
                                    1 === temp.type ? this.$set(this.gcwList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.gcwList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
                                }
                            })
                        }else{
                            this.gcwList[i].image = this.$Tool.extractImg(temp.content,1)[0]
                        }
                        // 获取发布时间
                        this.gcwList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
                        userService.getUserById(temp.author,data=>{
                            data && data.status == "success" && (this.gcwList[i].publisher = data.result.user.username);
                        });

                    }
                    // console.log(this.gcwList)
                }
            },
            /**
             * 跳转详情页
             * @param  Number classify 当前文章所属分类
             * @param  Number id       当前文章id
             */
            goDetail(classify,id){
                // this.$router.push({name:"listDetail",params:{classify,id,}});
                this.$router.push({name:"listDetail",params:{classify,id,}});
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
                    overflow: hidden;
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
                        width: 155px;
                        height: 105px;
                        float: left;
                        margin-right: 10px;
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
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
                        width: 100%;
                        height: 156px;
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
        /* .report{
            width: 100%;
            height: 95px;
            margin-bottom: 20px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        } */
        .column-title {
          line-height: 40px;
        }
        .icon {
          margin-left: 5px;
          background: @currentColor;
        }
        .side-title{
            width: 100%;
            line-height: 32px;
            position: relative;
            font-size: 18px;
            color: #fff;
            letter-spacing: 1px;
            text-align: center;
            background: linear-gradient(@basicColor,#f89a1e);
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
                    padding-bottom: 0;
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
