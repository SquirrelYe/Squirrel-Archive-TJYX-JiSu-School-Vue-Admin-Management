<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">沙漠掘金后台管理系统-赛事列表</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="m-b-30" data-toggle="modal" data-target="#myindus">
                    <button id="addToTable" class="btn btn-primary waves-effect waves-light">新建比赛<i class="fa fa-plus"></i></button>
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>赛事ID</th>
                        <th>赛事名称</th>
                        <th>开始时间</th>
                        <th>持续时间</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gradeX" v-for="(item,index) in showItems" :key="item.name">
                        <td>{{index}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.start}}</td>
                        <td>{{item.stay}}</td>
                        <td>{{item.condition|formatCondition}}</td>
                        <td>{{item.detail}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions" align='center'>
                          <a class="waves-effect waves-light" @click="startGame(item)" data-toggle="tooltip" data-placement="top" title="启动比赛">
                            <i class="fa  fa-play"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="pauseGame(item)" data-toggle="tooltip" data-placement="top" title="暂停比赛">
                            <i class="fa  fa-pause"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="stopGame(item)" data-toggle="tooltip" data-placement="top" title="结束比赛">
                            <i class="fa  fa-stop"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="deleteGame(item)" data-toggle="tooltip" data-placement="top" title="删除比赛">
                            <i class="ii ion-close"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                  </div>
                  <div class="col-sm-6">
                    <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                      <ul class="pagination" style="float:right">
                        <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                          <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                        </li>
                        <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                          <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                        </li>
                        <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                          <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

const moment = require('moment');

export default {
  name: "listgame",
  data() {
    return {
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  filters:{
    formatTime(x){
      return moment(x).format('YYYY-MM-DD HH:mm:ss')
    },
    formatCondition(x){
      if(x==0) return '比赛未开始';
      if(x==1) return '比赛正在进行';
      if(x==2) return '比赛已结束';
    },
  },
  mounted() {
      this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  methods: {
    init(){
        this.getshowItems();
    },
    // 获取所有比赛列表
    getshowItems() {
      apis.getAllGame()
      .then(res => {
        print.log(res.data);
        // 分页
        this.currentPage='0'
        this.show(res.data.rows)
      })
    },
    // 确认删除比赛
    deleteGame(item) {
      print.log('删除比赛信息->',item);
      if(confirm('确定删除吗')){
        this.dele(item)
      }else{

      }      
    },    
    // 删除比赛
    dele(del){
      apis.delOneGameById(del.id)
      .then(res => {
        if(res.data.affectRows === 1){
            this.init()
            s_alert.Success("删除成功!", "成功移除了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("删除失败!", "请检查", "warning");
          }
      })
    },
    // 开始比赛
    startGame(item){
      apis.updateOneGameById(item.id,1)
      .then(res => {
        if(res.data.affectRows[0] === 1){
            this.init()
            s_alert.Success("比赛开始成功!", "成功开始了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("开始失败!", "请检查", "warning");
          }
      })
    },
    // 暂停比赛
    pauseGame(item){

    },
    // 结束比赛
    stopGame(item){
      apis.updateOneGameById(item.id,2)
      .then(res => {
        if(res.data.affectRows[0] === 1){
            this.init()
            s_alert.Success("比赛已结束!", "成功结束了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("操作失败!", "请检查", "warning");
          }
      })
    },

    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    show(items) {
      this.items=items;
      this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
      //页面加载完成，默认加载第一页
      let page = Number(this.currentPage) + 1;
      this.showEachPage(page);
      print.log("当前数据总页为：--->", this.sumPage);
    },
    switchPage(page) {
      let p = page - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", page);
      this.showEachPage(page);
    },
    showEachPage(page) {
      let all = this.items;
      this.showItems = [];
      for (
        let i = (page - 1) * this.PageShowSum;
        i < page * this.PageShowSum;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.showItems.push(all[i]);
        }
      }
    },
    nextPage() {
      if (this.currentPage == this.sumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.currentPage) + 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
    previousPage() {
      if (this.currentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.currentPage) - 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    }
    //结束分页
  }
};
</script>

<style scoped>

</style>