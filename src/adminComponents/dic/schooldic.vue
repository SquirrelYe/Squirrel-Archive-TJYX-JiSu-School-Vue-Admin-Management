<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">学校信息字典管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-字典管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <button  class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model" @click="creat()">添加学校信息字典<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索学校信息字典名称" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>学校信息字典ID</th>
                        <th>名称</th>
                        <th>介绍</th>
                        <th>省份</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>F{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.detail}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="editItem(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="编辑学校信息"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-times" data-toggle="tooltip" data-placement="top" title="删除学校"></i>
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

    <div id="Model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width:55%">
          <div class="modal-content">
          <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel" v-if="judge ==0">新建学校信息字典信息</h4>
          <h4 class="modal-title" id="myModalLabel" v-if="judge ==1">修改学校信息字典信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- 新建 -->
                          <form class="form-horizontal" role="form" v-if="judge ==0">
                              <div class="form-group">
                                  <label class="col-md-2 control-label">名称：</label>
                                  <div class="col-md-10"> <input type="text" class="form-control" v-model="name"> </div>
                              </div>
                               <div class="form-group">
                                  <label class="col-md-2 control-label">省份：</label>
                                  <div class="col-md-10"> <input type="text" class="form-control" v-model="province"> </div>
                              </div>
                               <div class="form-group">
                                  <label class="col-md-2 control-label">介绍：</label>
                                  <div class="col-md-10"> <textarea type="text" class="form-control" v-model="detail"></textarea> </div>
                              </div>
                          </form>
                          <!-- 编辑 -->
                          <form class="form-horizontal" role="form" v-if="judge ==1 && eitem">
                              <div class="form-group">
                                  <label class="col-md-2 control-label">名称：</label>
                                  <div class="col-md-10">
                                      <input type="text" class="form-control" v-model="eitem.name">
                                  </div>
                              </div>                              
                              <div class="form-group">
                                  <label class="col-md-2 control-label">省份：</label>
                                  <div class="col-md-10"> <input type="text" class="form-control" v-model="eitem.province"> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">介绍：</label>
                                  <div class="col-md-10"> <textarea type="text" class="form-control" v-model="eitem.detail"></textarea> </div>
                              </div>
                          </form>                         
                        </div>
                    </div>
                </div>
            </div>         
          </div>

          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-if="judge == 0" @click="toCreat()">提交新增</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-if="judge == 1" @click="toEdit()">提交修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- 模态信息模板中 -->
    <!-- <div id="Model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">        
      </div>
    </div> -->
    <!-- 模态信息模板大 -->
    <!-- <div id="custom-width-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width:55%">
      </div>
    </div> -->
    
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
  name: "school",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,
      
      judge:0,

      name:null,
      detail:null,
      province:null,

      eitem:null,
      sitem:null
    };
  },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    // 获取所有学校信息字典
    findAndCountAll(offsize,limit) { apis.school.findAndCountAll(offsize,limit).then(res => { this.showItem=res.data }) },
    creat(){ this.judge =0; this.name =null ; this.detail = null ;this.province = null},
    // 新增一级菜单
    toCreat(){
      print.log(this.name , this.condition)
      if(this.name !=null && this.detail != null&& this.province != null){
        apis.school.creat(this.name , this.detail, this.province)
        .then(res=>{
          s_alert.Success("新建学校信息字典成功!", "成功新建一个学校信息字典", "success");
          this.init()
        })
      }else s_alert.Warning('新建学校信息字典失败','输入非法')
    },
    editItem(item){ this.judge=1; this.eitem = JSON.parse(JSON.stringify(item)) ;},
    toEdit(){
      print.log(this.eitem)
      if(this.eitem != null){
        apis.school.update(this.eitem.id ,this.eitem.name , this.eitem.detail,this.eitem.province)
        .then(res=>{
          if(res.data[0]){
            s_alert.Success("编辑学校信息字典成功!", "成功编辑学校信息字典", "success");
            this.init()
          }else s_alert.Warning('编辑失败','请联系技术人员')
        })
      }else s_alert.Warning('新建学校信息字典失败','输入非法')
    },
    eItem(item){ this.judge =2; this.sitem = item ; },
    // 删除学校信息字典
    DeleteItem(item){
      if(confirm(`你确定要删除${item.name}？`)){
        apis.school.delete(item.id)
        .then(res => {
          s_alert.Success("删除成功!", "成功移除了一个学校信息字典", "success");
          this.init()
        })
      }
    },
    // 搜索
    search(){
      if(this.searchkey) apis.school.findAndCountAllLikeByName(this.searchkey).then(res => { this.showItem=res.data });
      else this.init()
    }
  }
};
</script>

<style scoped>

</style>