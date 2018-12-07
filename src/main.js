import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
window.$ = $;
import '@/assets/styles/reset.css';
import '@/assets/styles/base.less';
//配置文件
import config from '@/assets/configs/config'
//工具函数
import Tool from '@/assets/js/methods'
Vue.use(Tool);
//文在动画loading
import LoadingMain from '@/components/loadingMain'
Vue.component('LoadingMain',LoadingMain);
//element-ui
import { Message,MessageBox,Loading,Tabs } from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$Tabs = Tabs;
// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
  	window.GoTruth = this;
  },
  render: h => h(App)
}).$mount('#app')
