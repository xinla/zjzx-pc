<template>
	<div class="download ac">
		<img src="@/assets/images/downloadBg.png" alt=""><br>
		<img class="download-code" :src="downloadCode" alt=""><br>
		<button type="button" @click="showAndriod"><i class="iconfont icon-andriod"></i><span class="ai">Android</span>下载</button><br>
		<button type="button" @click="showIOS"><i class="iconfont icon-ios"></i><span class="ai">IOS</span>下载</button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			downloadCode:require('@/assets/images/downloadBg.png')
		}
	},
	methods:{
		showAndriod(){
			this.downloadCode = require('@/assets/images/logo-icon.png')
		},
		showIOS(){
			this.downloadCode = require('@/assets/images/downloadBg.png')
		}
	}
}
</script>

<style lang="less" scoped>
	.download{
	    background: linear-gradient(#fff 0px, #eee 500px,#fff 500px);
	    min-width: 1000px;
	}
	.download-code{
		margin-top: 20px;
		width: 120px;
		height: 120px;
	    border: 4px solid #EEE;
	}
	.iconfont,button{
		font-size: 20px;
	}
	button{
		line-height: 46px;
	    border-radius: 50px;
		margin-top: 20px;
		width: 190px;
		padding: 0 15px;
		color: #fff;
		font-weight: 600;
		background: @deepMainColor;
	}
	.ai{
		margin: 0 10px;
	}
</style>