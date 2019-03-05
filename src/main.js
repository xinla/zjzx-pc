import '@/assets/styles/reset.css';
import '@/assets/styles/base.less';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
window.$ = $;

import animate from 'animate.css'
//配置文件
import config from '@/assets/configs/config'
//工具函数
import Tool from '@/assets/js/methods'
Vue.use(Tool);
//文在动画loading
import LoadingMain from '@/components/loadingMain'
Vue.component('LoadingMain',LoadingMain);
//element-ui
import {
    Alert,
    Message,
    MessageBox,
    Carousel,
    CarouselItem,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Button,
    Upload,Dialog} from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Dialog);
Vue.component('carousel',Carousel);
Vue.component('carousel-item',CarouselItem);


// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created(){
    let docEl = document.documentElement
    let clientWidth = Math.min(window.innerWidth, docEl.clientWidth)
    if (clientWidth <= 750) {
      location.href = 'http://m.zjzx.xyz'
      return
    }
  	window.GoTruth = this;
  },
  render: h => h(App)
}).$mount('#app')
