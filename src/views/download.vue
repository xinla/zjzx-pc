<template>
	<div class="download ac">
		<img src="@/assets/images/downloadBg.png" alt=""><br>
		<img class="download-code" src="@/assets/images/logo.png" alt=""><br>
		<a class="download-link" href="http://download.zjzx.xyz/download.html"><i class="iconfont icon-andriod"></i><span class="ai">Android</span>下载</a><br>
		<a class="download-link" href="https://itunes.apple.com/cn/app/%E7%9B%B4%E5%87%BB%E7%9C%9F%E7%9B%B8/id1450056517?mt=8"><i class="iconfont icon-ios"></i><span class="ai">IOS</span>下载</a>
	</div>
</template>

<script>
export default {
	/*data () {
		return {
			downloadCode:require('@/assets/images/logo-icon.png')
		}
	},*/
  mounted() {
    let ua = navigator.userAgent;
    if (ua.indexOf('Android') > -1) {
      // TODO:待放置应用宝下载地址
      location.href = 'https://mobile.baidu.com/item?docid=25512436&f0=search_searchContent%400_appBaseNormal%400'
      return
    }
    if (ua.indexOf('iPhone') > -1) {
      location.href = 'https://itunes.apple.com/cn/app/%E7%9B%B4%E5%87%BB%E7%9C%9F%E7%9B%B8/id1450056517?mt=8'
      return
    }
  },
	/*methods:{
		showAndriod(){
			this.downloadCode = require('@/assets/images/logo-icon.png')
		},
		showIOS(){
			this.downloadCode = require('@/assets/images/downloadBg.png')
		}
	}*/
}
</script>

<style lang="less" scoped>
	.main-view{
        max-width: none;
        width: auto;
    }
	.download{
	    background: linear-gradient(#fff 0px, #eee 500px,#fff 500px);
	    min-width: 1000px;
	}
	.download-code{
		margin-top: 20px;
		width: 100px;
		height: 100px;
	    // border: 4px solid #EEE;
	}
	.iconfont{
		font-size: 20px;
	}
	.download-link{
		display: inline-block;
		line-height: 46px;
	    border-radius: 50px;
		margin-top: 20px;
		padding: 0 15px;
		font-size: 20px;
		width: 190px;
		color: #fff;
		font-weight: 600;
		background: @deepMainColor;
	}
	.ai{
		margin: 0 10px;
	}
</style>