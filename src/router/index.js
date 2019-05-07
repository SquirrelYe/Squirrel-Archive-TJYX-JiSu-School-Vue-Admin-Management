import Vue from 'vue'
import Router from 'vue-router'

import index from '@/adminComponents/init/index'
import login from '@/adminComponents/init/login'
import menu from '@/adminComponents/init/menu'
import school from '@/adminComponents/init/school'
// 用户
import user from '@/adminComponents/users/user'
import admin from '@/adminComponents/users/admin'
import coordinator from '@/adminComponents/users/coordinator'
// 开卡
import cardlist from '@/adminComponents/card/cardlist'
import cardcode from '@/adminComponents/card/cardcode'
// 快递
import ltran from '@/adminComponents/logistic/ltran'
import lanalysis from '@/adminComponents/logistic/lanalysis'
// 考试
import exam from '@/adminComponents/exam/exam'
import eitem from '@/adminComponents/exam/eitem'
import etran from '@/adminComponents/exam/etran'
import eanalysis from '@/adminComponents/exam/eanalysis'
// 旅游
import journey from '@/adminComponents/journey/journey'
import jitem from '@/adminComponents/journey/jitem'
import jtran from '@/adminComponents/journey/jtran'
import janalysis from '@/adminComponents/journey/janalysis'
// 水果
import fruit from '@/adminComponents/fruit/fruit'
import fitem from '@/adminComponents/fruit/fitem'
import ftran from '@/adminComponents/fruit/ftran'
import fanalysis from '@/adminComponents/fruit/fanalysis'
// 字典
import schooldic from '@/adminComponents/dic/schooldic'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/menu', name: 'menu', meta: { auth: true }, component: menu,
      children: [
        { path: '/', name: 'index', component: index },
        { path: 'index', name: 'index', component: index },
        { path: 'user', name: 'user', component: user },   //参赛者管理
        { path: 'admin', name: 'admin', component: admin },   //管理员管理
        { path: 'coordinator', name: 'coordinator', component: coordinator },   //校园大使管理

        { path: 'cardlist', name: 'cardlist', component: cardlist },   //开卡信息
        { path: 'cardcode', name: 'cardcode', component: cardcode },   //开卡二维码
        
        { path: 'ltran', name: 'ltran', component: ltran },   //快递订单
        { path: 'lanalysis', name: 'lanalysis', component: lanalysis },   //快递流水

        { path: 'exam', name: 'exam', component: exam },   //考试一级菜单
        { path: 'etran', name: 'etran', component: etran },   //考试订单
        { path: 'eitem', name: 'eitem', component: eitem },   //考试项目
        { path: 'eanalysis', name: 'eanalysis', component: eanalysis },   //考试流水

        { path: 'journey', name: 'journey', component: journey },   //旅游一级菜单
        { path: 'jtran', name: 'jtran', component: jtran },   //旅游订单
        { path: 'jitem', name: 'jitem', component: jitem },   //旅游项目
        { path: 'janalysis', name: 'janalysis', component: janalysis },   //旅游流水

        { path: 'fruit', name: 'fruit', component: fruit },   //水果一级菜单
        { path: 'ftran', name: 'ftran', component: ftran },   //旅游订单
        { path: 'fitem', name: 'fitem', component: fitem },   //水果项目
        { path: 'fanalysis', name: 'fanalysis', component: fanalysis },   //水果流水

        { path: 'schooldic', name: 'schooldic', component: schooldic },   //学校字典
        
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