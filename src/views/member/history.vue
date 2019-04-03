<template>
	<div @scroll="loadMore" ref="scroll" style="position: relative;">
		<div class="editor bfc-p" v-if="arcList.length">
			<i class="iconfont icon-lajixiang fr" v-if="!ifDeleteAll" @click="ifDeleteAll = true;"></i>
			<div v-else>
				<span @click="deleteAll()" class="deleteAll cp">删除全部</span>
				<span class="fr cp" @click="ifDeleteAll = false;">完成</span>		
			</div>
		</div>
		<div class="list-wrap">
			<articleSub 
				v-for="(item,index) in arcList" 
				v-if="!deleteIndex[index]" 
				:key="index"
				:article="item" 
				:whi="index" 
				:ifPublisher="true" 
				:ifHistory="true"
				@delete="deleteArticle" 
			>
			</articleSub>			
		</div>

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
import articleSub from '@/components/articleSub'
import readHistoryService from '@/services/readHistoryService'
import articleCollectService from '@/services/articleCollectService'
import articleService from '@/services/articleService'
export default {
	components:{
		articleSub,
	},
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
			ifDeleteAll:false,
			page:1,
			lock:false,
			ifLoad:true,
			deleteIndex:[],
			timer:null,
			isHistory:true,
		}
	},
	mounted(){
    this.type = this.$route.query.type
			// this.deleteIndex = [];
			// this.ifDeleteAll = false;
			// this.page = 1;
			// this.arcList = [];
		this.init();
	},
	activated(){
		$(this.$refs["scroll"].$el).scrollTop(this.scrollTop);
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			let res = {}
			if (this.type === 'history') {
				res = readHistoryService.getReadHistory(this.page,10);
			} else {
				res = articleCollectService.getCollectPage(this.page,10);
				this.isHistory = false
			}
			if (res && res.status == "success") {
				if (res.recordPage.list.length) {
					this.proIf = false;
					this.page++;						
					this.arcList = this.arcList.concat(res.recordPage.list);
				}else if (this.arcList.length == 0) {
					this.proIf = true;
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proIf = true;
				this.proMes = "请求失败，请稍后再试！"
			}
			this.lock = false;
			this.ifLoad = false;
		},
		deleteArticle([id,whi,event]){
			// debugger;
			this.$confirm('确定要删除么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
      }).then(()=>{
          deleteArt.call(this,whi)
      });

			event.stopPropagation();
			function deleteArt (whi) {
				let resDelete = (this.isHistory ? readHistoryService.clearHistory([id]) : articleCollectService.articleCollect(id));
				if (resDelete && resDelete.status == "success") {
					// this.arcList.splice(whi,1);
					this.$set(this.deleteIndex,whi,true);
					// this.deleteIndex[whi] = true;
					this.$message('删除成功')
				} else {
					this.$message('删除失败，请重试！')
				}
				// console.log(this.arcList)
			}
		},
		deleteAll(){
			this.$confirm('确定要删除么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
      }).then(()=>{
          deleteA.call(this)
      });
			this.ifDeleteAll = false;
			function deleteA(){
				let temp = [];
				for (var i = 0,len = this.arcList.length; i < len; i++) {
					(this.isHistory ? temp.push(this.arcList[i].id) : temp.push(this.arcList[i].articleid))
				}
				// console.log(temp)
				let resDelete = (this.isHistory ? readHistoryService.clearHistory(temp) : articleCollectService.deleteCollect(temp))
				if (resDelete && resDelete.status == "success") {
					this.arcList = [];
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
          if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 10) >= e.target.scrollHeight) {
              this.init();
          }
      },200)
		},
	},
	/*watch:{
		$route(){
            $(this.$refs["scroll"].$el).scrollTop(this.scrollTop);
        console.log(this.$refs["scroll"])
        },
	}*/
	// beforeRouteEnter (to, from, next) {
	// 	next(vm=>{
	// 		vm.init();
	// 	})
	// }
}
</script>

<style rel="stylesheet" scoped>
	.editor{
		width: 100%;
		color: #aaa;
		line-height: 40px;
	    padding:0 0.3rem;
		border-bottom: 0.02rem solid #e8e8e8;
		z-index: 9;
		background: #eee;
	}
	.deleteAll{
		border: 0.02rem solid #e8e8e8;
		border-radius: 8px;
		padding: 2px 6px;
	}
	.icon-lajixiang{
		font-size: 18px;
	}
	.list-wrap{
		padding-top: 40px;
	}
</style>