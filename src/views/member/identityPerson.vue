<template>
	<div class="identity-wrap">
		<table class="identity">
			<tr>
				<th>真实姓名</th>
				<td>
					<input type="text" :class="{'error-border':error.realname}" v-model.trim="identity.realname">
					<div class="error-font">{{error.realname}}</div>
				</td>
			</tr>
			<tr>
				<th>身份证号码</th>
				<td>
					<input type="text" maxlength="18" :class="{'error-border':error.idcard}" v-model.trim="identity.idcard">
					<div class="error-font">{{error.idcard}}</div>
				</td>
			</tr>
			<tr>
				<th>行业</th>
				<td>
					<input type="text" :class="{'error-border':error.industry}" v-model.trim="identity.industry">
					<div class="error-font">{{error.industry}}</div>
				</td>
			</tr>
			<tr>
				<th>身份证正面</th>
				<td>
					<img :src="fileRoot + identity.cardimageup" class="thumb" v-show="identity.cardimageup" alt="">
					<input type="file" id="upImg1" accept="image/*" @change="uploadFile(1,$event)">
					<label for="upImg1" :class="{'error-border':error.cardimageup}">上传图片</label>
					<div class="error-font">{{error.cardimageup}}</div>
				</td>
			</tr>
			<tr>
				<th>身份证反面</th>
				<td>
					<img :src="fileRoot + identity.cardimagedn" class="thumb" v-show="identity.cardimagedn" alt="">
					<input type="file" id="upImg2" accept="image/*" @change="uploadFile(2,$event)">
					<label for="upImg2" :class="{'error-border':error.cardimagedn}">上传图片</label>
					<div class="error-font">{{error.cardimagedn}}</div>
				</td>
			</tr>
			<tr>
				<th></th>
				<td>
					<input type="checkbox" :class="{'error-border':error.agreement}" v-model="agreement">
					认证即代表您同意并遵守<router-link to='/agreement'>《真相号注册协议》</router-link>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<button type="button" class="back" @click="$router.back()">上一步</button>
					<button type="button" class="submit" @click="submit">提交</button>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
import fileService from '@/services/fileService'
import persionauthService from "@/services/persionauthService"
export default{
	data(){
		return {
			identity:{
				realname:'',
				idcard:'',
				industry:'',
				cardimageup:'',
				cardimagedn:''
			},
			fileRoot:window.urls.fileRoot +'/',
			agreement:false,
			error:{
				realname:'',
				idcard:'',
				industry:'',
				agreement:false
			}
		}
	},
	methods:{
		/**
		 * [uploadFile description]
		 * @param  {[type]} type 1：正面 ，2：反面
		 * @param  {[type]} e    [description]
		 * @return {[type]}      [description]
		 */
		uploadFile(type,e){
			let file = e.target.files[0];
			if (!file) { return; }
			if (!this.$Tool.checkPic(file.name)) {
		    	this.$message({
				  message:'格式错误',
				})
			    return;
			 }
			let param = new FormData(); //创建form对象
			param.append('file',file,file.name);//通过append向form对象添加数据
			fileService.uploadPic(param,(data)=>{
				if (type == 1) {
		          	this.identity.cardimageup = data.result.url;
				}else{
		          	this.identity.cardimagedn = data.result.url;
				}
			})
		},
		submit(){
			this.error = {};
			if (!this.agreement) {
				this.error.agreement = true;
				return;
			}
			if (!this.identity.realname || !this.$Tool.checkInput(this.identity.realname)) {
				this.error.realname = '输入有误';
				return;
			}
			if (!this.identity.idcard || this.identity.idcard.length != 18) {
				this.error.idcard = '号码有误';
				return;
			}
			if (!this.identity.industry || !this.$Tool.checkInput(this.identity.industry)) {
				this.error.industry = '输入有误';
				return;
			}
			if (!this.identity.cardimageup) {
				this.error.cardimageup = '请上传身份证人像面图片';
				return;
			}
			if (!this.identity.cardimagedn) {
				this.error.cardimagedn = '请上传身份证国徽图片';
				return;
			}
			let res = persionauthService.submitAuth(localStorage.token,localStorage.id,this.identity);
			if (res && res.status == 'success') {
				this.$message({
				  message:'申请已提交，正在审核中',
				})
			}

		}
	}
}
</script>

<style lang="less" scoped>
	.identity-wrap{
		background: @bgColor;
		padding-top: 50px;
		height: 100vh;
	}
	.identity{
		// display: block;设置单元格宽度不好使
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		background: #fff;
		border: 20px solid #fff;
		tr{
		    height: 60px;
		}
		th{
			width: 20%;
		}
		input[type=text]{
			border: 1px solid #ccc;
			border-radius: 10px;
			padding: 8px 10px;
		}
		input[type=checkbox]{
			width: 15px;
			height: 15px;
			border-radius: 50%;
			border: 1px solid #ccc;
			background:@bgColor;
			margin-right: 10px;
		    vertical-align: sub;
		}
		input[type=checkbox]:checked{
			background: @thinMainColor;
		}
		input[type=file]{
			display: none;
		}
		button {
		    padding: 10px;
		    margin-right: 20px;
		    width: 130px;
		    margin-left: 15%;
		    color: #fff;
		    cursor: pointer;
		    border-radius: 6px;
		    transition: all .3s cubic-bezier(.645,.045,.355,1);
		}
		button:hover{
		    background: @deepMainColor;
		    color: #fff;
		}
		.back{
			border: 1px solid @mainColor;
			color: @mainColor;
		}
		.submit{
		    background: @mainColor;
		}
		a{
			color: #406599;
		}
		label{
			display: inline-block;
			padding: 10px 30px;
			background-color: #f1f1f1;
		    color: #a4a4a4;
		    border-radius: 8px;
		    cursor: pointer;
		}
		.thumb{
			width: 200px;
			border-radius: 8px;
			margin: 10px 10px 10px 0;
		}
		.error-border{
			border-color:@errColor !important;
		    box-shadow: 0 0 4px 0px @errColor;
		}
		.error-font{
			color: @errColor;
		}
	}
</style>