<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">开卡管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-开卡管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control search-bar" placeholder="输入搜索开卡订单姓名" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>开卡订单ID</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>学校</th>
                        <th>宿舍</th>
                        <th>状态</th>
                        <th>详细信息</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index"  :class=" item.condition==2? 'text-success':'' " v-if="item.location">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>C{{item.id}}</td>
                        <td>{{item.location.name}}</td>
                        <td>{{item.location.phone}}</td>
                        <td>{{item.location.school}}</td>
                        <td>{{item.location.dom}}</td>
                        <td>{{item.condition|formatCardCondition}}</td>
                        <td>{{item.location.detail}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions ">
                          <a @click="updateCondition(item,1)">
                            <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="处理开卡订单"></i>
                          </a>
                          <a @click="updateCondition(item,2)">
                            <i class="fa fa-stop" data-toggle="tooltip" data-placement="top" title="完成开卡订单"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="删除开卡订单"></i>
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
    
  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const print = require("../../utils/print");
const apis = require("../../interface/apis");

const moment = require('moment');
const filter = require("../../filter/filter");
const page = require("../../interface/page");

export default {
  name: "cardlist",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,
      
      
    };
  },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    // 获取所有开卡订单
    findAndCountAll(offsize,limit) { apis.card.findAndCountAll(offsize,limit).then(res => { this.showItem=res.data }) },

    updateCondition(item,condition){
      apis.card.update(item.id,condition).then(res=>{
        s_alert.Success("开卡订单状态更新成功！", "成功更新一名开卡订单状态", "success");
        this.init()
      })
    },
    // 删除开卡订单
    DeleteItem(item){
      if(confirm(`你确定要删除${item.location.name}？`)){
        apis.card.delete(item.id)
        .then(res => {
          s_alert.Success("删除成功!", "成功移除了一名开卡订单", "success");
          this.init()
        })
      }
    },
    // 搜索
    search(){
      if(this.searchkey!=null ) apis.card.findAndCountAllLikeByName(this.searchkey).then(res => { this.showItem=res.data });
      else this.init()
    }

  }
};
</script>

<style scoped>

</style>