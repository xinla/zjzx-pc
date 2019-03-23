import request from '@/utils/request'
const controller = '/zjzx-login/login'
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
			params: { mobile, code }
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
				qq_nikname: user.qq_nikname,
				qq_image: user.qq_image,
				qq_unionid: user.qq_unionid,
				device: 'pc'
		  }
		})
	},

	/**
	 * 用户登录（新浪微博登录）
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	loginByQQ (user) {
		return request({
			url: controller + '/loginByQQ',
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
	 * @param  {logid:"登录日志id" //  user. logid token:"令牌", userid:"用户id"} user [description]
	 * @return {[type]}      [description]
	 */
	logOut(user) {
		return request({
			url: controller + '/logOut',
			params: user
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
