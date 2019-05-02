import Vue from 'vue'
import Router from 'vue-router'

import login from '@/adminComponents/init/login'
import menu from '@/adminComponents/init/menu'
import game from '@/adminComponents/init/game'
import index from '@/adminComponents/init/index'
// users
import user from '@/adminComponents/users/user'
import admin from '@/adminComponents/users/admin'
import team from '@/adminComponents/users/team'
// game
import listgame from '@/adminComponents/game/listgame'
// run
import stransation from '@/adminComponents/run/stransation'
import sstastics from '@/adminComponents/run/sstastics'
import syear from '@/adminComponents/run/syear'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/menu',
      name: 'menu',
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
          path:'listgame',   //赛事列表
          name:'listgame',
          component:listgame
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
