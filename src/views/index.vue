<template>
  <div class="main">
	<div class="main-left bfc-d">
		<carousel indicator-position="outside" height="500px">
			<carousel-item v-for="(item,index) in slideList" :key="index" @click.native="goDetail(0,item.id)">
			  <img class="slide-img" :src="item.image" alt="">
			  <div class="slide-text">
				<h3 class="slide-title oe">{{item.title}}</h3>
				  <div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
					<div class="article-info fr">
						<i class="iconfont icon-read">{{item.readNum}}</i>
						<i class="iconfont icon-xiaoxi">{{item.commentNum}}</i>
					</div>
				  </div>
			  </div>
			</carousel-item>
		</carousel>
		<ul class="part-left bfc-d">
			<h4 class="part-name1">揭秘</h4>
			<li class="part-li" v-for="(item,index) in jmList" :key="index" @click="goDetail(1,item.id)">
				<img :src="item.image" class="thumb1" alt="">
				<div class="article-wrap">
				<h3 class="slide-title oe">{{item.title}}</h3>
				  <div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
					<div class="article-info fr">
						<i class="iconfont icon-read">{{item.readNum}}</i>
						<i class="iconfont icon-xiaoxi">{{item.commentNum}}</i>
					</div>
				  </div>
			  </div>
			</li>
		</ul>
		<ul class="part-mid fr">
			<h4 class="part-name2">
				<span>防骗</span>
			</h4>
			<li class="part-li2" v-for="(item,index) in fpList" :key="index" @click="goDetail(2,item.id)">
				<img :src="item.image" class="thumb2" alt="">
				<div class="article-wrap">
				<h3 class="article-title oe">{{item.title}}</h3>
				  <div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
				  </div>
			  </div>
			</li>
		</ul>
	</div>
	<div class="main-right fr">
		<h4 class="part-name3">
			打假
			<i class="iconfont icon-arrow-down"></i>
		</h4>
		<ul class="part-right">
			<li class="part-li2" v-for="(item,index) in djList" :key="index" @click="goDetail(3,item.id)">
				<img :src="item.image" class="thumb2" alt="">
				<div class="article-wrap">
				<h3 class="article-title oe">{{item.title}}</h3>
				  <div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
				  </div>
			  </div>
			</li>
		</ul>
		<h4 class="part-name3 ac">
			寻亲
			<i class="iconfont icon-arrow-down"></i>
		</h4>
		<ul class="part-right">
			<li class="part-li3" v-for="(item,index) in xqList" :key="index" @click="goDetail(4,item.id)">
				<div class="article">
					<img :src="item.header" class="user-photo" alt="">
					<span class="article-publish oe">{{item.publisher}}</span>
					<!-- <span class="article-publish">{{item.publishtime}}</span> -->
				</div>
				<h3 class="article-title oe">{{item.title}}</h3>
				<P class="article-desc">
					{{item.desc}}
				</P>
				<div class="article-info">
					<i class="iconfont icon-read">{{item.readNum}}</i>
						<i class="iconfont icon-xiaoxi">{{item.commentNum}}</i>
				</div>
			</li>
		</ul>
	</div>
	<h4 class="part-name2 cb"><span>生活</span></h4>
	<div class="main-bottom">
		<ul class="part-bottom">
			<img :src="pfList[0].image" alt="" class="thumb">
			<li class="part-li" v-for="(item,index) in pfList" :key="index" @click="goDetail(5,item.id)">
				<h2 class="article-desc oe">
					{{item.title}}
				</h2>
				<div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
				</div>
			</li>
		</ul>
		<ul class="part-bottom">
			<img :src="dgList[0].image" alt="" class="thumb">
			<li class="part-li" v-for="(item,index) in dgList" :key="index" @click="goDetail(6,item.id)">
				<h2 class="article-desc oe">
					{{item.title}}
				</h2>
				<div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
				</div>
			</li>
		</ul>
		<ul class="part-bottom">
			<img :src="gcwList[0].image" alt="" class="thumb">
			<li class="part-li" v-for="(item,index) in gcwList" :key="index" @click="goDetail(7,item.id)">
				<h2 class="article-desc oe">
					{{item.title}}
				</h2>
				<div class="article">
					<span class="article-publish oe">{{item.publisher}}</span>
					<span class="article-publish">{{item.publishtime}}</span>
				</div>
			</li>
		</ul>
	</div>
	<footer class="footer-wrap">
		<div class="wrapper ac">
			<ul class="footer">
				<li class="web-info">直击真相ICP备8888888</li>
				<li class="web-info">直击真相</li>
				<li class="web-info">网络经营文化许可</li>
			</ul>
			<ul class="footer">
				<li class="web-info">私人会所如果是</li>
				<li class="web-info">私人会所如果是</li>
				<li class="web-info">私人会所如果是</li>
				<li class="web-info">私人会所如果是</li>
				<li class="web-info">私人会所如果是</li>
				<li class="web-info">私人会所如果是</li>
			</ul>
			<nav class="friendly-link">
				<span>友情链接:</span>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
				<a href="" title="">直击真相</a>
			</nav>
		</div>
	</footer>
  </div>
</template>

