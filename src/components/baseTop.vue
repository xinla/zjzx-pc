<template>
	<div>
		<div class="tf top-wrap">
			<div class="top">
				<div class="logo-wrap fl ac">
					<img class="logo" src="@/assets/images/logo-icon.png" alt="">
					<p>直击真相</p>				
				</div>
				<div class="top-mid">
					<p class="slogan">多一个人看到，少一个人受骗！</p>
					<ul class="nav-ul">
						<li class="nav-li ac" :class="{'current-nav':currentClassiftyName == '推荐'}">{{currentClassiftyName}}</li>
						<li class="nav-li ac" :class="{'current-nav':currentClassiftyName == item.classifyname}" v-for="(item,index) in navList">
							{{item.classifyname}}
						</li>
					</ul>
				</div>
				<div class="top-right fr ac">
					<div class="login">
						<router-link :to="{name:'login'}">登录</router-link>
					</div>
					<div class="search">
						<input type="text" class="search-input" placeholder="直击真相">
						<i class="iconfont icon-search"></i>
					</div>
				</div>
			</div>
		</div>
		<router-view class="wrapper main-view" />
	</div>
</template>

<script>
import articleClassifyService from '@/services/article_classifyService'
import searchService from '@/services/searchService'
export default {
	data () {
		return {
			navList:Object.freeze([
				{"classifyname":"揭秘","classifycode":1},
				{"classifyname":"防骗","classifycode":2},
				{"classifyname":"打假","classifycode":3},
				{"classifyname":"寻亲","classifycode":4},
				{"classifyname":"普法","classifycode":5},
				{"classifyname":"打工","classifycode":6},
				{"classifyname":"广场舞","classifycode":7}
			]),
			keywords:[],
			classifyIndex:0,
			currentClassiftyName:"推荐",
		}
	},
	mounted () {
	    this.$nextTick(()=>{
	      // 获取栏目分类
	      if(!localStorage.classify) {
	        articleClassifyService.getArticleClassifyList((data)=>{
	          if(data && data.status == "success") {
	            this.navList = Object.freeze(data.result.classfyList);
	            localStorage.classify = JSON.stringify(this.navList);
	          }
	        });
	      }else{
	        this.navList = Object.freeze(JSON.parse(localStorage.classify));
	      }
	      //获取最热关键字
	      searchService.getHotKeyword(data=>{
				if (data && data.status == "success") {
					this.keywords = data.recordList;
				}
			});
	    });
    },
}
</script>

<style lang="less" scoped>
@import url(../assets/styles/base.less);
  .top-wrap{
    height: 100px;
    background:#262626;
  }
  .top{
  	width: 1180px;
  	margin:0 auto;
    color: #fff;
  }
  .main-view{
  	width: 1180px;
  	margin: 135px auto 0;
  }
  .logo-wrap {
    height: 120px;
    width: 120px;
    background: linear-gradient(#fe0000,#e30b0c);
    font-size: 24px;
    border-radius: 0 0 10px 10px;
}
  .logo{
  	margin:20px 0 5px;
  	width: 50px;
  }
  .top-mid {
    display: inline-block;
    margin: 38px 0 0 30px;
    width: 70%;
    line-height: 30px;
}
.slogan{
	text-indent: 20px;
	color: #ddd;
}
.nav-ul {
	display: inline-block;
    border-top: 2px solid #696969;
    padding-right: 80px;
}
.nav-li {
    display: inline-block;
    width: 60px;
    margin-top: -2px;
}
.current-nav{
	border-top: 2px solid #fe0000;
}
.top-right{
}
.search{
	width: 200px;
	height: 22px;
	border-radius: 10px;
	background: #fff;
}
.icon-search{
	color: #666;
	vertical-align: sub;
}
.login{
	margin-top:38px;
	line-height: 30px;
}
.search-input{
	width: 80%;
}
</style>