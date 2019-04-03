import request from '@/utils/request'
const controller = '/zjzx-user/login'
export default {

	/**
	 * 根据手机号登录
	 * @param  {[type]} mobile [手机号]
	 * @param  {[type]} code   [验证码]
	 * @return {[axios]}        [axios]
	 */
	loginByMobile(mobile, code) {
		return request({
			url: controller + '/loginByMobile',
			params: { mobile, code, device:'pc' }
		})
	},

	/**
	 * 用户登录 (微信登录)
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	loginByWx (user) {
		return request({
			url: controller + '/loginByWx',
			params: { 
				wx_openid: user.wx_openid,
				wx_nikname: user.wx_nikname,
				wx_image: user.wx_image,
				wx_unionid: user.wx_unionid,
				device: 'pc'
		  }
		})
	},

	/**
	 * 用户登录 (QQ登录)
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	loginByQQ (user) {
		return request({
			url: controller + '/loginByQQ',
			params: { 
				qq_openid: user.qq_openid,
				qq_unionid: user.qq_unionid,
				qq_nikname: user.qq_nikname,
				qq_image: user.qq_image,
				device: 'pc'
		  }
		})
	},

	/**
	 * 用户登录（新浪微博登录）
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	loginByXl (user) {
		return request({
			url: controller + '/loginByXl',
			params: { 
				xl_openid: user.xl_openid,
				xl_nikname: user.xl_nikname,
				xl_image: user.xl_image,
				device: 'pc'
		  }
		})
	},

	/**
	 * 用户退出
	 * @return {[type]}      [description]
	 */
	logOut() {
		return request({
			url: controller + '/logOut',
		})
	},
	
	/**
	 * 获取验证码
	 * @param  {[type]} mobile [手机号]
	 * @return {[type]}        [description]
	 */
	getCode(mobile) {
		return request({
			url: controller + '/getCode',
			params: { mobile }
		})
	},

	/**
	 * 校验验证码
	 * @param  {[type]} mobile [description]
	 * @param  {[type]} code   [description]
	 * @return {[type]}        [description]
	 */
	testCode(mobile, code) {
		return request({
			url: controller + '/mobile',
			params: { mobile, code }
		})
	}
}
