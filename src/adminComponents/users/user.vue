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
            <h3 class="panel-title">极速校园后台管理系统-用户管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control search-bar" placeholder="输入搜索用户名称" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>用户ID</th>
                        <th>openid</th>
                        <th>用户名</th>
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
                        <td>{{item.openid}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.pass}}</td>
                        <td>{{item.mail}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.condition|formatCondition}}</td>
                        <td v-if="item.school">{{item.school.name}}</td><td v-else></td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="getWX(item)" data-toggle="modal" data-target="#Model" >
                            <i class="fa fa-weixin" data-toggle="tooltip" data-placement="top" title="微信授权信息"></i>
                          </a>
                          <a @click="getAuthen(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-tag " data-toggle="tooltip" data-placement="top" title="认证信息"></i>
                          </a>
                          <a @click="getStock(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa  fa-credit-card" data-toggle="tooltip" data-placement="top" title="资产信息"></i>
                          </a>
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
                        <li class="paginate_button next">
                          <a href="javascript:void(0)" @click="test()">测试</a>
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
          <h4 class="modal-title" id="myModalLabel" v-if="judge == 0">微信授权信息</h4>
          <h4 class="modal-title" id="myModalLabel" v-if="judge == 1">用户认证信息</h4>
          <h4 class="modal-title" id="myModalLabel" v-if="judge == 2">用户资产信息</h4>
          </div>

          <!-- 微信授权信息 -->
          <div class="modal-body" align='center' v-if="judge == 0 && wxinfo">
            <h4>微信授权信息</h4>
            <address class="ng-scope">
              <strong>昵称:</strong>{{wxinfo.nickName}}<br>
              <strong>性别:</strong>{{wxinfo.gender | formatGender}}<br> 
              <strong>省份:</strong>{{wxinfo.province}}<br>
              <strong>城市:</strong>{{wxinfo.city}}<br>
              <strong>国家:</strong>{{wxinfo.country}}<br>
              <strong>头像:</strong><br> 
              <img :src="wxinfo.avatarUrl" alt="attachment" class="img-thumbnail img-responsive" style="width:200px"><br>
              <hr>              
            </address> 
          </div>
          <div class="modal-body" align='center' v-if="judge == 0 && !wxinfo"><h4>未授权微信信息</h4></div>

          <!-- 用户认证信息 -->
          <div class="modal-body" align='center' v-if="judge == 1 && authen">
            <h4>用户认证信息</h4>
            <address class="ng-scope">
              <strong>名字:</strong>{{authen.name}}<br>
              <strong>学号:</strong>{{authen.xuehao}}<br> 
              <strong>认证图片:</strong><br> 
              <img :src="authen.rz_icon" alt="attachment" class="img-thumbnail img-responsive"><br>
              <hr>              
            </address> 
          </div>
          <div class="modal-body" align='center' v-if="judge == 1 && !authen"><h4>未提交认证信息</h4></div>

          <!-- 用户资产信息 -->
          <div class="modal-body" align='center' v-if="judge == 2 && stock">
            <h4>用户资产信息</h4>
            <address class="ng-scope">
              <strong>余额:</strong>{{stock.money}}<br>           
            </address> 
          </div>
          <div class="modal-body" align='center' v-if="judge == 2 && !stock"><h4>暂无资产信息</h4></div>

          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal">确认</button>
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
  name: "user",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,
      
      judge:0,
      wxinfo:null,
      stock:null,
      authen:null,
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.getAllUser(this.offsize,this.limit); },
    test(){ apis.user.findAndCountAll(0,10).then(res => { print.log(res.data); }) },
    // 获取所有参赛者
    getAllUser(offsize,limit) { apis.user.findAndCountAllByType(0,offsize,limit).then(res => { this.showItem=res.data }) },

    getWX(item){ this.wxinfo = item.info ; this.judge = 0},
    getAuthen(item){ this.authen = item.authen ; this.judge = 1},
    getStock(item){ this.stock = item.stock ; this.judge = 2},
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
          s_alert.Success("删除成功!", "成功移除了一名用户", "success");
          this.init()
        })
      }
    },
    // 搜索
    search(){
      if(this.searchkey) apis.user.findAndCountAllByTypeLikeByName(0,this.searchkey).then(res => { this.showItem=res.data });
      else this.init()
    }

  }
};
</script>

<style scoped>

</style>