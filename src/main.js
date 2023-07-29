import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'   //引入scss
import i18n from './i18n/i18n' //国际化

Vue.use(ElementUI);
Vue.config.productionTip = false
//全局组件定义
import './components/global'

//路由拦截
import './permission'

//全局过滤器
import './filters'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')


