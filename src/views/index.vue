<template>
  <div class="main">
    <div class="main-left bfc-d">
    	<carousel indicator-position="outside" height="500px">
		    <carousel-item v-for="(item,index) in slideList" >
		      <img class="slide-img" :src="item.image" alt="">
		      <div class="slide-text">
		      	<h3 class="slide-title oe">{{item.title}}</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">{{item.publisher}}</span>
	  		      	<span class="article-publish">{{item.publishtime}}</span>
	  		      	<div class="article-info fr">
	  		      		<i class="iconfont icon-read">{{item.commentNum}}</i>
	  		      		<i class="iconfont icon-xiaoxi">{{item.commentNum}}</i>
	  		      	</div>
	  		      </div>
	  		  </div>
		    </carousel-item>
		</carousel>
		<ul class="part-left bfc-d">
			<h4 class="part-name1">揭秘</h4>
			<li class="part-li">
				<img src='@/assets/images/login-bg.jpg' class="thumb1" alt="">
				<div class="article-wrap">
		      	<h3 class="slide-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      	<div class="article-info fr">
	  		      		<i class="iconfont icon-read">5W</i>
	  		      		<i class="iconfont icon-xiaoxi">56456</i>
	  		      	</div>
	  		      </div>
	  		  </div>
			</li>
			<li class="part-li">
				<img src='@/assets/images/login-bg.jpg' class="thumb1" alt="">
				<div class="article-wrap">
		      	<h3 class="slide-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      	<div class="article-info fr">
	  		      		<i class="iconfont icon-read">5W</i>
	  		      		<i class="iconfont icon-xiaoxi">56456</i>
	  		      	</div>
	  		      </div>
	  		  </div>
			</li>
		</ul>
		<ul class="part-mid fr">
			<h4 class="part-name2">
				<span>打假</span>
			</h4>
			<li class="part-li2">
				<img src='@/assets/images/login-bg.jpg' class="thumb2" alt="">
				<div class="article-wrap">
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      </div>
	  		  </div>
			</li>
			<li class="part-li2">
				<img src='@/assets/images/login-bg.jpg' class="thumb2" alt="">
				<div class="article-wrap">
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      </div>
	  		  </div>
			</li>
		</ul>
    </div>
    <div class="main-right fr">
		<h4 class="part-name3">
    		第一现场
    		<i class="iconfont icon-arrow-down"></i>
    	</h4>
    	<ul class="part-right">
    		<li class="part-li2">
				<img src='@/assets/images/login-bg.jpg' class="thumb2" alt="">
				<div class="article-wrap">
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      </div>
	  		  </div>
			</li>
			<li class="part-li2">
				<img src='@/assets/images/login-bg.jpg' class="thumb2" alt="">
				<div class="article-wrap">
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
	  		      <div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
	  		      	<span class="article-publish">19:30</span>
	  		      </div>
	  		  </div>
			</li>
    	</ul>
    	<h4 class="part-name3 ac">
    		第一现场
    		<i class="iconfont icon-arrow-down"></i>
    	</h4>
    	<ul class="part-right">
    		<li class="part-li2">
	  		    <div class="article">
	  		    	<img src="@/assets/images/login-bg.jpg" class="user-photo" alt="">
	  		    	<span class="article-publish">央视网</span>
	  		    	<span class="article-publish">11-21 19:30</span>
	  		    </div>
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
		      	<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article-info">
  		      		<i class="iconfont icon-read">5W</i>
  		      		<i class="iconfont icon-xiaoxi">56456</i>
  		      	</div>
			</li>
			<li class="part-li2">
	  		    <div class="article">
	  		    	<img src="@/assets/images/login-bg.jpg" class="user-photo" alt="">
	  		    	<span class="article-publish">央视网</span>
	  		    	<span class="article-publish">11-21 19:30</span>
	  		    </div>
		      	<h3 class="article-title oe">按施工法偶尔我发好饿我if阿尔我i</h3>
		      	<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article-info">
  		      		<i class="iconfont icon-read">5W</i>
  		      		<i class="iconfont icon-xiaoxi">56456</i>
  		      	</div>
			</li>
    	</ul>
    </div>
	<h4 class="part-name2"><span>哈哈</span></h4>
    <div class="main-bottom">
    	<ul class="part-bottom">
    		<img src="@/assets/images/login-bg.jpg" alt="" class="thumb">
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
    	</ul>
    	<ul class="part-bottom">
    		<img src="@/assets/images/login-bg.jpg" alt="" class="thumb">
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
    	</ul>
    	<ul class="part-bottom">
    		<img src="@/assets/images/login-bg.jpg" alt="" class="thumb">
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
			<li class="part-li">
				<P class="article-desc">
		      		按施工法偶尔我发好饿我if阿尔我i按施工法偶尔我发好饿我if阿尔我i
		      	</P>
		      	<div class="article">
	  		      	<span class="article-publish">央视网</span>
	  		      	<span class="article-publish">11-21</span>
  		      	</div>
			</li>
    	</ul>
    </div>
    <div class="footer-wrap">
    	<div class="wrapper ac">
    		<ul class="footer">
    			<li class="web-info">私人会所如果是</li>
    			<li class="web-info">私人会所如果是</li>
    			<li class="web-info">私人会所如果是</li>
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
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    			<a href="" title="">baidu</a>
    		</nav>
    	</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import config from '@/assets/configs/config'
