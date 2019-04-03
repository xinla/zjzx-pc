<template>
  <div class="wrap">
    <div class="user-list wrapper clearfix">
      <div class="user-left fl">
        <ul class="user-tab clearfix">
          <li class="tab-item"
            v-for="(value, key) in tabs" 
            :key="key" 
            :class="{'tabActive': type === key}"
            @click="handleTabs(value, key)">
            {{value}}
          </li>
          <template v-if="isSelf">
            <li class="tab-item"
              v-for="(value, key) in tabsPrivate" 
              :key="key" 
              :class="{'tabActive': type === key}"
              @click="handleTabs(value, key)">
              {{value}}
            </li>
          </template>
        </ul>
          
        <keep-alive>
          <router-view :key="$route.query.type"></router-view>
        </keep-alive>

      </div>

      <!-- <div class="user-right fr">
      
        <ul class="info common">
          <li class="li">
            <span class="num">{{focusNum}}</span>
            <p>关注</p>
          </li>
          <li class="li">
            <span class="num">{{fansNum}}</span>
            <p>粉丝</p>
          </li>
          <li class="li">
            <span class="num">0</span>
            <p>消息</p>
          </li>
        </ul>
        
        <ul class="publish common">
          <li class="li">
            <i class="iconfont icon-sketch"></i>
            <p>发布图文</p>
          </li>
          <li class="li">
            <i class="iconfont icon-video"></i>
            <p>发布视频</p>
          </li>
          <li class="li">
            <i class="iconfont icon-question"></i>
            <p>发布问答</p>
          </li>
        </ul>
      
        <div class="side-title">
          <span class="title">最新资讯</span>
        </div>
        
        <div class="side-content">
          <div class="side-item" v-for="(item, index) in groomList" @click="goDetail(0,item.id)">
            <div class="side-user clearfix">
              <img :src="$Tool.headerImgFilter(item.imageurl)" class="side-userPhoto fl" alt="">
              <span class="name fl">{{ item.username}}</span>
            </div>
            <h4 class="side-tit">{{item.title}}</h4>
            <div class="side-footer">
              <span>评论 {{item.articleCount}}</span>
              <span>赞 {{item.zanCount}}</span>
            </div>
          </div>
        </div>
      
      </div> -->
    </div>
  </div>
</template>

<script>
import listUtil from '@/utils/listUtil'
import pageUtil from '@/utils/pageUtil'
import articleService from '@/services/articleService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
import readHistoryService from '@/services/readHistoryService'
import praiseService from '@/services/praiseService'
import userService from '@/services/userService'
import followService from '@/services/followService'

export default {
  name: "userList",
  props: {
    userId:{
      type: Number,
      required: true,
      default: 0
    },
  },
  data() {
    return {
      fileRoot: window.urls.fileRoot + '/',
      tabs: {
        article: '文章',
        video: '视频',
        qa: '问答',
      },
      tabsPrivate: {
        focus: '关注',
        fans: '粉丝',
        collection: '收藏',
        history: '历史',
        // message: '消息'
      },
      toggleA: true,
      toggleB: false,
      articleList: [],
      videoList: [],
      articleCount: 0,
      type: '',
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
      },
      list: [],
      focusNum:0,
      fansNum:0
    }
  },
  computed: {
    isSelf() {
      return this.$store.state.userId === this.userId
    }
  },
  watch: {
      userId() {
          this.type = this.$route.query.type || 'article'
          this.init();
          // console.log('watch', this.type)
      }
  },
  mounted() {
    this.type = this.$route.query.type || 'article'
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      // 获取文章列表
      this.getArticleList()
      
      // 获取风闻专区推荐列表
      /*let groomData =  articleService.articlePage(this.groomPage,5);
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
      }*/

    },
    getArticleList() {
      this.articleBool.loading = true;
      this.articleBool.lock = true;
      let res = articleService.getArticleByUser(parseInt(this.userId), this.articlePage, 10, 1);
      if (res && res.status == "success") {
        this.list = this.list.concat(res.result.recordPage.list)
        // console.log(this.list, res.result)
        if (res.result.recordPage.list.length) {
          this.articlePage++;
        } else {
          this.articleBool.loading = false;
          this.articleBool.ifLoading = false;
          this.articleBool.loaded = true;
        }
      }
      this.articleBool.lock = false;
    },
    goDetail(classify,id){
      // this.$router.push({name:"listDetail",params:{classify,id,}});
      this.$router.push({name:"listDetail",params:{classify,id,}});
    },

    // 文章视频选项卡切换
    handleTabs(value, key) {
      if (key === 'article' || key === 'video' || key === 'qa') {
        this.$router.replace({ name: 'publish', query: { type: key, userId: this.userId } })
      } else if (key === 'focus' || key === 'fans') {
        this.$router.replace({ name: 'focus', query: { type: key, userId: this.userId } })
      } else {
        this.$router.replace({ name: 'history', query: { type: key, userId: this.userId } })
      }
      this.type = key
        /*if (index == 0) {
            this.toggleA = true;
            this.toggleB = false;
        } else {
          this.toggleA = false;
          this.toggleB = true;
        }*/
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
      let h1 = $(e.target).scrollTop();
      this.scrollTop = $(e.target).scrollTop();
      clearTimeout(this.articleBool.timer);
      this.articleBool.timer = setTimeout(() => {
        if (!this.articleBool.lock && h1) {
          this.getArticleList();
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
      let h1 = $(e.target).scrollTop();
      this.scrollTop = $(e.target).scrollTop();
      clearTimeout(this.videoBool.timer);
      this.videoBool.timer = setTimeout(() => {
        if (!this.videoBool.lock && h1) {
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
}
</script>

<style lang="less" scoped>
.wrap{
  padding: 32px 0;
  .user-left {
    width: 758px;
    background: #fff;
    padding: 15px 20px 0;
    .user-tab {
      width: 100%;
      line-height: 49px;
      border-bottom: 1px solid #e8e8e8;
      .tab-item {
        float: left;
        margin: 0 25px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        font-weight: 800;
      }
      .tabActive {
        color: @basicColor;
        background: url("../../../assets/images/tab-line.png") center bottom no-repeat;
        position: relative;
      }
    }
    .user-wrap {
      margin-top: 25px;
      min-height: 300px;
      max-height: 800px;
      overflow: scroll;
      
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

  /* .user-right {
    width: 410px;
    .common {
      text-align: center;
      margin-bottom: 30px;
      p{
        margin-top: 5px;
      }
    }
    .info {
      background: #fff;
      padding: 25px 0;
      .li {
        display: inline-block;
        padding: 0 35px;
        border-right: 1px solid #ddd;
        font-size: 18px;
        &:last-child {
          border: 0;
        }
        .num {
          font-size: 20px;
        }
      }
    }
    .publish {
      .li {
        display: inline-block;
        padding: 0px 25px;
      }
      .iconfont {
        font-size: 56px;
      }
    }
    .side-title {
      width: 100%;
      line-height: 32px;
      position: relative;
      font-size: 18px;
      color: #fff;
      letter-spacing: 1px;
      text-align: center;
      background: #ccc;
      border-radius: 5px 5px 0 0;
    }
    .side-content {
      padding: 15px 10px;
      border: 1px solid #ded;
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
        .side-footer {
          font-size: 12px;
          color: #262626;
          span {
            margin-right: 16px;
          }
        }
      }
    }
  } */
}
</style>
