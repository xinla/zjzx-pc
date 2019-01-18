<template>
    <div>
        <div class="module clearfix">
            <div class="wrap-left fl">
                <div class="banner">
                    <carousel indicator-position="outside" height="500px">
                        <carousel-item v-for="(item,index) in slideList" :key="index" @click.native="goDetail(0,item.id)">
                            <img class="slide-img" :src="item.image">
                            <div class="slide-desc">
                                <h3 class="slide-title">{{item.title}}</h3>
                                <div class="slide-tip clearfix">
                                    <div class="slide-left fl">
                                        <span>{{item.publisher}}</span>
                                        <span>{{item.publishtime}}</span>
                                    </div>
                                    <div class="slide-right fr">
                                        <span><i class="iconfont icon-read"></i>{{item.readNum}}</span>
                                        <span><i class="iconfont icon-xiaoxi"></i>{{item.commentNum}}</span>

                                    </div>
                                </div>
                            </div>
                        </carousel-item>
                    </carousel>
                </div>
                <div class="type-wrapper clearfix">
                    <div class="type-left fl">
                        <h4 class="expose-title">揭秘</h4>
                        <ul class="expose-list">
                            <li class="expose-item" v-for="(item,index) in jmList" :key="index" @click="goDetail(1,item.id)">
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
                    <div class="type-right fr">
                        <h4 class="cheat-title">
                            <span>防骗</span>
                        </h4>
                        <ul class="cheat-list">
                            <li class="cheat-item" v-for="(item,index) in fpList" :key="index" @click="goDetail(2,item.id)">
                                <div class="cheat-img" v-if="item.image">
                                    <img :src="item.image">
                                </div>
                                <div class="cheat-desc">
                                    <h3 class="title">{{item.title}}</h3>
                                    <div class="cheat-tip">
                                        <span>{{item.publisher}}</span>
                                        <span>{{item.publishtime}}</span>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="wrap-right fr">
                <div class="report">
                    <img src="@/assets/images/jubao.png" alt="举报专区">
                </div>
                <div class="side-title">
                    <span>打假</span>
                    <i class="iconfont icon-arrow-down"></i>
                </div>
                <div class="side-content">
                    <ul class="side-list">
                        <li class="side-item"  v-for="(item,index) in djList" :key="index" @click="goDetail(3,item.id)">
                            <div class="side-img" v-if="item.image">
                                <img :src="item.image">
                            </div>
                            <h4 class="title">{{item.title}}</h4>
                            <div class="side-tip">
                                <span>{{item.publisher}}</span>
                                <span>{{item.publishtime}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="side-title">
                    <span>风闻专区</span>
                    <i class="iconfont icon-arrow-down"></i>
                </div>
                <div class="side-content">
                    <ul class="side-list">
                        <li class="side-item" v-for="(item,index) in slideList" :key="index" @click="goDetail(0,item.id)">
                            <div class="side-userInfo">
                                <img class="side-userPhoto" :src="item.header">
                                <span class="side-username">{{item.publisher}}</span>
                            </div>
                            <h4 class="title title1">{{item.title}}</h4>
                            <div class="side-desc">
                                <p v-html="item.desc"></p>
                            </div>
                            <div class="side-tip">
                                <span><i class="iconfont icon-read"></i>{{item.readNum}}</span>
                                <span><i class="iconfont icon-xiaoxi"></i>{{item.commentNum}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="side-pic">
                    <img src="@/assets/images/wenda.png" alt="在线问答">
                </div>
                <div class="side-pic">
                    <img src="@/assets/images/tougao.png" alt="在线投稿">
                </div>

            </div>
        </div>
        <div class="module-wrapper">
            <div class="module-header ac">
                <h4 class="title">寻亲</h4>
                <p class="xunqing">公益寻亲：免费发布寻人寻亲信息，利用网络技术帮助失散人群，早日回家团圆。</p>
            </div>
            <div class="module-body">
                <ul class="module-list clearfix">
                    <li class="module-item fl" v-for="(item,index) in xqList" v-if="index <= 1" @click="goDetail(4,item.id)">
                        <div class="item-img">
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
                        <div class="item-img fl">
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
        </div>
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
                            this.slideList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.jmList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.fpList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.djList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.xqList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.pfList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.dgList[i].image = this.$Tool.extractImg(temp.content,1)
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
                            this.gcwList[i].image = this.$Tool.extractImg(temp.content,1)
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
    .wrap-left {
        width: 790px;
        .banner {
            width: 100%;
            height: 500px;
            position: relative;
            background-color: #6b6b6b;
            .slide-img {
                display: block;
                width: 100%;
                height: 500px;
                object-fit: cover;
            }
            .slide-desc {
                width: 100%;
                height: 100px;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 0 20px;
                background-color: rgba(0, 0, 0, .7);
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
        .type-wrapper {
            margin-top: 30px;
            .type-left {
                width: 460px;
                .expose-title {
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 14px;
                    font-size: 20px;
                    letter-spacing: 2px;
                    box-shadow: 4px 3px 17px rgba(155, 155, 155, .8), -3px -1px 5px rgba(155, 155, 155, .8);
                    background: linear-gradient(@basicColor, #f8981f, #f98823);
                    color: #fff;
                }
                .expose-list {
                    margin-top: 20px;
                    .expose-item {
                        margin-bottom: 50px;
                        .expose-img {
                            width: 460px;
                            height: 240px;
                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .expose-desc {
                            padding: 10px 13px 18px 10px;
                            border-radius: 0 0 15px 15px;
                            box-shadow: 1px 1px 4px 2px #bcbcbc;
                            border: 1px solid #8f8f8f;
                            border-top: none;
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
            }
            .type-right {
                width: 300px;
                height: 800px;
                /*background-color: #4cd964;*/
                .cheat-title {
                    border-top: 2px solid #f8a11c;
                    span {
                        display: block;
                        width: 86px;
                        height: 28px;
                        margin: 0 auto;
                        line-height: 28px;
                        text-align: center;
                        font-size: 16px;
                        letter-spacing: 2px;
                        box-shadow: 3px 4px 15px rgba(155, 155, 155, .8);
                        background: linear-gradient(@basicColor, #f8981f, #f98823);
                        color: #fff;
                    }
                }
                .cheat-list {
                    margin-top: 30px;
                    .cheat-item {
                        margin-bottom: 30px;
                        border: 1px solid #a0a0a0;
                        .cheat-img {
                            width: 100%;
                            height: 160px;
                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .cheat-desc {
                            padding: 6px 10px;
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
    }
    .wrap-right {
        width: 360px;
        .report{
            width: 360px;
            height: 95px;
            margin-bottom: 20px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
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
            padding: 16px 5px;
            border: 2px solid @basicColor;
            border-top: none;
            .side-item{
                padding: 15px 0;
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
                    width: 346px;
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
                    margin-top: 5px;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .title1{
                    line-height: 24px;
                    margin-bottom: 12px;
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
            width: 360px;
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
        font-weight: 500;
        color: @deepMainColor;
        margin-top: 10px;
    }
</style>

<style>
    .el-carousel__indicators--outside{
        position: absolute;
        bottom: 0 !important;
    }

    /*el-carousel 样式定制*/
    .el-carousel{
        margin-bottom: 30px;
    }
    .el-carousel__button{
        width: 32px !important;
        height: 3px !important;
    }
    .el-carousel__item{
        background: #262626;
        color: #fff;
    }
    .el-carousel__arrow{
        width: 55px;
        height: 55px;
        background-color: rgba(0,0,0,0.5);
    }
    .el-carousel__arrow:hover{
        background-color: rgba(0,0,0,0.8);
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right{
        transform: scale(2.2);
    }
    .el-carousel__indicators--outside{
        position: absolute;
        bottom: 0;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    /*当前样式*/
    .el-carousel__indicator.is-active button {
        background-color: #f10;
    }
</style>
