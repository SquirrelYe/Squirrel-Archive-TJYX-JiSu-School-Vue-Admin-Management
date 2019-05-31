<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">提现管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-提现申请管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control search-bar" placeholder="输入搜索校园大使姓名" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>申请ID</th>
                        <th>姓名</th>
                        <th>学校</th>
                        <th>学号</th>
                        <th>电话</th>
                        <th>邮箱</th>
                        <th>余额</th>
                        <th>提现</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>                        
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index" :class=" item.condition==-1? 'text-danger':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>TX-{{item.id}}</td>
                        <td v-if="item.authen">{{item.authen.name}}</td><td v-else></td>
                        <td v-if="item.school">{{item.school.name}}</td><td v-else></td>
                        <td v-if="item.authen">{{item.authen.xuehao}}</td><td v-else></td>
                        <td v-if="item.authen">{{item.authen.phone}}</td><td v-else></td>
                        <td v-if="item.authen">{{item.authen.mail}}</td><td v-else></td>
                        <td>102</td>
                        <td>100</td>
                        <td>{{item.condition|formatTixianCondition}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                            <a @click="tixan(item,1)">
                                <i class="fa fa-mail-forward " data-toggle="tooltip" data-placement="top" title="允许提现"></i>
                            </a>
                            <a @click="tixan(item,-1)">
                                <i class="fa fa-times " data-toggle="tooltip" data-placement="top" title="拒绝提现"></i>
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
  name: "authen",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,

      host:null,
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init(); this.host=this.$host },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    // 获取所有提现申请
    findAndCountAll(offsize,limit) { apis.tixian.findAllBySchool(this.school_id,offsize,limit).then(res => { this.showItem=res.data; print.log('现金提现申请',res.data) }) },
    // 资产提现申请
    tixan(item,condition){
      // 更新提现申请状态
      apis.tixian.update(item.id,condition).then(res=>{
        s_alert.Success("提现状态更新成功！", "成功更新一个提现申请状态", "success");
        this.init()
      })
      // 发送提现短信

    },
    // 搜索
    search(){
        if(this.searchkey) apis.tixian.findAndCountAllLikeByUserNameSchool(this.searchkey,this.school_id,0,10).then(res => { this.showItem=res.data ; print.log('搜索',res.data) });
        else this.init()
    }
  }
};
</script>

<style scoped>

</style>