import Vue from 'vue'
import Router from 'vue-router'

import login from '@/adminComponents/init/login'
import menu from '@/adminComponents/init/menu'
import index from '@/adminComponents/init/index'
// users
import user from '@/adminComponents/users/user'
import admin from '@/adminComponents/users/admin'
import team from '@/adminComponents/users/team'
// run
import stransation from '@/adminComponents/run/stransation'
import sstastics from '@/adminComponents/run/sstastics'
import syear from '@/adminComponents/run/syear'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/menu',
      name: 'menu',
      meta: { auth: true },
      component: menu,
      children:[
        {
          path: 'index',
          name: 'index',
          component: index
        },
        {
          path:'user',    //参赛者管理
          name:'user',
          component: user
        },
        {
          path:'admin',    //管理员管理
          name:'admin',
          component:admin
        },
        {
          path:'team',    //公司管理
          name:'team',
          component:team
        },
        {
          path:'stransation',   //交易管理
          name:'stransation',
          component:stransation
        },
        {
          path:'sstastics',   //赛事数据
          name:'sstastics',
          component:sstastics
        },
        {
          path:'syear',   //赛事数据
          name:'syear',
          component:syear
        }
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