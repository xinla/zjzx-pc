<template>
	<div @scroll="loadMore">
		<memberList :list="list" :mes="proMes" :ifFocus="ifFocus"></memberList>
		<div class="article-loading" v-show="ifLoad && list.length > 10">
      <div class="load-img">
          <img src="@/assets/images/loading.gif">
      </div>
      正在加载
    </div>
    <div v-if="!ifLoad">
	    <div class="article-null" v-show="!isAll">
	      <div class="article-box">
	          <i class="iconfont icon-no-msg"></i>
	          <div class="article-msg">{{proMes}}</div>
	      </div>
	    <div class="article-loaded" v-show="isAll">{{proMes}}</div>
	    </div>
    </div>
	</div>
</template>

<script>
import memberList from '@/components/memberList'
import followService from '@/services/followService'
export default{
	components:{
		memberList,
	},
	data(){
		return{
			list:[],
			proMes:'',
			page:1,
			lock:false,
			scrollTop:0,
			ifLoad:true,
			ifFocus:true,
			isAll: false,
			type: ''
		}
	},
	mounted(){
			// this.page = 1;
			// this.list = [];
			this.type = this.$route.query.type
			this.init();		
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			let res;
			if (this.type == 'focus') {
				res = followService.getUserFollow(this.page,10);
			}else if (this.type == 'fans') {
				res = followService.getVermicelliList(this.page,10);
				this.ifFocus = false;
			}
			if (res && res.status == "success") {
				if (res.recordPage.list.length) {
					this.page++;						
					this.list = this.list.concat(res.recordPage.list);
				}else if (this.list.length == 0) {
					this.proMes = "已加载全部内容";
					this.isAll = true
					this.ifLoad = false;
				}
			} else {
				this.proMes = "请求失败，请稍后再试！"
			}
			this.lock = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-10) {
				this.init();
				// console.log(1)
			}
		},
	}
}	
</script>

<style lang="less" scoped>
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