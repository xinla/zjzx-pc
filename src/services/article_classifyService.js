
import commonUtil from '@/utils/commonUtil'
const controller = '/zjzx-article/article_classify';
const service ={}

service.getArticleClassifyList = function(call){
	var params = {		
	};
	if(call){
		commonUtil.ajax(controller+'/getArticleClassifyList',params,call);
		return;
	}
	var resArticleClassifyList = commonUtil.ajaxAsync(controller+'/getArticleClassifyList',params);

	return resArticleClassifyList;
}

export default service

