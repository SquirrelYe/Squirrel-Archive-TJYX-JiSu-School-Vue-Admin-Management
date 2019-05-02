<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">用户管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">沙漠淘金后台管理系统-管理员管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">

              <div class="col-sm-6">
                <div class="m-b-30" data-toggle="modal" data-target="#myindus">
                    <button id="addToTable" class="btn btn-primary waves-effect waves-light">添加管理员<i class="fa fa-plus"></i></button>
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>管理员ID</th>
                        <th>中文名</th>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>邮箱</th>
                        <th>手机</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                        <td>{{index}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.cname}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.pass}}</td>
                        <td>{{item.mail}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions" align='center'>
                          <a class="on-default remove-row" @click="isDeleteItem(item)">
                            <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="删除管理员"></i>
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
const apis = require("../../interface/apis");

const moment = require('moment');

export default {
  name: "admin",
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
    }
  },
  mounted() {
      this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  methods: {
    init(){
        this.getAllUser();
    },
    // 获取所有参赛者
    getAllUser() {
      apis.getAllUserByType(1) // JSON.parse(ses.getSessionStorage('gameinfo')).id
        .then(res => {
          print.log(res.data);
          // 分页
          this.currentPage='0'
          this.show(res.data.rows)
        })
    },
    // 判断是否删除
    isDeleteItem(item) {
      print.log('确定删除吗',item);
      let del=item
      let that=this
      if(confirm('确定删除吗')){
        that.DeleteItem(del)
      }else{

      }      
    },    
    // 删除参赛者
    DeleteItem(del){
      apis.delOneUserById(del.id)
      .then(res => {
        if(res.data.affectRows === 1){
            this.init()
            s_alert.Success("删除成功!", "成功移除了一名管理员", "success");
          }else{
            this.init()
            s_alert.Success("删除失败!", "请检查", "warning");
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