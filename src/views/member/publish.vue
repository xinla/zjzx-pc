<template>
    <div class="article-list" @scroll="loadMore" ref="scroll">
      <template v-if="!ifQA">
        <mit
          v-for="(item,index) in arcList"
          v-if="!deleteIndex[index]"
          :key="index"
          :article="item"
          :whi="index"
          :ifSelf="true"
          :ifDel="true"
          @delete="deleteArticle"
          >
        </mit>
      </template>
      <template v-else>
        <question
          v-for="(item,index) in arcList"
          v-if="!deleteIndex[index]"
          :key="index"
          :wenda="item"
          :whi="index"
          :ifDel="true"
          @delete="deleteArticle"
          >
        </question>
      </template>

      <div class="article-loading" v-show="ifLoad">
        <div class="load-img">
            <img src="@/assets/images/loading.gif">
        </div>
        正在加载
      </div>
      <div class="article-loaded" v-show="!ifLoad">已加载全部内容</div>
      <div class="article-null" v-show="proIf">
        <div class="article-box">
            <i class="iconfont icon-no-msg"></i>
            <div class="article-msg">您想看的真相消失啦...</div>
        </div>
      </div>
      
    </div>
</template>

<script>
import articleService from '@/services/articleService'
import interService from '@/services/interlocutionService'
import mit from '@/components/multiImgText'
import Question from '@/components/Question'
  export default {
  	components: {
	    mit,
	    Question
	  },
    data(){
      return {
        arcList:[],
        proMes:'',
        proIf:false,
        page:1,
        lock:false,
        ifLoad:true,
        scrollTop:0,
        deleteIndex:[],
        timer:null,
        ifQA:false,
        tip:"",
        ifLoading: false,
        type: '',
        userId: 0
      }
    },
    watch:{
      userId(){
        $(this.$refs["scroll"].$el).scrollTop(0)
        this.ifLoading = true;
        this.deleteIndex = [];
        this.page = 1;
        this.arcList = [];
        this.tip = "";
        this.init();
      },
    },
    mounted(){
      this.userId = parseInt(this.$route.query.userId)
      this.type = this.$route.query.type
      this.init();
      // console.log(1)
    },
    activated(){
      this.userId = this.$route.query.userId;
      $(this.$refs["scroll"].$el).scrollTop(this.scrollTop);
    },
    methods:{
      init(){
        this.proIf = false;
        this.lock = true;
        this.ifLoad = true;
        this.ifLoading = true;
        var res;
        if (!this.type || this.type === 'article') {
          res = articleService.getArticleByUser(this.userId,this.page,10,1);
        }else if (this.type === 'video') {
          res = articleService.getArticleByUser(this.userId,this.page,10,2);
        }else if (this.type === 'qa') {
          this.ifQA = true;
          res = interService.getQuestionPage(this.page,10,this.userId);
          // console.log(res)
        }
        if (res && res.status == "success") {
          let temp = (!this.ifQA ? res.result.recordPage.list:res.recordPage.list);
          (temp.length < 10) && (this.ifLoad = false,this.tip = "你看到我的底线啦");
          if (temp.length) {
            this.page++;
            this.arcList = this.arcList.concat(temp);
            // console.log(this.arcList)
          }else if (this.arcList.length == 0) {
            this.proIf = true;
            this.proMes = "您想要的真相消失啦~~~";
          }
        } else {
          this.proIf = true;
          this.proMes = "请求失败，请稍后再试！"
        }
        this.lock = false;
        this.ifLoading = false;
      },
      deleteArticle([id,whi,event]){
        this.$confirm('确定要删除么', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(()=>{
            deleteArt.call(this, whi)
        });

        event.stopPropagation();
        function deleteArt (index) {
          let resDelete = (!this.ifQA?articleService.deleteArticleById(id):interService.deleteQuestion(id))
          // console.log(resDelete)
          if (resDelete && resDelete.status == "success") {
            // this.arcList.splice(index,1);
            this.$set(this.deleteIndex,whi,true);
            this.$message('删除成功')
          } else {
            this.$message('删除失败，请重试！')
          }
          // console.log(this.arcList)
        }
      },
      loadMore(e){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.scrollTop = $(e.target).scrollTop();
          // console.log(this.scrollTop)
          if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 30) >= e.target.scrollHeight) {
            this.init();
          }
        },200)
      },
    },
  }
</script>

<style rel="stylesheet" lang="less" scoped>
  /*加载遮层罩*/
  .editor{
    color: #aaa;
    line-height: 40px;
    padding:0 0.3rem;
    border-bottom: 0.02rem solid #e8e8e8;
  }
  .deleteAll{
    border: 0.02rem solid #e8e8e8;
    border-radius: 8px;
    padding: 2px 6px;
  }
  .icon-delete{
    font-size: 18px;
  }
  .article-list{
  	min-height: 300px;
    max-height: 800px;
    overflow: scroll;
    margin: 0 .3rem;
    padding-bottom: .4rem;
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
</style>
