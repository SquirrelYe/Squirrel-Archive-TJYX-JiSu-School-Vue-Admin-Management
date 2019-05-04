<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">管理员管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-用户管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <button  class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model">添加管理员<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索管理员名称" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>管理员ID</th>
                        <th>名称</th>
                        <th>密码</th>
                        <th>邮箱</th>
                        <th>电话</th>
                        <th>状态</th>
                        <th>学校</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index"  :class=" item.condition==-1? 'text-danger':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.pass}}</td>
                        <td>{{item.mail}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.condition|formatCondition}}</td>
                        <td v-if="item.school">{{item.school.name}}</td><td v-else></td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="updateCondition(item,-1)" v-if="item.condition == 0">
                            <i class="fa fa-pause" data-toggle="tooltip" data-placement="top" title="冻结用户"></i>
                          </a>
                          <a @click="updateCondition(item,0)" v-if="item.condition == -1">
                            <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="解冻用户"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="删除用户"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row" v-if="showItem">
                  <div class="col-sm-6" >
                    <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >单页展示 {{limit}}项 总共 {{showItem.count}} 项</div>
                  </div>
                  <div class="col-sm-6">
                    <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                      <ul class="pagination" style="float:right">
                        <li class="paginate_button previous" :class="{ disabled: currentPage==1 }">
                          <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                        </li>
                        <li class="paginate_button active">
                          <a href="javascript:void(0)">{{currentPage}}</a>
                        </li>
                        <li class="paginate_button next" :class="{ disabled: currentPage*limit>=showItem.count }">
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

    <!-- 模态信息 -->
    <div id="Model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel">新建管理员信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>新建管理员信息</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">名称</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">密码</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control"  v-model="pass">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">邮箱</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control"  v-model="mail">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">电话</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="phone">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">学校</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" placeholder="天津城建大学">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>

          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="creatAdmin()">提交</button>
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
const filter = require("../../filter/filter");
const page = require("../../interface/page");

export default {
  name: "user",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,
      
      name:null,
      pass:null,
      mail:null,
      phone:null,
      school:4
    };
  },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.getAllUser(this.offsize,this.limit); },
    // 获取所有参赛者
    getAllUser(offsize,limit) { apis.user.findAndCountAllByType(1,offsize,limit).then(res => { this.showItem=res.data }) },

    updateCondition(item,condition){
      apis.user.update(item.id,condition).then(res=>{
        s_alert.Success("用户状态更新成功！", "成功更新一名用户状态", "success");
        this.init()
      })
    },
    // 删除参赛者
    DeleteItem(item){
      if(confirm(`你确定要删除${item.name}？`)){
        apis.user.delete(item.id)
        .then(res => {
          s_alert.Success("删除成功!", "成功移除了一名管理员", "success");
          this.init()
        })
      }
    },
    // 搜索
    search(){
      if(this.searchkey != null) apis.user.findAndCountAllByTypeLikeByName(1,this.searchkey).then(res => { this.showItem=res.data });
      else this.init()
    },
    // 新建管理员
    creatAdmin(){
      apis.user.creatAdmin(this.name, this.pass, this.mail, this.phone, this.school)
      .then(res=>{
        if(res.data[1]){
          s_alert.Success('创建成功','','success')
          this.init()
        }else{
          s_alert.Warning('创建失败','用户名或邮箱被占用')
        }
      })
    }

  }
};
</script>

<style scoped>

</style>