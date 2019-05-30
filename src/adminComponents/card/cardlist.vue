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
                <button  class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model">发布开卡订单<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索开卡订单姓名" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>开卡订单ID</th>
                        <th>姓名</th>
                        <th>价钱</th>
                        <th>电话</th>
                        <th>学校</th>
                        <th>宿舍</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>校园大使</th>
                        <th>最近时间</th>
                        <th>执行操作</th>
                      </tr> 
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index"  :class=" item.condition==2? 'text-success':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>C{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.school | formatSchool}}</td>
                        <td>{{item.dom}}</td>
                        <td>{{item.condition|formatCardCondition}}</td>
                        <td>{{item.detail}}</td>
                        <td v-if="item.user">{{item.user.name}}</td><td v-else></td>
                        <td>{{item.updated_at|formatTime}}</td>
                        <td class="actions ">
                          <!-- <a @click="updateCondition(item,1)">
                            <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="处理开卡订单"></i>
                          </a>
                          <a @click="updateCondition(item,2)">
                            <i class="fa fa-stop" data-toggle="tooltip" data-placement="top" title="完成开卡订单"></i>
                          </a> -->

                          <a @click="DeleteItem(item)">
                            <i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="删除开卡订单"></i>
                          </a>
                          <a @click="setOrder(item)" data-toggle="modal" data-target="#send">
                            <i class="fa  fa-arrow-right" data-toggle="tooltip" data-placement="top" title="派发大使订单"></i>
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
          <h4 class="modal-title" id="myModalLabel">发布开卡订单</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>发布开卡订单</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">姓名</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" v-model="card.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">价钱</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control"  v-model="card.price">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">号码</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control"  v-model="card.phone">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">学校</label>
                                    <div class="col-md-10">
                                        <input disabled class="form-control"  :placeholder="school_id | formatSchool">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">宿舍</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" v-model="card.dom">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">备注</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" v-model="card.detail">
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
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="creatCard()">提交</button>
          </div>
        </div>
      </div>
    </div>


    <!-- 派发大使 -->
    <div id="send" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel">派发大使订单</h4>
          </div>
          <!-- 派发大使订单 -->
          <div class="modal-body" align='center' v-if="takes">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                  <div class="col-md-3 control-label" style="font-weight:900"><strong>校园大使:</strong></div>
                  <div class="col-md-9">
                      <select class="form-control" v-model="take">
                          <option v-for="(item,index) in takes" :key="index" :value="item.id">{{item.name}}</option>
                      </select>
                  </div>
              </div>
          </form>  
          </div>
          <div class="modal-body" align='center' v-if="!takes"><h4>暂无校园大使</h4></div>
          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="send()">派发订单</button>
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
      
      card:{ name:null, price:null, phone:null, dom:null, detail:null },
      // 派发
      item:null,
      takes:null,
      take:null,
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    // 获取所有开卡订单
    findAndCountAll(offsize,limit) { apis.card.findAndCountAllBySchool(this.school_id,offsize,limit).then(res => { this.showItem=res.data; print.log('开卡列表',res.data) })},

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
    // 派发大使
    setOrder(item){ 
      this.item = item ; 
      apis.user.findAndCountAllXYDS(0,this.school_id,0,1000).then(res=>{ this.takes = res.data.rows })
     },
    // 派发
     send(){
       print.log(this.take , this.item)
      //  发送到校园大使
      apis.card.setTaken(this.item.id, this.take ,1)
      .then(res=>{
        if(res.data[0] == 1){
          s_alert.Success("派发成功!", "成功派发开卡订单", "success");
          this.init()
        }else s_alert.Warning('派发失败！','请联系技术人员')
      })
     },
    // 搜索
    search(){
      if(this.searchkey) apis.card.findAndCountAllLikeByNameSchool(this.searchkey,this.school_id).then(res => { this.showItem=res.data });
      else this.init()
    },
    // 创建开卡
    creatCard(){
      print.log(this.card)
      let c= this.card
      apis.card.create(null, 0 ,c.name,c.price, c.phone ,this.school_id, c.dom ,c.detail )
      .then(res=>{
        print.log(res.data)
        s_alert.Success("发布成功!", "成功发布开卡订单", "success");
        this.init()
      })
    }

  }
};
</script>

<style scoped>

</style>