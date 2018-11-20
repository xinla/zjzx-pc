import config from '@/assets/js/config'
import axios from 'axios'
import commonUtil from '@/utils/commonUtil'
const controller =config.successServer+'/version';
const service ={}

// 版本比较
service.compareVersion = function(historyVersion,call){
	let params = {
		historyVersion,//n:"比较的版本",
	}
	if (call) {
		commonUtil.ajax(controller+'/compareVersion',params,call);
		return;
	}
	let resMap = commonUtil.ajaxAsync(controller+'/compareVersion',params);

	return resMap;
}
// 获取最新版本下载地址
service.getNewVersion = function(call){
	let params = {
	}
	if (call) {
		commonUtil.ajax(controller+'/getNewVersion',params,call);
		return;
	}
	let resMap = commonUtil.ajaxAsync(controller+'/getNewVersion',params);

	return resMap;
}

export default service
