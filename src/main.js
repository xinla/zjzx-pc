import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './common/reset.css'
// import './common/base.less'
//配置文件
import config from './configs/config'
//工具函数
import Tool from './common/methods'
Vue.use(Tool);
//element-ui
import { Button, Select } from 'element-ui';
Vue.component('e-button', Button);
Vue.component('e-select', Select);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
  	window.GoTruth = this;
  },
  render: h => h(App)
}).$mount('#app')
