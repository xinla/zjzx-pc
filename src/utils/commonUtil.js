const util = {}

util.ajaxAsync = function(url, params){
	let res = {};
	$.ajax({
		url: window.urls.successServer + url,
		type: 'post',
		dataType: 'json',
		data: params,
		async: false,
		success:function(data){
			res = data;
		}
	})
	
	return res;

}
util.ajax = function(url, params, call){
	$.post(window.urls.successServer + url, params, function(data) {
		if (call) {
			call(data);		
		}
	}, "json");

}
export default util


