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
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>TX-{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td v-if="item.school">{{item.school.name}}</td><td v-else></td>
                        <td>{{item.xuehao}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.mail}}</td>
                        <td>102</td>
                        <td>100</td>
                        <td>{{item.condition|formatAuthenCondition}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                            <a @click="tixan(item)">
                                <i class="fa fa-mail-forward " data-toggle="tooltip" data-placement="top" title="允许通过"></i>
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
  filters:{ ...filter },
  mounted() { this.init(); this.host=this.$host },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    // 获取所有校园大使申请
    findAndCountAll(offsize,limit) { apis.authen.findAndCountAll(offsize,limit).then(res => { this.showItem=res.data; console.log('校园大使申请',res.data) }) },
    // 资产提现申请
    tixan(item){
      apis.authen.update(item.id,condition).then(res=>{
        s_alert.Success("项目状态更新成功！", "成功更新一个校园大使状态", "success");
        this.init()
      })
    },
    // 搜索
    search(){
        if(this.searchkey) apis.authen.findAndCountAllLikeByName(this.searchkey).then(res => { this.showItem=res.data });
        else this.init()
    }
  }
};
</script>

<style scoped>

</style>