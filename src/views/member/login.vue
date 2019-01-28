<template>
	<div class="login-wrap bfc-p">
		<div class="login-main cc">
			<ul>
				<li class="error-tip ac" v-show="errorTip">{{errorTip}}</li>
				<li class="login-li">
					<i class="iconfont icon-iphone"></i>
					<input type="text" class="input"
					v-model.trim="mobile"
					maxlength="11"
					placeholder="手机号">
				</li>
				<li class="login-li">
					<i class="iconfont icon-yanzhengma"></i>
					<input type="text" class="input" 
					v-model.trim="verifyCode"
					maxlength="4"
					placeholder="验证码">
					<span class="fr verify-code" :class="{'disabled':timer}" @click="getVerifyCode">{{getCodeDesc}}</span>
				</li>
				<!-- <li class="login-li">
					<i class="iconfont icon-suo"></i>
					<input type="text" class="input" 
					v-model.trim="password"
					placeholder="密码">
				</li> -->
				<li class="login-agree">
					<input type="checkbox" v-model="isAgree">
					我已经阅读并同意<router-link to='/agreement'>《直击真相用户协议》</router-link>
				</li>
				<li class="login-li ac" @click="login()">
					登录
				</li>
			</ul>
			<ul class="ac">
				<li class="login-author"> 一键登录 </li>
				<li class="author-li iconfont icon-wechat" @click="authLogin('wechat')">
				</li>
				<!-- <li class="author-li iconfont icon-qq" @click="authLogin('qq')"></li> -->
				<li class="author-li iconfont icon-weibo" @click="authLogin('sina')"></li>
			</ul>
		</div>
	</div>
</template>

