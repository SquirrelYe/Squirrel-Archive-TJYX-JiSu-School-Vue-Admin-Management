<template>
  <div class="wrapper">
    <div class="topbar">
      <div class="topbar-left">
        <div class="text-center" style="background-color: white">
          <a href="javascript:void(0)" class="logo">
            <i class="md md-terrain"></i>
            <span>沙漠掘金后台管理系统</span>
          </a>
        </div>
      </div>
      <div class="navbar navbar-default" role="navigation">
        <div class="container">
          <div>
            <ul class="nav navbar-nav navbar-right pull-right">
              <li class="dropdown">
                <a class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true">
                  <img :src="icon_src" alt="user-img" class="img-circle" />
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="javascript:void(0)"> <i class="md md-face-unlock"></i> 个人简介 </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"> <i class="md md-settings"></i> 设置 </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"> <i class="md md-lock"></i> 锁屏 </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"> <i class="md md-settings-power"></i> 注销 </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="margin-top: 100px">
      <div class="content">
        <div class="row">
          <div class="col-sm-12">
            <h4 class="pull-left page-title">近期比赛列表</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="portfolioFilter">
              <a href="javascript:void(0)" :class="{ current: condition == -1 }" @click="getGame(-1)">所有赛事</a>
              <a href="javascript:void(0)" :class="{ current: condition == 0 }" @click="getGame(0)">未开始</a>
              <a href="javascript:void(0)" :class="{ current: condition == 1 }" @click="getGame(1)">正在进行</a>
              <a href="javascript:void(0)" :class="{ current: condition == 2 }" @click="getGame(2)">已结束</a>
            </div>
            <br />
            备注：选择你此次准备操作的比赛，若未发现此次的赛事信息，请联系组委会。
          </div>
        </div>

        <div class="row port">
          <div class="portfolioContainer" style="position: relative; height: 843.282px">
            <div class="col-sm-6 col-lg-3 col-md-4" v-for="(item, index) in items" :key="index">
              <div class="gal-detail thumb" @click="chooseGame(item)">
                <a href="javascript:void(0)" class="image-popup">
                  <img src="static/images/gallery/2.jpg" class="thumb-img" alt="work-thumbnail" />
                </a>
                <h5 class="text-center">
                  赛事编号：{{ item.id }}<br />
                  赛事名称：{{ item.name }}<br />
                  赛事说明：{{ item.detail }}<br />
                  开始时间：{{ item.start }}<br />
                  创建时间：{{ item.created_at | formatTime }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const s_alert = require('../../utils/alert');
const ses = require('../../utils/ses');
const req = require('../../utils/axios');
const print = require('../../utils/print');
const apis = require('../../interface/apis.js');

const async = require('async');
const notify = require('bootstrap-notify');
const moment = require('moment');

export default {
  name: 'game',
  data() {
    return {
      icon_src: 'static/images/users/avatar-6.jpg',
      items: null,
      condition: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    next();
  },
  mounted() {
    this.init();
  },
  updated() {
    $(function () {
      $("[data-toggle='tooltip']").tooltip();
    });
  },
  filters: {
    formatTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
    formatCondition(x) {
      if (x == 0) return '比赛未开始';
      if (x == 1) return '比赛正在进行';
      if (x == 2) return '比赛已结束';
    }
  },
  methods: {
    init() {
      this.getAllGame();
    },
    // 获取所有公司列表
    getAllGame() {
      apis.getAllGame().then(res => {
        print.log('获取到 赛事列表信息', res.data);
        this.items = res.data.rows;
      });
    },
    // 选择赛事
    chooseGame(item) {
      print.log('选择赛事', item);
      if (item.condition == 0 || item.condition == 2) {
        s_alert.Success('赛事未开始或已结束。', '请重新选择……', 'warning');
      } else {
        apis.getOneGameById(item.id).then(res => {
          ses.setSessionStorage('gameinfo', JSON.stringify(res.data));
          s_alert.Success(`加入成功，赛事：${item.name}`, '2秒后自动跳转到赛事界面……', 'success');
          setTimeout(() => {
            this.$router.push({ name: 'menu' });
          }, 2000);
        });
      }
    },
    // 选择不同状态赛事
    getGame(index) {
      this.condition = index;
      if (index == -1) this.getAllGame();
      else
        apis.getGameByCondition(index).then(res => {
          this.items = res.data.rows;
        });
    }
  }
};
</script>

<style scoped></style>
