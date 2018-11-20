import config from '@/assets/js/config'
import axios from 'axios'
const controller =config.successServer+'/map';
const service ={}

service.getPoiList = function(page_num,latitude,longitude,call){
	// debugger;
	// debugger;
	axios.get(controller+'/getPoiList',{params:{
		page_num:page_num,
		latitude:latitude,
		longitude:longitude
	}}).then(function(res){
		call(res.data);
	})

}
service.getPoiListByKeyword = function(page_num,latitude,longitude,keywords,call){
	// debugger;
	// debugger;
	axios.get(controller+'/getPoiList',{params:{
		page_num:page_num,
		latitude:latitude,
		longitude:longitude,
		key:keywords
	}}).then(function(res){
		call(res.data);
	})

}
export default service

