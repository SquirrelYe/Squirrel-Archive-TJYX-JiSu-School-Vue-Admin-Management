<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">开卡二维码管理</h4>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12">                        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-开卡二维码管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">              
              <div class="col-md-12 col-sm-12 col-xs-12">                
                <div class="table-responsive">
                  <table  style="table-layout:fixed" class="table table-bordered table-striped table-hover" id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>项目ID</th>
                        <th>一级分类</th>
                        <th>logo</th>
                        <th>名称</th>
                        <th>标题</th>
                        <th>价格</th>
                        <th>详细信息</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>                        
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item,index) in showItem.rows" :key="index" :class=" item.condition==-1? 'text-danger':'' ">
                        <td>{{(currentPage-1)*limit+index+1}}</td>
                        <td>EI-{{item.id}}</td>
                         <td v-if="item.exam">{{item.exam.title}}</td><td v-else></td>
                        <td><img :src="host+item.logo" alt="logo" class="img-thumbnail img-responsive" style="width:100px"><br></td>
                        <td>{{item.name}}</td>
                        <td :title="item.detail" class="some">{{item.title}}</td>
                        <td>{{item.price}}</td>
                        <td :title="item.detail" class="some"> {{item.detail}} </td>
                        <td>{{item.condition|formatExamItemCondition}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions">
                          <a @click="editItem(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="编辑项目"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
          <h4 class="modal-title" id="myModalLabel">修改开卡二维码信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- 编辑 -->
                          <form class="form-horizontal" role="form" v-if="judge ==1 && currentItem">
                              <div class="form-group">
                                <div class="col-md-2 control-label"><strong>分类：</strong></div>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="currentItem.exam_id">
                                        <option v-for="(item,index) in exam.rows" :key="index" :value="item.id">{{item.title}}</option>
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
                                  <label class="col-md-2 control-label">介绍：</label>
                                  <div class="col-md-10"> <textarea type="text" class="form-control" v-model="currentItem.detail"></textarea> </div>
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
  name: "cardcode",
  data() {
    return {
      showItem:null,
      searchkey:null,

      offsize:0,
      limit:10,
      currentPage:1,
     
      currentItem:null,
      host:null,
    };
  },
  computed: { ...mapState(['school_id']) },
  filters:{ ...filter },
  mounted() { this.init(); this.findAllExam(); this.host=this.$host },
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
      this.exam_id=null;
      this.condition=null;
    },
    // 获取所有开卡二维码
    findAndCountAll(offsize,limit) { apis.eitem.findAndCountAll(offsize,limit).then(res => { this.showItem=res.data }) },
    editItem(item){ this.judge=1; this.currentItem = JSON.parse(JSON.stringify(item)) ; },
    toEdit(){
      print.log(this.currentItem.name , this.currentItem.title , this.currentItem.price, this.currentItem.detail ,this.currentItem.exam_id , this.currentItem.condition , this.currentItem.logo)
      if(this.currentItem != null){
        let item = this.currentItem
        apis.eitem.update(item.id ,item.logo , item.name , item.title , item.price , item.detail , item.exam_id , item.condition)
        .then(res=>{
          if(res.data[0]){
            s_alert.Success("编辑项目成功!", "成功编辑一个菜单开卡二维码", "success");
            this.init()
          }else s_alert.Warning('编辑失败','请联系技术人员')
        })
      }else s_alert.Warning('新建项目失败','输入非法')
    },
    selectImg(){
      var _this = this
      s_alert.basic('图片上传中……')
      let file=document.getElementById('file').files[0];
      let formData=new FormData();
      formData.append('file',file);   // 通过formdata上传
      this.$axios.post(this.$uploadpath,formData,{
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(function (res) {
        print.log(res.data.info);
        s_alert.Success('图片上传成功','','success')
        _this.logo = res.data.info
      }).catch(function(error){
        console.log(error);
        s_alert.Warning('图片上传失败','请检查网络状况，必要情况联系技术人员')
      })
    },
  }
};
</script>

<style scoped>

</style>