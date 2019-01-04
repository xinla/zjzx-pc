<template>
	<div class="identity-wrap">
		<table class="identity">
			<tr>
				<th>用户名称:</th>
				<td>
					<input type="text" :class="{'error-border':error.username}" v-model.trim="identity.username" :placeholder="identity.username
" maxlength="25" disabled>
					<p class="tip">
						请使用体现企业特性的用户名称申请认证。不合规用户名称无法通过审核<br>
						可到个人中心修改。认证完成后无法再免费修改！<br>
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>认证信息:</th>
				<td>
					<input type="text" :class="{'error-border':error.authmsg}" v-model.trim="identity.authmsg" @blur="checkAuthms('authmsg')" placeholder="请输入认证信息
" maxlength="25">
					<div class="error-font">{{error.authmsg}}</div>
					<p class="tip">
						认证信息最多25个字，提交后不能修改。<br>
		正确示例：北京xx公司官方帐号/海底火锅小助手/前后2000万拍照更清晰<br>
		不能使用修饰性质词汇、不能包含联系方式与推广信息。<br>
		体现商标、品牌、网站、手机应用等需提供对应资质。<br>
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>企业名称:</th>
				<td>
					<input type="text" :class="{'error-border':error.companyname}" v-model.trim="identity.companyname" @blur="checkAuthms('companyname')" placeholder="请输入企业名称">
					<div class="error-font">{{error.companyname}}</div>
					<p class="tip">
						需与中国大陆工商局或市场监督管理局颁发营业执照上的企业名称完全一致。该名称将作为企业认证审核服务费的发票抬头。
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>信用代码:</th>
				<td>
					<input type="text" :class="{'error-border':error.creditcode}" v-model.trim="identity.creditcode" @blur="checkAuthms('creditcode')" placeholder="请输入信用代码" maxlength="18">
					<div class="error-font">{{error.creditcode}}</div>
					<p class="tip">
						请输入营业执照所示18位统一社会信用代码。<br>
信用代码将用于开票，填写错误发票无法退换。
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>行业分类:</th>
				<td>
					<input type="text" :class="{'error-border':error.industrytype}" v-model.trim="identity.industry">
					<div class="error-font">{{error.industry}}</div>
				</td>
			</tr>
			
			<tr>
				<th><code>*</code>营业执照:</th>
				<td>
					<img :src="fileRoot + identity.companylicence" class="thumb" v-show="identity.companylicence" alt="">
					<label class="label-file" :class="{'error-border':error.companylicence}">
						<input type="file" accept="image/*" @change="uploadFile($event,'companylicence')">
						上传图片
					</label>
					<div class="error-font">{{error.companylicence}}</div>
					<p class="tip">
						请上传最新营业执照正面照。资质信息无残缺。<a href="/companyinfo_template.jpeg">查看示例</a>
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>认证公函:</th>
				<td>
					<img :src="fileRoot + identity.missiveauth" class="thumb" v-show="identity.missiveauth" alt="">
					<label class="label-file" :class="{'error-border':error.missiveauth}">
							<input type="file" accept="image/*" @change="uploadFile($event,'missiveauth')">
						上传图片
					</label>
					<div class="error-font">{{error.missiveauth}}</div>
					<p class="tip">
						下载填写<a href="/头条认证公函.docx">《企业认证申请公函》</a>，并加盖公章。上传清晰无残缺加盖公章的公函扫描件。<a href="/2018_toutiao_renzheng_gonghan.jpeg">查看示例</a>
					</p>
				</td>
			</tr>
			<tr>
				<th>其他资质:</th>
				<td>
					<img :src="fileRoot + identity.otheraptitude" class="thumb" v-show="identity.otheraptitude" alt="">
					<label class="label-file" :class="{'error-border':error.otheraptitude}">
						<input type="file" accept="image/*" @change="uploadFile($event,'otheraptitude')">
						上传图片
					</label>
					<div class="error-font">{{error.otheraptitude}}</div>
					<p class="tip">
						用户名称、认证信息需体现特定内容，请提供对应资质。<br>
例如：网站需提供ICP备案查询截图、商标需提供商标注册证、手机应用需提供软件著作权证、游戏需提供版号、其他品牌授权文件等。
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>运营者姓名:</th>
				<td>
					<input type="text" :class="{'error-border':error.corporatename}" v-model.trim="identity.corporatename" @blur="checkAuthms('corporatename')" placeholder="请输入运营者姓名">
					<div class="error-font">{{error.corporatename}}</div>
					<p class="tip">
请填写《企业认证申请公函》上的运营者。
					</p>
				</td>
			</tr>
			<tr>
				<th><code>*</code>运营者手机号码:</th>
				<td>
					<input type="text" :class="{'error-border':error.corporatemobile}" v-model.trim="identity.corporatemobile" @blur="checkAuthms('corporatemobile')" placeholder="请输入运营者手机号码">
					<div class="error-font">{{error.corporatemobile}}</div>
					<p class="tip">
请填写运营者手机号码。认证审核过程中，将与该手机号码联系核实。
					</p>
				</td>
			</tr>
			<tr>
				<th>运营者电子邮箱:</th>
				<td>
					<input type="text" :class="{'error-border':error.corporateemail}" v-model.trim="identity.corporateemail" @blur="checkAuthms('corporateemail')" placeholder="请输入运营者电子邮箱">
					<div class="error-font">{{error.corporateemail}}</div>
				</td>
			</tr>
			<tr>
				<th>是否要发票:</th>
				<td>
					<label class="label-radio">
						<input type="radio" id='ynbill' :value="true" v-model="identity.ynbill">索要发票
					</label>
					<label class="label-radio">
						<input type="radio" id='ynbill' :value="false" v-model="identity.ynbill">放弃发票
					</label>
					<p class="tip">
