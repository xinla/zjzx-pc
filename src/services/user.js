import request from '@/utils/request'
const controller = '/zjzx-user/user'

export default {

	/**
	 * 获取当前用户信息
	 * @return {[type]} [description]
	 */
	getCurentUser() {
		return request({
			url: controller + '/getCurentUser'
		})
	}
}
