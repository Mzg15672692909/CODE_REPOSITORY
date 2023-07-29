import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',  //布局
    name: 'home',
    redirect:'/index',
    meta:{title:'企业首页'},
    component: () => import('../layout/index.vue'),
  }
]
// //1、选筛选home
// let homeRoutes = routes.filter(v=>v.path==='/home')[0];  //{}
// //2、添加children子级
// homeRoutes.children = [];
// //3、递归函数
// initRoutes(items,homeRoutes.children);



const router = new VueRouter({
  routes
})

export default router
