<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">活动信息管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-活动管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <button class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model" @click="creat()">添加活动信息<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索活动信息字典名称" v-model="searchkey" v-on:keyup.enter="search()" />
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>活动ID</th>
                        <th>类型</th>
                        <th>标题</th>
                        <th>图片</th>
                        <th>详细信息</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item, index) in showItem.rows" :key="index" :class="item.condition == -1 ? 'text-danger' : ''">
                        <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                        <td>S-{{ item.id }}</td>
                        <td>{{ item.type | formatActivityType }}</td>
                        <td>{{ item.title }}</td>
                        <td><a :href="host + item.icon">点击查看</a></td>
                        <td>{{ item.detail }}</td>
                        <td>{{ item.condition | formatActivityCondition }}</td>
                        <td>{{ item.created_at | formatTime }}</td>
                        <td class="actions">
                          <a @click="updateCondition(item, 0)">
                            <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="进行中"></i>
                          </a>
                          <a @click="updateCondition(item, -1)">
                            <i class="fa fa-stop" data-toggle="tooltip" data-placement="top" title="已结束"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-times" data-toggle="tooltip" data-placement="top" title="删除活动"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row" v-if="showItem">
                  <div class="col-sm-6">
                    <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite">单页展示 {{ limit }}项 总共 {{ showItem.count }} 项</div>
                  </div>
                  <div class="col-sm-6">
                    <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate">
                      <ul class="pagination" style="float: right">
                        <li class="paginate_button previous" :class="{ disabled: currentPage == 1 }">
                          <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                        </li>
                        <li class="paginate_button active">
                          <a href="javascript:void(0)">{{ currentPage }}</a>
                        </li>
                        <li class="paginate_button next" :class="{ disabled: currentPage * limit >= showItem.count }">
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
      <div class="modal-dialog" style="width: 55%">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 0">新建活动信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <!-- 新建 -->
                    <form class="form-horizontal" role="form" v-if="judge == 0">
                      <div class="form-group">
                        <div class="col-md-2 control-label"><strong>类型：</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="act.type">
                            <option v-for="(item, index) in types" :key="index" :value="item.x">{{ item.x | formatActivityType }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">标题：</label>
                        <div class="col-md-10"><input type="text" class="form-control" v-model="act.title" /></div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">图片：</label>
                        <div class="col-md-10">
                          <input type="file" id="file" class="form-control" value="上传图片" @change="selectImg" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">详情：</label>
                        <div class="col-md-10"><textarea type="text" class="form-control" v-model="act.detail"></textarea></div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-2 control-label"><strong>状态：</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="act.condition">
                            <option v-for="(item, index) in conditions" :key="index" :value="item.x">{{ item.x | formatActivityCondition }}</option>
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
import { mapState } from 'vuex'; // 注册 state

const s_alert = require('../../utils/alert');
const ses = require('../../utils/ses');
const req = require('../../utils/axios');
const print = require('../../utils/print');
const apis = require('../../interface/apis');

const moment = require('moment');
const filter = require('../../filter/filter');
const page = require('../../interface/page');

export default {
  name: 'activity',
  data() {
    return {
      showItem: null,
      searchkey: null,

      offsize: 0,
      limit: 10,
      currentPage: 1,

      judge: 0,

      conditions: [{ x: -1 }, { x: 0 }],
      types: [{ x: 0 }, { x: 2 }],
      act: { type: null, title: null, icon: null, detail: null, condition: null },

      eitem: null,
      sitem: null,

      host: null
    };
  },
  computed: { ...mapState(['school_id']) },
  filters: { ...filter },
  mounted() {
    this.init();
    this.host = this.$host;
  },
  updated() {
    $(function () {
      $("[data-toggle='tooltip']").tooltip();
    });
  },
  methods: {
    ...page,
    init() {
      this.findAndCountAll(this.offsize, this.limit);
    },
    // 获取所有活动信息字典
    findAndCountAll(offsize, limit) {
      apis.activity.findAllBySchool(this.school_id, offsize, limit).then(res => {
        this.showItem = res.data;
      });
    },
    creat() {
      this.judge = 0;
    },
    // 新增活动信息
    toCreat() {
      print.log(this.act);
      let c = this.act;
      apis.activity.create(c.type, c.title, c.icon, c.detail, c.condition, this.school_id).then(res => {
        s_alert.Success('新建活动信息字典成功!', '成功新建一个活动信息', 'success');
        this.init();
      });
    },
    // 更新状态
    updateCondition(item, c) {
      apis.activity.update(item.id, c).then(res => {
        s_alert.Success('状态更新成功!', '成功更新了一个活动信息', 'success');
        this.init();
      });
    },
    // 删除活动信息字典
    DeleteItem(item) {
      if (confirm(`你确定要删除${item.title}？`)) {
        apis.activity.delete(item.id).then(res => {
          s_alert.Success('删除成功!', '成功移除了一个活动信息', 'success');
          this.init();
        });
      }
    },
    // 搜索
    search() {
      if (this.searchkey)
        apis.activity.findAndCountAllLikeByTitleSchool(this.searchkey, this.school_id).then(res => {
          this.showItem = res.data;
        });
      else this.init();
    },

    // 上传大图
    selectImg() {
      var _this = this;
      s_alert.basic('图片上传中……');
      let formData = new FormData();
      formData.append('file', document.getElementById('file').files[0]); // 通过formdata上传
      req
        .post('api/upload', formData, { method: 'post', headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          print.log(res.data.info);
          s_alert.Success('图片上传成功', '', 'success');
          _this.act.icon = res.data.info;
        })
        .catch(error => {
          console.log(error);
          s_alert.Warning('图片上传失败', '请检查网络状况，必要情况联系技术人员');
        });
    }
  }
};
</script>

<style scoped></style>
