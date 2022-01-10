import Vue from 'vue'
import VueRouter from 'vue-router'
const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/pets/storyPage') },
  { path: '/story', component: () => import('@/views/pets/storyPage') },
  { path: '/storyEdit', component: () => import('@/views/pets/storyEdit') },
  { path: '/labelEdit', component: () => import('@/views/pets/labelEdit') },

]
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
