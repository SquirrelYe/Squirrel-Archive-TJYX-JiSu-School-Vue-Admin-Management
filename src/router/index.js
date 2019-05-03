import Vue from 'vue'
import Router from 'vue-router'

import login from '@/adminComponents/init/login'
import menu from '@/adminComponents/init/menu'
import index from '@/adminComponents/init/index'
// users
import user from '@/adminComponents/users/user'
import admin from '@/adminComponents/users/admin'
import coordinator from '@/adminComponents/users/coordinator'
// run
import stransation from '@/adminComponents/run/stransation'
import sstastics from '@/adminComponents/run/sstastics'
import syear from '@/adminComponents/run/syear'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/menu', name: 'menu', meta: { auth: true }, component: menu,
      children: [
        { path: 'index', name: 'index', component: index },
        { path: 'user', name: 'user', component: user },   //参赛者管理
        { path: 'admin', name: 'admin', component: admin },   //管理员管理
        { path: 'coordinator', name: 'coordinator', component: coordinator },   //校园大使管理
        { path: 'stransation', name: 'stransation', component: stransation },   //交易管理
        { path: 'sstastics', name: 'sstastics', component: sstastics },   //赛事数据
        { path: 'syear', name: 'syear', component: syear },   //赛事数据
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    // next({path:'/'})
    // alert('会话过期，请重新登录')
    next()
  } else next();
});

export default router;