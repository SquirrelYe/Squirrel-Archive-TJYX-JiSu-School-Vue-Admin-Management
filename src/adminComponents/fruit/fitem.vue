<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">水果内容项目管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-水果项目管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">
                <button  class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model" @click="creat()">添加水果项目<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索水果项目名称" v-model="searchkey" v-on:keyup.enter="search()">
                <div class="table-responsive">
                  <table  style="table-layout:fixed" class="table table-bordered table-striped table-hover" id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>项目ID</th>
                        <th>二级分类</th>
                        <th>logo</th>
                        <th>名称</th>
                        <th>标题</th>
                        <th>价格</th>
                        <th>图文详情</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>                        
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index" :class=" item.condition==-1? 'text-danger':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>FI-{{item.id}}</td>
                         <td v-if="item.mfruit">{{item.mfruit.title}}</td><td v-else></td>
                        <td><img :src="host+item.logo" alt="logo" class="img-thumbnail img-responsive" style="width:100px"><br></td>
                        <td>{{item.name}}</td>
                        <td :title="item.detail" class="some">{{item.title}}</td>
                        <td>{{item.price}}</td>
                        <td> <a :href="host+item.detail">点击查看</a> </td>
                        <td>{{item.condition|formatExamItemCondition}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="updateCondition(item,-1)" v-if="item.condition == 0">
                            <i class="fa fa-pause" data-toggle="tooltip" data-placement="top" title="暂停销售"></i>
                          </a>
                          <a @click="updateCondition(item,0)" v-if="item.condition == -1">
                            <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="开启销售"></i>
                          </a>
                          <a @click="editItem(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="编辑项目"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-times" data-toggle="tooltip" data-placement="top" title="删除项目"></i>
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
          <h4 class="modal-title" id="myModalLabel" v-if="judge ==0">新建水果项目信息</h4>
          <h4 class="modal-title" id="myModalLabel" v-if="judge ==1">修改水果项目信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- 新建 -->
                          <form class="form-horizontal" role="form" v-if="judge ==0 && secondItems">
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>二级分类：</strong></div>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="mfruit_id">
                                        <option v-for="(item,index) in secondItems" :key="index" :value="item.id">{{item.title}}</option>
                                    </select>
                                </div>
                            </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">名称：</label>
                                  <div class="col-md-10"> <input type="text" class="form-control" v-model="name"> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">标题：</label>
                                  <div class="col-md-10"> <textarea type="text" class="form-control" v-model="title"></textarea> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">价格：</label>
                                  <div class="col-md-10"> <input type="number" class="form-control" v-model="price"> </div>
                              </div>
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>状态：</strong></div>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="condition">
                                        <option v-for="(item,index) in conditions" :key="index" :value="item.x">{{item.x |formatExamItemCondition}}</option>
                                    </select>
                                </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">大图：</label>
                                  <div class="col-md-10"> <input type="file" id="file" class="form-control" value="上传图片"  @change="selectImg" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"/> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">详情：</label>
                                  <div class="col-md-10"> <input type="file" id="file1" class="form-control" value="上传图片"  @change="selectDetail" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"/> </div>
                              </div>
                          </form>
                          <!-- 编辑 -->
                          <form class="form-horizontal" role="form" v-if="judge ==1 && currentItem">
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>分类：</strong></div>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="currentItem.mfruit_id">
                                        <option v-for="(item,index) in secondItems" :key="index" :value="item.id">{{item.title}}</option>
                                    </select>
                                </div>
                            </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">名称：</label>
                                  <div class="col-md-10"> <input type="text" class="form-control" v-model="currentItem.name"> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">标题：</label>
                                  <div class="col-md-10"> <textarea type="text" class="form-control" v-model="currentItem.title"></textarea> </div>
                              </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">价格：</label>
                                  <div class="col-md-10"> <input type="number" class="form-control" v-model="currentItem.price"> </div>
                              </div>
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>状态：</strong></div>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="currentItem.condition">
                                        <option v-for="(item,index) in conditions" :key="index" :value="item.x">{{item.x |formatExamItemCondition}}</option>
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
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-if="judge == 0" @click="toCreat()">提交新增</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-if="judge == 1" @click="toEdit()">提交修改</button>
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
  name: "fruit",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,

      judge:0,
      conditions:[{ x:-1 },{ x:0} ],
      secondItems:null,

      // 项目数据
      logo:null,
      name:null,
      title:null,
      price:null,
      detail:null,
      mfruit_id:null,
      condition:null,
      
      currentItem:null,
      host:null,
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init(); this.findAllFruit(); this.host=this.$host },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){ this.findAndCountAll(this.offsize,this.limit); },
    initdata(){ 
      this.logo=null;
      this.name=null;
      this.title=null;
      this.price=null;
      this.detail=null;
      this.mfruit_id=null;
      this.condition=null;
    },
    // 获取所有水果项目
    findAndCountAll(offsize,limit) { apis.fitem.findAllBySchool(this.school_id,offsize,limit).then(res => { this.showItem=res.data }) },
    // 获取水果二级分类
    findAllFruit() { apis.mfruit.findAllBySchool(this.school_id,0,100).then(res => { this.secondItems=res.data.rows ; console.log('水果二级分类',res.data) })},
    // 更新水果状态
    updateCondition(item,condition){
      apis.fitem.updateCondition(item.id,condition).then(res=>{
        s_alert.Success("项目状态更新成功！", "成功更新一个水果项目状态", "success");
        this.init()
      })
    },
    creat(){ this.judge =0; this.initdata() },
    // 新增项目
    toCreat(){
      print.log(this.name , this.title , this.price, this.detail ,this.mfruit_id , this.condition , this.logo)
      if(this.name!=null && this.title!=null && this.price!=null && this.detail!=null && this.mfruit_id!=null && this.condition!=null && this.logo!=null){
        apis.fitem.creat(this.logo , this.name , this.title , this.price , this.detail , this.mfruit_id , this.condition, this.school_id)
        .then(res=>{
          s_alert.Success("新建水果项目成功!", "成功新建一个项目", "success");
          this.init()
        })
      }else s_alert.Warning('新建项目失败','输入非法')
    },
    editItem(item){ this.judge=1; print.log('编辑',item); this.currentItem = JSON.parse(JSON.stringify(item)) ; },
    toEdit(){
      print.log(this.currentItem.name , this.currentItem.title , this.currentItem.price, this.currentItem.detail ,this.currentItem.mfruit_id , this.currentItem.condition , this.currentItem.logo)
      if(this.currentItem != null){
        let item = this.currentItem
        apis.fitem.update(item.id ,item.logo , item.name , item.title , item.price , item.detail , item.mfruit_id , item.condition)
        .then(res=>{
          if(res.data[0]){
            s_alert.Success("编辑项目成功!", "成功编辑一个水果项目", "success");
            this.init()
          }else s_alert.Warning('编辑失败','请联系技术人员')
        })
      }else s_alert.Warning('新建项目失败','输入非法')
    },
    eItem(item){ this.judge =2; this.sitem = item ; },
    // 删除水果项目
    DeleteItem(item){
      if(confirm(`你确定要删除${item.title}？`)){
        apis.fitem.delete(item.id)
        .then(res => {
          s_alert.Success("删除成功!", "成功移除了一个水果项目", "success");
          this.init()
        })
      }
    },
    // 搜索
    search(){
      if(this.searchkey) apis.fitem.findAndCountAllLikeByNameSchool(this.searchkey,this.school_id).then(res => { this.showItem=res.data });
      else this.init()
    },
    // 上传大图
    selectImg(){
      var _this = this; s_alert.basic('图片上传中……')
      let formData=new FormData();
      formData.append('file', document.getElementById('file').files[0] );   // 通过formdata上传
      req.post('api/upload',formData,{ method: 'post', headers: {'Content-Type': 'multipart/form-data'} })
      .then( (res)=> {
        print.log(res.data.info);
        s_alert.Success('图片上传成功','','success')
        _this.logo = res.data.info
      }).catch( (error)=> {
        console.log(error);
        s_alert.Warning('图片上传失败','请检查网络状况，必要情况联系技术人员')
      })
    },
    // 上传详情
    selectDetail(){
      var _this = this; s_alert.basic('图片上传中……')
      let formData=new FormData();
      formData.append('file', document.getElementById('file1').files[0] );   // 通过formdata上传
      req.post('api/upload',formData,{ method: 'post', headers: {'Content-Type': 'multipart/form-data'} })
      .then( (res)=> {
        print.log(res.data.info);
        s_alert.Success('图片上传成功','','success')
        _this.detail = res.data.info
      }).catch( (error)=> {
        console.log(error);
        s_alert.Warning('图片上传失败','请检查网络状况，必要情况联系技术人员')
      })
    }

  }
};
</script>

<style scoped>

</style>