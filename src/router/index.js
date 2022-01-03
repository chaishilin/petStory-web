import Vue from 'vue'
import VueRouter from 'vue-router'
const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/user/login') },
  { path: '/userInfo', component: () => import('@/views/user/userInfo') },
  { path: '/resetPassword', component: () => import('@/views/user/resetPassword') },
  { path: '/register', component: () => import('@/views/user/register') },

  { path: '/programListPage', component: () => import('@/views/program/programListPage') },
  { path: '/doProgramPage', component: () => import('@/views/program/doProgramPage') },

  { path: '/programTemplateDetail', component: () => import('@/views/programTemplate/programTemplateDetail') },
  { path: '/programTemplateListPage', component: () => import('@/views/programTemplate/programTemplateListPage') },
  
  { path: '/dataTypePage', component: () => import('@/views/dataType/dataTypePage') },

  { path: '/content', component: () => import('@/components/article/content') },
  { path: '/story', component: () => import('@/views/pets/storyPage') },


  { path: '/labelBar', component: () => import('@/components/labelBar') },
  { path: '/appHeader', component: () => import('@/components/appHeader') }


]
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