import articleService from '@/services/articleService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
import userService from '@/services/userService'
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
  	return {
		// slideList:[require('@/assets/images/login-bg.jpg'),require('@/assets/images/99.jpg'),require('@/assets/images/100.jpg')],
		slideList:[
		],
		jmList:[],
		fpList:[],
		djList:[],
		xqList:[],
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
  				this.slideList.push({});
  				let temp = res[i];
  				// 获取标题
  				this.slideList[i].title = temp.title;
  				// 获取封面图
  				if (temp.type !== 3) {
	  				articleFileService.getFileByArticle(temp.id,data=>{
	  					if (data && data.status == "success") {
	  						(1 === temp.type && data.result.filelist.length) ? this.$set(this.slideList[i],'image',this.fileRoot + data.result.filelist[0].url) : this.$set(this.slideList[i],'image',this.fileRoot + data.result.filelist[0].thumbnail)
	  						// (1 === temp.type && data.result.filelist.length) ? this.slideList[i].image = this.fileRoot + data.result.filelist[0].url : this.slideList[i].image = this.fileRoot + data.result.filelist[0].thumbnail;
	  					}
	  				}) 					
  				}else{
  					// this.$set(this.slideList[i],'image',this.$Tool.extractImg(temp.content,1))
  					this.slideList[i].image = this.$Tool.extractImg(temp.content,1)
  				}
  				// 获取评论数量
  				articleCommentService.getArticleCommentCount(temp.id,data=>{
  					data && data.status == "success" && (this.slideList[i].commentNum = this.$Tool.numConvertText(data.result.count));
  				})
  				// 获取发布时间
  				// this.$set(this.slideList[i],'publishtime',this.$Tool.publishTimeFormat(temp.publishtime))
  				this.slideList[i].publishtime = this.$Tool.publishTimeFormat(temp.publishtime);
  				userService.getUserById(temp.author,data=>{
  					data && data.status == "success" && (this.slideList[i].publisher = data.result.user.username);
				});	

  			}
  			console.log(this.slideList)
  		}
  		// 获取揭秘
  		/*let res1 = articleService.articlePage(1,5,1);
  		if (res1 && res1.status == "success") {
  			this.jmList = res1.recordPage.list;
  		}
  		// 获取防骗
  		let res2 = articleService.articlePage(1,5,2);
  		if (res2 && res2.status == "success") {
  			this.fpList = res2.recordPage.list;
  		}
  		// 获取打假
  		let res3 = articleService.articlePage(1,5,3);
  		if (res3 && res3.status == "success") {
  			this.djList = res3.recordPage.list;
  		}
  		// 获取寻亲
  		let res4 = articleService.articlePage(1,5,4);
  		if (res4 && res4.status == "success") {
  			this.xqList = res4.recordPage.list;
  		}*/
  	}
  }
}
</script>

<style lang="less">
*{
	.main-left {
		width: 70%;
		margin-right: 5%;
	}
	.slide-img{
		height: 400px;
		width: 100%;
	}
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
	.slide-text{
	    padding:10px 20px;
	}
	.slide-title{
	    font-size: 24px;
	    margin-bottom: 15px;
	}
	.article-publish{
		margin-right: 10px;
	}
	.icon-read{
	    margin-right: 20px;
	}
	.icon-read:before,.icon-xiaoxi:before{
		margin-right: 4px;
	}
	
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
			margin-bottom: 60px;
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
			height: 120px;
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
		.article-title{
			margin: 15px 0;
		}
		.user-photo{
			width: 36px;
			height:36px;
			border-radius: 50%;
			margin-right: 10px;
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
	}
</style>
