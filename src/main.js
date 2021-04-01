import Vue from 'vue'
import App from './App.vue'
import router from './router'
// axios
import './axios/index'
import store from './store'
import mixins from './utils/mixin'

// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 导入进度条样式
import 'nprogress/nprogress.css'

// 导入全局初始化样式
import './assets/index.css'

Vue.mixin(mixins)

Vue.config.productionTip = false
Vue.prototype.$Bus = new Vue()

new Vue({
  render: h => h(App),
  store,
  // 挂载到Vue示例上
  router
}).$mount('#app')
