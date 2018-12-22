<template>
	<div>
		<header class="tf top-wrap">
			<div class="top">
				<div class="logo-wrap fl ac">
					<router-link :to="{name:'index'}" @click.native="currentClassiftyName = '推荐'">
						<img class="logo" src="@/assets/images/logo-icon.png" alt="直击真相">
						<h1>直击真相</h1>
					</router-link>				
				</div>
				<div class="top-mid">
					<h1 class="slogan">多一个人看到，少一个人受骗！</h1>
					<nav class="nav-ul">
						<router-link :to="{name:'listDetail',query:{classify:0}}" class="nav-li ac" :class="{'current-nav':currentClassiftyName == '推荐'}" @click.native="currentClassiftyName = '推荐'">推荐</router-link>
						<router-link :to="{name:'listDetail',query:{classify:item.classifycode}}" class="nav-li ac" :class="{'current-nav':currentClassiftyName == item.classifyname}" v-for="(item,index) in navList" :key="index" @click.native="currentClassiftyName = item.classifyname">
							{{item.classifyname}}
						</router-link>
					</nav>
				</div>
				<div class="top-right fr ac">
					<div class="login" v-if="!isLogin">
						<router-link :to="{name:'login'}">登录</router-link>
					</div>
					<div class="member" v-else>
						<router-link :to="{name:'userCenter'}">
							<img :src="userPhoto" class="user-photo">{{userName}}
						</router-link>
					</div>
					<div class="search">
						<input type="text" class="search-input" v-model.trim="keyword" placeholder="直击真相">
						<i class="iconfont icon-search" @click="search"></i>
					</div>
				</div>
			</div>
		</header>
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
				{"classifyname":"娱乐","classifycode":7}
			]),
			hotKeywords:[],
			classifyIndex:0,
			currentClassiftyName:"推荐",
			keyword:'',
			isLogin:false,
			userName: '用户名',
			userPhoto:"",
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
	      // 判断用户是否登录
	      if (!localStorage.getItem('token')) {
	        this.isLogin = false;
	      }else{
		      this.userPhoto = localStorage.userImg;
		      this.userName = localStorage.userName;
		      this.isLogin = true;	      	
	      }
	      //获取最热关键字
	      searchService.getHotKeyword(data=>{
				if (data && data.status == "success") {
					this.hotKeywords = data.recordList;
				}
			});
	    });
    },
    methods:{
    	search(){
    		this.keyword && this.$Tool.goPage({name:'search',query:{keyword:this.keyword}})
    	}
    }
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
  	// display: block;
  	margin:20px auto 5px;
  	width: 50px;
  }
  .top-mid {
    display: inline-block;
    margin: 38px 0 0 30px;
    width: 70%;
    line-height: 30px;
	}
	.slogan{
		font-weight: 400;
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
	.member{
		margin: 15px;
	}
	.search-input{
		width: 80%;
	}
	.user-photo{
		width: 36px;
		height: 36px;
		margin-right: 10px;
		border-radius:50%;
	}
</style>