<script>
import userService from '@/services/userService'
export default {
	data () {
		return {
			mobile:'',
			verifyCode:'',
			getCodeDesc:'获取验证码',
			password:'',
			errorTip:'',
			timer:0,
			isAgree:false,
		}
	},
	mounted(){
	    // console.log(this.$route)
		if (localStorage.getItem('token')) {
	        this.$Tool.goPage({name: 'index',replace:true});
	        location.reload();
	    }
	},
	methods:{
		/*focusMobile(){
			if (this.mobile === '手机号') {
				this.mobile = '';
			}
		},
		blurMobile(){
			if (!this.mobile) {
				this.mobile = '手机号';
			}
		},
		focusCode(){
			if (this.verifyCode === '验证码') {
				this.verifyCode = '';
			}
		},
		blurCode(){
			if (!this.verifyCode) {
				this.verifyCode = '验证码';
			}
		},
		focusPassword(){
			if (this.password === '密码') {
				this.password = '';
			}
		},
		blurPassword(){
			if (!this.password) {
				this.password = '密码';
			}
		},*/
		// 获取验证码
		getVerifyCode(){
			// this.$refs.mobileFocus.focus();
			this.checkMobile();
			if (this.errorTip || this.timer) { return; }
			// this.$vux.loading.show({text: 'Loading'});
			userService.getCode(this.mobile,(data)=>{
				// this.$refs.codeFocus.focus();
				// this.tip.codeColor = true;
				if(data && data.status == "success") {
					// this.$vux.loading.hide();
					this.getCodeDesc = "60秒后重发";
					let i =60;
					this.timer = setInterval(()=>{
						if(i>0) {
							i--;
							this.getCodeDesc = i + '秒后重发';
							// this.tip.close1 = false;
						}else {
							clearInterval(this.timer);
							this.timer = null;
							this.getCodeDesc = "获取验证码";
							// this.tip.codeColor = false;
						}
					},1000);
				}
				else if(data && data.status == "error") {
					// this.tip.mobileTip = data.result.tip;
					// this.tip.active1 = true;
					// this.mobile = "";
					// this.tip.close1 = false;
				}
			});

		},
		/**
		 * 登录
		 * @return {[type]} [description]
		 */
		login(){
			this.checkMobile();
			if (this.errorTip) { return; }
			if (this.verifyCode.length < 4) {
				this.errorTip = '请输入正确的验证码';
				return;
			}
			if (!this.isAgree) {
				this.errorTip = '请同意用户协议';
				return;
			}
			userService.loginByMobile(this.mobile,this.verifyCode,this.userInfoStore);
		},
		authLogin(type){
			if (localStorage.getItem('token')) {
		        this.$Tool.goPage({name: 'index',replace:true});
		        location.reload();
		    }
			let redirect_uri = encodeURIComponent('http://www.zjzx.xyz/#/member');
			switch (type) {
				case 'wechat':
				window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=wxa13e1618061e3e39&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=zjzxWechatAuthorization`)
				break;
				case 'qq':
				window.open(`https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101532474&redirect_uri=${redirect_uri}&state=zjzxQQAuthorization`);
				break;
				case 'sina':
				window.open(`https://api.weibo.com/oauth2/authorize?client_id=273153298&response_type=code&redirect_uri=${redirect_uri}&state=zjzxSinaAuthorization`)
			}
		},
		/**
		 * 登录回调，本地存储用户信息
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		userInfoStore(data){
			if(data && data.status === "success") {
				// this.$vux.loading.hide();
				let user = data.result.user,
				obj = {
					token:data.result.token,
					id:user.id,
					logid:user.logid,
					userImg:this.$Tool.headerImgFilter(user.imageurl),
					userName:user.username,
					userMobile:user.mobile,
					inviteCode:user.invitecode
				};
				Object.assign(localStorage,obj)
				this.$Tool.goPage({name: 'index',replace:true});
				location.reload();
			}
			else if(data && data.status == "error") {
				// this.tip.codeTip = data.result.tip;
				// this.tip.active2 = true;
				// this.tip.close2 = false;
				// this.codeDesc = "";
				setTimeout(()=>{
					this.$message({
					  message: data.result.tip,
					  center: true
					});
				},0)
				// console.log("error")
			}
		},
		checkMobile(){
			if(!this.mobile || !this.$Tool.isPhoneNumber(this.mobile)) {
				this.errorTip = "手机号有误";
			}else {
				this.errorTip = "";
			}
		}
	},
}
</script>

<style lang="less" scoped>
	.login-wrap{
		width: 100%;
		height: 100%;
		background: url('../../assets/images/login-bg.jpg') no-repeat center 0;
		background-size: cover;
	}
	.login-main{
		width: 380px;
		height: 446px;
		background: rgba(255,255,255,0.3);
		border-radius: 18px;
		/*box-shadow: 0px -10px 20px 6px rgba(255, 255, 255, 0.3);*/
	    padding: 40px 25px;
	    color: #fff;
	}
	.error-tip{
		position: absolute;
	    top: 10px;
	    width: 100%;
	    left: 0;
	    color: @errColor;
	}
	.login-li{
		line-height: 48px;
		background: rgba(255,255,255,0.3);
		border-radius: 8px;
		padding:0 10px;
		margin-bottom: 20px;
		color: #fff;
		.iconfont{
			margin-right: 15px;
		}
		.input{
			line-height: 36px;
			color: #fff;
			background: none;
		}
	}
	.verify-code{
		color: blue;
	}
	.disabled{
		color:#eee;
	}
	.login-agree{
		margin-bottom: 20px;
	}
	input[type=checkbox] {
		margin-right: 5px;
	    width: 15px;
	    height: 15px;
	    border: 2px solid #fff;
	}
	input[type=checkbox]:checked{
		border: 2px solid #eee;
		background: blue;
	    box-shadow: 0 0 4px 1px blue;
	}
	a{
		color: blue;
	}
	input::-webkit-input-placeholder { /* WebKit browsers */
	  color: #fff;
	}

	input::-moz-placeholder { /* Mozilla Firefox 19+ */
	  color: #fff;
	}

	input:-ms-input-placeholder { /* Internet Explorer 10+ */
	  color: #fff;
	}
	.login-li:last-child{
		background: linear-gradient(#3aebf6,#1268ea)
	}
	.login-author{
		margin-bottom:5px;
		&::before,&::after{
			display: inline-block;
			position: relative;
			top: -3px;
			content:"";
			width: 30%;
			border-top: 1px solid #ddd;
			margin:0 10px;
		}			
	}
	.author-li{
		position: relative;
		background-color: #666;
		display: inline-block;
		color: #fff;
		padding: 5px;
		border-radius: 50%;
		margin:0 5px;
	    font-size: 22px;
	}
</style>