<script>
import config from '@/assets/configs/config'
import articleService from '@/services/articleService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
import userService from '@/services/userService'
import readHistoryService from '@/services/readHistoryService'
export default {
  data () {
	return {
		slideList:[],
		jmList:[],
		fpList:[],
		djList:[],
		xqList:[],
		pfList:[{}],
		dgList:[{}],
		gcwList:[{}],
		fileRoot:config.fileRoot+'/',
	}
  },
  mounted(){
	this.init();
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

			}
		}
		// 获取揭秘
		let resJm = articleService.articlePage(1,5,1);
		if (resJm && resJm.status == "success") {
			let res = resJm.recordPage.list;
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
		let resFp = articleService.articlePage(1,7,2);
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
		let resXq = articleService.articlePage(1,5,4);
		if (resXq && resXq.status == "success") {
			let res = resXq.recordPage.list;
			for (let i = 0,len = res.length; i < len; i++){
				let temp = res[i];
				this.xqList.push({
					title:temp.title,// 获取文章标题
					id:temp.id// 获取文章id
				});
				//提取描述
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
				}
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

			}
		}
		// 获取普法
		let resPf = articleService.articlePage(1,5,5);
		if (resPf && resPf.status == "success") {
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
				// 获取发布时间
				this.pfList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
				userService.getUserById(temp.author,data=>{
					data && data.status == "success" && (this.pfList[i].publisher = data.result.user.username);
				});	

			}
		}
		// 获取打工
		let resDg = articleService.articlePage(1,5,6);
		if (resDg && resDg.status == "success") {
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
		this.$Tool.goPage({name:"listDetail",query:{classify,id,}});
	}
  }
}
</script>

<style lang="less" scoped>
	.main-left {
		width: 70%;
		margin-right: 5%;
	}
	.slide-img{
		height: 400px;
		width: 100%;
	}
	.slide-text{
		padding:10px 20px;
	}
	.slide-title{
		font-size: 24px;
		margin-bottom: 15px;
	}
	.article-publish{
		margin-right: 10px;
		max-width: 120px;
	}
	.icon-read{
		margin-right: 20px;
	}
	.icon-read:before,.icon-xiaoxi:before{
		margin-right: 4px;
	}
	h4{
		margin-bottom: 20px;
		font-size: 20px;
		line-height: 32px;
		color: #fff;
		text-align: center;
	}
	.article-wrap{
		box-shadow: 1px 1px 4px 1px #888;
		border-radius:0 0 10px;	
		padding:10px;	
	}
	.part-left{
		width: 60%;
		margin-right: 5%;
		.part-li{
			margin-bottom: 50px;
		}
		.thumb1{
			width: 100%;
			height: 220px;
		}
		.part-name1{
			width: 100px;
			line-height: 34px;
			background: linear-gradient(#f7ba14,#f98724);
			border-radius: 10px;
			box-shadow: 0 0 8px 2px #333;
			margin-bottom: 20px;
		}
	}
	.part-mid{
		width: 35%;
		.thumb2{
			width: 100%;
			height: 137px;
		}
		.article-wrap{
			box-shadow: 1px 1px 4px 0px #888;;
		}
	}
	.article-title{
		font-size: 16px;
		margin-bottom: 15px;
	}
	.part-name2{
		border-top: 2px solid #f00;
	}
	.part-name2 span {
		display: inline-block;
		width: 90px;
		background: #f00;
		box-shadow: 0px 1px 4px 0px #333;;
	}
	.part-li2{
		margin-bottom: 40px;
	}
	.main-right{
		width: 25%;
		border: 2px solid #f00;
		.part-right{
			margin: 0 5px;
		}
		.part-name3{
			line-height: 44px;
			background: #f00;
			position: relative;
		}
		.icon-arrow-down{
			position: absolute;
			bottom: -45%;
			left: 50%;
			transform: translateX(-50%;);
			font-size: 16px;
		}
		.article-wrap{
			.article-title{
				margin:0 0 15px;
			}
		}
		.article-title{
			margin: 15px 0;
		}
		.user-photo{
			width: 36px;
			height:36px;
			border-radius: 50%;
			margin-right: 10px;
		}
		.thumb2{
			width: 100%;
			height: 145px;
		}
		.part-li3{
			margin-bottom: 20px;
		}
	}
	.article-desc{
		margin-bottom: 10px;
	}
	.main-bottom{
		display: flex;
		justify-content: space-between;
		.part-bottom{
			display: inline-block;
			width: 32.5%;
		}
		.part-li{
			padding: 10px 0 15px;
			border-bottom: 1px solid #ddd;
		}	
		.thumb{
			width: 100%;
			height:200px;
		}	
	}
	.footer-wrap{
		position:absolute;
		background: #262626;
		padding: 50px 0;
		width: 100%;
		left: 0;
		color: #fff;
		.footer{
			margin: 10px 0;
		}
		.web-info{
			display:inline-block;
		}
		.friendly-link{
			padding: 15px 50px;
			background:#333;
			a,span{
				margin: 0 5px;
				color:#666;
			}
		}
		.web-info{
			padding: 0 5px;
		}
	}
</style>
<style>
	/*el-carousel 样式定制*/
	.el-carousel{
		margin-bottom: 30px;
	}
	.el-carousel__item{
		background: #262626;
		color: #fff;
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
