<template>
	<div>
		<div class="tf top-wrap ac">
			<div class="top">
				<div class="logo-wrap fl">
					<img class="logo" src="@/assets/images/logo-icon.png" alt="">
					直击真相
				</div>
				<div class="nav-wrap">
					多一个人看到，少一个人受骗
					<ul>
						<li v-for="(item,index) in navList">
							{{item.classifyname}}
						</li>
					</ul>
				</div>
				<div class="fr">
					<div>
						<span>登录</span>
						<span>注册</span>
					</div>
					<div class="">
						<input type="text">
						<i class="iconfont icon-search"></i>
					</div>
				</div>
			</div>
		</div>
		<router-view class="wrapper main-view bfc-o" />
	</div>
</template>

<script>
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
			classifyIndex:0,
			currentClassiftyName:"推荐",
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
  }
  .main-view{
  	position: relative;
  	width: 1180px;
  	margin: 100px auto 0;
  }
  .logo-wrap {
    height: 120px;
    width: 120px;
    background: #f60403;
    color: #fff;
    font-size: 24px;
}
  .logo{

  }
  .nav-wrap{
  	display: inline-block;
  	width: 70%;
  }
</style>