<template>
  <div>
    <!-- Begin page -->
    <div id="wrapper">
      <!-- Top Bar Start -->
      <div class="topbar">
        <!-- LOGO -->
        <div class="topbar-left">
          <div class="text-center" style="background-color:white">
            <a href="javascript:void(0)" class="logo">
              <i class="md md-terrain"></i>
              <span>极速校园后台管理系统</span>
            </a>
          </div>
        </div>
        <!-- Button mobile view to collapse sidebar menu -->
        <div class="navbar navbar-default" role="navigation">
          <div class="container">
            <div class>
              <div class="pull-left">
                <button class="button-menu-mobile open-left">
                  <i class="fa fa-bars"></i>
                </button>
                <span class="clearfix"></span>
              </div>
              
              <ul class="nav navbar-nav navbar-right pull-right">                
                <li class="hidden-xs">
                  <a href="#" id="btn-fullscreen" class="waves-effect">
                    <i class="md md-crop-free"></i>
                  </a>
                </li>

                <li class="dropdown">
                  <a href class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true" >
                    <img :src="icon_src" alt="user-img" class="img-circle">
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="javascript:void(0)">
                        <i class="md md-face-unlock"></i> 个人简介
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i class="md md-lock"></i> 锁屏
                      </a>
                    </li>
                    <li  @click="logout">
                      <a href="javascript:void(0)">
                        <i class="md md-settings-power"></i> 注销
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>            
          </div>
        </div>
      </div>
      
      <!-- 管理员端 -->
      <div class="left side-menu leftfixed fixed-left" style="position:fixed">
        <div class="sidebar-inner slimscrollleft">
          <div class="user-details">
            <div class="pull-left">
              <img :src="icon_src" alt class="thumb-md img-circle">
            </div>
            <div class="user-info">
              <div class="dropdown" v-if="userinfo">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  {{userinfo.cname}}
                  <span class="caret"></span>
                </a>                
              </div>

              <p class="text-muted m-0">管理员</p>
            </div>
          </div>
          <!--- Divider -->
          <div id="sidebar-menu">
            <ul>
              <li>
                <a href="./#/menu/index" class="waves-effect waves-light active">
                  <i class="md md-home"></i>
                  <span>系统首页</span>
                </a>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-account-child"></i>
                  <span>用户管理</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="user()">用户管理</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="admin()">管理员管理</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="take()">校园大使管理</a>
                  </li>
                </ul>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-palette"></i>
                  <span>开卡管理</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="cardlist()">开卡列表</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="cardcode()">二维码管理</a>
                  </li>
                </ul>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-invert-colors-on"></i>
                  <span>快递送取</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="syear()">订单列表</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">流水统计</a>
                  </li>
                </ul>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-invert-colors-on"></i>
                  <span>考试管理</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="syear()">一级菜单</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">考试项目</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">流水统计</a>
                  </li>
                </ul>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-invert-colors-on"></i>
                  <span>旅游管理</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="syear()">一级菜单</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">旅游项目</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">流水统计</a>
                  </li>
                </ul>
              </li>

              <li class="has_sub">
                <a href="javascript:void(0)" class="waves-effect waves-light">
                  <i class="md md-invert-colors-on"></i>
                  <span>水果管理</span>
                  <span class="pull-right">
                    <i class="md md-add"></i>
                  </span>
                </a>
                <ul class="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" @click="syear()">一级菜单</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">水果项目</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="stransation()">流水统计</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>      
      
      <div class="content-page">
        <div class="content">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>

        <!-- Footer -->
        <footer class="footer text-right footer">
          <div class="container">
            <div class="row">
              <div class="col-xs-6">2019 © 天津智识教育科技有限公司.</div>
              <div class="col-xs-6">
                <ul class="pull-right list-inline m-b-0">
                  <li>
                    <a href="javascript:void(0)">关于</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">帮助</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">联系</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      <div class="side-bar right-bar nicescroll">
        <h4 class="text-center">联系</h4>
        <div class="contact-list nicescroll">
          <ul class="list-group contacts-list">
            <!-- <li class="list-group-item">
              <a href="#">
                <div class="avatar">
                  <img src="assets/images/users/avatar-1.jpg" alt>
                </div>
                <span class="name">Chadengle</span>
                <i class="fa fa-circle online"></i>
              </a>
              <span class="clearfix"></span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <!-- App js -->
    <remote src="static/js/jquery.app.js"></remote>
  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../interface/apis");

import app from "../../App.vue";
var App = app;

export default {
  name: "menus",
  data() {
    return {
      icon_src:"static/images/users/avatar-6.jpg",
      userinfo:{cname :'风继续吹'},
      gameinfo:null
    };
  },
  beforeMount() {
    
  },
  mounted() {
    if(ses.getSessionStorage('userinfo') && ses.getSessionStorage('gameinfo')){
      this.userinfo = JSON.parse(ses.getSessionStorage('userinfo'));
      this.gameinfo = JSON.parse(ses.getSessionStorage('gameinfo'));
      // print.log(this.userinfo,this.gameinfo)
    }
  },
  methods: {
    // 页面跳转 管理员端
    user(){this.$router.push({name:'user'})},   //用户管理
    admin(){this.$router.push({name:'admin'})},
    take(){this.$router.push({name:'take'})},
    cardlist(){this.$router.push({name:'cardlist'})},   //赛事管理
    syear(){this.$router.push({name:'syear'})},   //赛事运营
    stransation(){this.$router.push({name:'stransation'})},
    sstastics(){this.$router.push({name:'sstastics'})},

    logout(){ this.$router.push({name:'login'}) }
  },

  components: {   //注入外部 js文件
    remote: {
      render: function(createElement) {
        var self = this;
        return createElement("script", {
          attrs: {
            type: "text/javascript",
            src: this.src
          }
        });
      },
      props: {
        src: {
          type: String,
          required: true
        }
      }
    }
  }
};
</script>

<style scoped>

</style>
