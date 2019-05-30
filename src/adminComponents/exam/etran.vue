<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">考试订单列表管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-考试管理</h3>
          </div>
          <div class="row">
              <form class="form-horizontal" role="form">  
                <div class="col-md-3">
                  <div class="col-md-4 control-label"><strong>考试项目：</strong></div>
                  <div class="col-md-8">
                      <select class="form-control" v-model="eitem_id" @change="getTranByExam()">
                          <option v-for="(item,index) in eitem" :key="index" :value="item.id">{{item.name}}</option>
                      </select>
                  </div>
                </div>
              </form>
          </div> 
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <!-- <input type="text" class="form-control search-bar" placeholder="输入搜索考试订单列表名称" v-model="searchkey" v-on:keyup.enter="search()"> -->
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>订单ID</th>
                        <th>数量</th>
                        <th>订单状态</th>
                        <th>发货状态</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>学校</th>
                        <th>宿舍</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index"  :class=" item.condition==1? 'text-success':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>ET-{{item.id}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.condition|formatTranCondition}}</td>
                        <td>{{item.judgec|formatTranJudge}}</td>
                        <td v-if="item.location">{{item.location.name}}</td><td v-else></td>
                        <td v-if="item.location">{{item.location.phone}}</td><td v-else></td>
                        <td v-if="item.location">{{item.location.school}}</td><td v-else></td>
                        <td v-if="item.location">{{item.location.dom}}</td><td v-else></td>
                        <td v-if="item.location">{{item.location.detail}}</td><td v-else></td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="editItem(item)"  data-toggle="modal" data-target="#Model">
                            <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="更新状态信息"></i>
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
          <h4 class="modal-title" id="myModalLabel">修改订单物流状态信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- 编辑 -->
                          <form class="form-horizontal" role="form">
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>物流状态：</strong></div>
                                <div class="col-md-10" v-if="currentItem">
                                    <select class="form-control" v-model="currentItem.judgec">
                                        <option v-for="(item,index) in conditions" :key="index" :value="item.x">{{item.x |formatTranJudge}}</option>
                                    </select>
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
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="toEdit()">提交修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' // 注册 state

const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../interface/apis");

const moment = require('moment');
const filter = require("../../filter/filter");
const page = require("../../interface/page");

export default {
  name: "etran",
  data() {
    return {
      offsize:0,
      limit:10,
      currentPage:1,
      
      eitem:null,
      eitem_id:null,
      showItem:null,
      currentItem:null,
      conditions:[{ x:-1 },{ x:0},{ x:1},{ x:2},{ x:3} ],
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.getAllEitem() },
    // 获取所有考试
    getAllEitem(){ apis.eitem.findAllBySchool(this.school_id,0,1000).then(res=>{ this.eitem = res.data.rows ;print.log(res.data) }) },
    getTranByExam(){ this.getAllEtranByKind(this.eitem_id); this.offsize =0 },
    // 查询订单
    getAllEtranByKind(eitem_id){ apis.cart.findByExam(eitem_id ,this.offsize, this.limit) .then(res=>{ this.showItem = res.data })  },
    // 更改订单物流状态
    editItem(item){ this.currentItem = JSON.parse(JSON.stringify(item)) },
    toEdit(){
        apis.cart.updateJudge(this.currentItem.id , this.currentItem.judgec)
        .then(res => {
        s_alert.Success("更改订单物流状态成功!", "成功更改订单物流状态", "success");
        this.getAllEtranByKind(this.eitem_id);
        })
    }
  }
};
</script>

<style scoped>

</style>