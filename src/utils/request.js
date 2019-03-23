import axios from 'axios'
import router from '../router'
import urls from '../urls'
import { MessageBox } from 'element-ui'

const service = axios.create({
	baseURL: urls.successServer,
	timeout: 5000,
	transformRequest: [function(data) {
		let newData = new URLSearchParams()
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== undefined) {
          if (Array.isArray(data[key])) {
            data[key] = String(data[key])
          }else{
            typeof data[key] === 'string' || (data[key] = JSON.stringify(data[key])) // 防止字符串参数再被JSON套一层引号
          }
        }else{
          data[key] = ''
        }
        newData.append(key, data[key])
      }
    }
    return newData
	}]
})

// request拦截器
service.interceptors.request.use(config => {
	config.headers['token'] = localStorage.token // 让每个请求携带自定义token
	return config
}, err => {
	console.log(err)
	return Promise.reject(err)
})

service.interceptors.response.use(res => {
	const data = res.data
	if (data.status !== 401) {
		return data
	} else {
		MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
    	router.push({name:'login'})
    })
		return Promise.reject('error')
	}
}, err => {
	MessageBox.alert('连接失败或未知错误 ' + err, '错误', { type: 'error', center: true })
	return Promise.reject(err)
})

export default service
