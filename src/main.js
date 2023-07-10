import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//css初始化
import './assets/CSS/reset.css'
import './assets/CSS/iconfont.css'
// 生产环境下将不会显示开发环境下的提示信息
Vue.config.productionTip = false
// 挂载网络请求的方法
import api from './api/index'
Vue.prototype.$api = api //全局变量 $可防止名字冲突

new Vue({
    router, store, render: h => h(App)
}).$mount('#app')