企业认证审核服务费可开具票面内容为【技术服务费】的增值税普通发票（电子票）。 缴费之日起30个工作日开具。
					</p>
				</td>
			</tr>
			<tr v-if='identity.ynbill'>
				<th><code>*</code>发票接收电子邮箱:</th>
				<td>
					<input type="text" :class="{'error-border':error.corporateemail}" v-model.trim="identity.corporateemail" @blur="checkAuthms('corporateemail')" placeholder="请输入运营者电子邮箱">
					<div class="error-font">{{error.corporateemail}}</div>
					<p class="tip">
请填写用于接收发票的电子邮箱。
					</p>
				</td>
			</tr>
			<!-- <tr>
				<th>邀请码:</th>
				<td>
					<input type="text" :class="{'error-border':error.invitecode}" v-model.trim="identity.invitecode">
					<div class="error-font">{{error.invitecode}}</div>
				</td>
			</tr> -->
			<tr>
				<th></th>
				<td>
					<input type="checkbox" :class="{'error-border':error.agreement}" v-model="agreement">
					认证即代表您同意<router-link to='/'>《真相号注册协议》</router-link>
					<p class="tip">提交认证申请前请阅读<router-link to='/'>《企业认证协议》</router-link>及<router-link to='/'>《头条企业认证审核标准》</router-link>，提交后即默认您遵守行业准入规则，禁入行业或虚假资质申请认证无法退还审核服务费。<br>
					如有企业认证相关的疑问或产品问题请将头条号/用户名、申请认证的公司名称、截图发送至renzheng@bytedance.com，一个工作日反馈。</p>
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
import config from '@/assets/configs/config'
import fileService from '@/services/fileService'
import companyauthService from "@/services/companyauthService"
export default{
	data(){
		return {
			identity:{
				username:localStorage.username,
				userid:0,
				authmsg:'',
				companyname:'',
				creditcode:'',
				industrytype:'',
				companylicence:'',
				missiveauth:'',
				otheraptitude:'',
				corporatename:'',
				corporatemobile:'',
				corporateemail:'',
				ynbill:true,
				invitecode:'',
				// ynagree:''
			},
			fileRoot:config.fileRoot +'/',
			agreement:false,
			error:{
				// authmsg:'',
				// companyname:'',
				// creditcode:'',
				// industrytype:'',
				// companylicence:'',
				// missiveauth:'',
				// otheraptitude:'',
				// corporatename:'',
				// corporatemobile:'',
				// corporateemail:'',
				// ynbill:'',
				// invitecode:'',
				// agreement:false,
				// ynagree:''
			}
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
		},
		/**
		 * [uploadFile description]
		 * @param  {[type]} type 1：正面 ，2：反面
		 * @param  {[type]} e    [description]
		 * @return {[type]}      [description]
		 */
		uploadFile(e,type){
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
	          	this.identity[type] = data.result.url;
			})
		},
		checkAuthms(whi){
			this.$Tool.checkInput(this.identity[whi])?this.error[whi] = '':this.error[whi] = '输入不合法';
		},
		submit(){
			for (let aa in this.error){
				if (this.error[aa]) {return}
			}
			if (!this.agreement) {
				this.error.agreement = true;
				return;
			}
			if (!this.identity.companylicence) {
				this.error.companylicence = '请上传最新营业执照正面照。资质信息无残缺。';
				return;
			}else{
				this.error.companylicence = '';
			}
			if (!this.identity.missiveauth) {
				this.error.missiveauth = '请上传身份证国徽图片';
				return;
			}else{
				this.error.missiveauth = '';
			}
			let res = companyauthService.submitAuth(localStorage.token,localStorage.id,this.identity);
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
			vertical-align: top;
		}
		th{
			width: 20%;
			line-height: 40px;
		}
		td{
		    padding-bottom: 20px;
		}
		input[type="text"]{
			border: 1px solid #ccc;
			border-radius: 6px;
			padding: 8px 10px;
		}
		input[type="text"]:focus{
			border-color: @thinMainColor;
		}
		input[type="text"]:disabled{
			background: @bgColor;
			cursor:not-allowed;
		}
		input[type="checkbox"],input[type="radio"]{
			width: 15px;
			height: 15px;
			border-radius: 50%;
			border: 1px solid #ccc;
			background:@bgColor;
			margin-right: 10px;
		    vertical-align: sub;
		}
		input[type="radio"]:checked{
			background: @thinMainColor;
		}
		input[type="checkbox"]:checked{
			background: @thinMainColor;
		}
		input[type="file"]{
			display: none;
		}
		input::-webkit-input-placeholder { /* WebKit browsers */
		  color: #999;
		}

		input::-moz-placeholder { /* Mozilla Firefox 19+ */
		  color: #999;
		}

		input:-ms-input-placeholder { /* Internet Explorer 10+ */
		  color: #999;
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
		.label-file{
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
		    border: 5px solid #eee;
		}
		.error-border{
			border-color:@errColor !important;
		    box-shadow: 0 0 4px 0px @errColor;
		}
		.error-font,code{
			color: @errColor;
		}
		.tip{
			color: #999;
		}
		a{
			color: #406599;
		}
		.label-radio{
			display: inline-block;
			margin: 0 25px 15px 0;
		}
	}
</style>