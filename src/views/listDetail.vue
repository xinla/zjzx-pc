<template>
    <div class="main">
	    <div class="left fl" @scroll="loadMore">
	   		<mit v-for="(item,index) in arcList" :article="item" :key="index"></mit>  
	   		<div>loading</div> 
	    </div> 
	    <div class="right fr">
			<arcDetail></arcDetail>
	    </div>    
    </div>
</template>

<script>
import mit from '@/components/multiImgText'
import arcDetail from '@/views/detail'
import articleService from '@/services/articleService'
export default {
	components:{
		mit,
		arcDetail,
	},
	data () {
		return {
			classify:0,
			arcList:[],
			page:1,
			lock:false,
			ifLoad:false,
			scrollTop:0,	
			total:0,
			ifNew:false,
			ifNet:false,
			ifLoading:true,
			tip:"正在加载",	
			timeId:0,
		}
	},
	mounted () {
		this.$nextTick(()=>{
			this.init();
		})
	},
	methods:{
		init(){
			this.page = 1;
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = resArticlePage.recordPage.list;	
						// debugger
					if (this.total == resArticlePage.recordPage.totalRow) {
						this.ifNew = true;
					}else{
						this.total = resArticlePage.recordPage.totalRow;
						this.ifNew = false;	
					}
					this.page++;						
					// console.log(this.arcList);
				}				
			}finally{	
				// this.lock = false;
				// this.ifLoad = false;	
						
			}
		},
		doRefresh(){
			this.init();
			if (this.ifNew) {
				// this.$vux.toast.show({
				// 	type:"text",
				// 	time:800,
				// 	text:"已经是最新内容了",
				// 	width:"50%",
				// });				
			}
		},		
		loadMore(e){
			this.throttle(this._loadMore,this,e);
		},
		//函数节流控制
		throttle(method,context,arg) {
			let cur = +new Date();
			if (cur - (method.last || 0) > 20) {
				method.call(context,arg);
				method.last = cur;
			}
		},
		_loadMore(e){			
			//防止用户滚动中点击跳转
			// if (!this.isScolling) {
			// 	this.$store.dispatch('setIsScolling',true);
			// }
			this.scrollTop = $(e.target).scrollTop();	
			// console.log(this.scrollTop)	
			// 滚动结束200ms后解禁滚动状态
			clearTimeout(this.timeId);
			this.timeId = setTimeout(()=>{
				if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 10) >= e.target.scrollHeight) {
					this.getMoreActicle();
				}
				// this.$store.dispatch('setIsScolling',false);
			},200)	
		},
		getMoreActicle(){
			this.lock = true;
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
					if (resArticlePage.recordPage.list.length) {
						this.page++;						
					}else{
						this.ifLoading = false;
						this.tip = "你看到我的底线啦";
					}
					// console.log(this.arcList);
				}		
			}finally{
				this.lock = false;
			}
		},
	}
}
</script>
<style lang="less">
	.left,.right{
		height: calc( 100vh - 50px );		
		border: 1px solid #ddd;
		overflow: auto;
	}
	.left{
		width: 32%;
		margin-right: 1%;
	}
	.right{
		width: 67%;
	}
</style>

