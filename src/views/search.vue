<template>
	<div class="container">
		<div class="wrapper">
			<header class="top ac">
				<strong class="logo"><router-link to='/index'>直击真相</router-link></strong>
				<input type="text" class="search-input" v-model.trim="keyword" placeholder="直击真相">
				<button type="button" class="search-button cp" @click="search">搜索</button>
			</header>
			<div class="main">
				<ul class="search-result">
					<li class="search-li bfc-o" v-for="(item,index) in searchResult" :key="index" @click="goDetail(item.id)">
						<img :src="item.image" v-if="item.image" class="thumb fl">
						<h1 class="title oe" v-html="item.title"></h1>
						<div>
							<img :src="item.header" class="user-photo">
							<span class="info">{{item.publisher}}</span> •
							<span class="info">{{item.commentNum}}评论</span> •
							<span class="info">{{item.publishtime}}</span>
						</div>
					</li>
					<li class="tip ac" @click="_search">{{resultTip}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import config from '@/assets/configs/config'
import searchService from '@/services/searchService'
import articleService from '@/services/articleService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
import userService from '@/services/userService'
export default {
	data () {
		return {
			keyword:'',
			_keyword:'',
			searchResult:[],
			pageSize:1,
			// lock:false,
			isLoad:false,
			resultTip:'',
			fileRoot:config.fileRoot+'/',
		}
	},
	mounted(){
		this.keyword = this.$route.query.keyword;
		this.search();
	},
	methods:{
		search(){
			if (!this.keyword) {return;}
			if (!this.$Tool.checkInput(this.keyword)) {
				this.keyword = this.$Tool.replaceNo(this.keyword);
				this.$message({
		          message: '搜索内容不合法，已为您删除，请确认！',
		          center: true
		        });
				return;
			}
			this._keyword = this.keyword;
			// this.ifMatch = false;
			this.searchResult = [];
			this.pageSize = 1;
			searchService.addSearchRecord(this.keyword);
			// if (!this.historyKeywords.includes(this.keyword)) {
			// 	this.historyKeywords.unshift(this.keyword);
			// }
			// let temp = JSON.stringify(this.historyKeywords);
			// localStorage.setItem("keyword",temp);
			this._search();
		},
		_search(){
			this.isLoad = true;
			// this.lock = true;
			let resSearch = articleService.searchArticlePage(this.pageSize,15,this._keyword);
			if (resSearch && resSearch.status == "success") {
				let res = resSearch.recordPage.list,
					len = res.length,
					reg = new RegExp(this._keyword,'g');
				if (!len && this.searchResult.length) {
					this.resultTip = '已加载全部';
					return;
				}
				for (let i = 0; i < len; i++) {
					let temp = res[i];
					this.searchResult.push({
						title:temp.title.replace(reg,`<span class="highlight">${this._keyword}</span>`),// 获取文章标题
						id:temp.id// 获取文章id
					});
					// 获取封面图
					if (temp.type !== 3) {
						articleFileService.getFileByArticle(temp.id,data=>{
							if (data && data.status == "success" && data.result.filelist.length) {
								1 === temp.type ? this.$set(this.searchResult[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.searchResult[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
							}
						}) 					
					}else{
						// this.$set(this.searchResult[i],'image',this.$Tool.extractImg(temp.content,1)[0]);
						this.searchResult[i].image = this.$Tool.extractImg(temp.content,1)[0]
					}
					// console.log(this.searchResult[0].image )
					// 获取评论数量
					articleCommentService.getArticleCommentCount(temp.id,data=>{
						data && data.status == "success" && (this.searchResult[i].commentNum = this.$Tool.numConvertText(data.result.count));
					})
					// 获取发布时间
					this.searchResult[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
					// 获取用户头像&昵称
					userService.getUserById(temp.author,data=>{
						data && data.status == "success" && (
							this.$set(this.searchResult[i], 'publisher', data.result.user.username), 
							this.$set(this.searchResult[i], 'header', this.$Tool.headerImgFilter(data.result.user.imageurl))
							);
					});	
				}

				// this.searchResult = this.searchResult.concat(res.recordPage.list);
				this.isLoad = false;
				if (!this.searchResult.length) {
					this.resultTip = '暂无相关数据';
					return;
				}else{
					this.resultTip = '点击加载更多';
				}
				this.pageSize++;
				// this.lock = false;
				// !len && this.resultTip = '已加载全部';
			// console.log(this.keyword)
			// console.log(this.searchResult)
			}
		},
		/*loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this._search.call(this);
			}
		},*/
		/**
		 * 跳转详情页
		 * @param  Number id       当前文章id
		 */
		goDetail(id){
			this.$Tool.goPage({name:"listDetail",query:{id,}});
		}
	}
}
</script>

<style lang="less" scoped>
	.container{
		background: #f5f5f5;
		min-height: 1000px;
	}
	.wrapper{
		width: 1000px;
	}
	.top{
		padding-top: 40px;
		line-height: 40px;
		.search-input{
			border: 1px solid #f00;
			border-radius: 5px 0 0 5px;
			width: 60%;
			line-height: inherit;
			height: 40px;
			text-indent: 5px;
		}
		.search-button{
			// transform: translateX(-100%);
			line-height: inherit;
			background: #f00;
			color: #fff;
		    width: 80px;
		}
	}
	.logo{
		 margin-right: 10px;
		 font-size: 16px;
	}
	.main{
		width: 800px;
		margin: 50px auto;
		.thumb{
			width: 180px;
			height: 130px;
			margin-right: 20px;
		}
		.search-li {
		    padding: 15px 0;
		    border-bottom: 1px solid #ddd;
		}
		.title{
			margin: 10px 0;
		}
		.info{
			margin: 0 5px;
		}
		.user-photo{
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		.tip{
			padding: 15px 0;
		}
	}
</style>
<style>
	.highlight{
		color: red;
	}
</style>