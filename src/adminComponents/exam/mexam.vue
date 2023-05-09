<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">考试二级菜单管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-考试管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <button class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#Model" @click="creat()">添加考试二级菜单<i class="fa fa-plus"></i></button>
                <input type="text" class="form-control search-bar" placeholder="输入搜索考试二级菜单名称" v-model="searchkey" v-on:keyup.enter="search()" />
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>考试二级菜单ID</th>
                        <th>名称</th>
                        <th>状态</th>
                        <th>从属一级菜单</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item, index) in showItem.rows" :key="index" :class="item.condition == -1 ? 'text-danger' : ''">
                        <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                        <td>EM{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.condition | formatExamCondition }}</td>
                        <td>{{ item.exam.title }}</td>
                        <td>{{ item.created_at | formatTime }}</td>
                        <td class="actions">
                          <a @click="eItem(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-navicon" data-toggle="tooltip" data-placement="top" title="查看子类项目"></i>
                          </a>
                          <a @click="editItem(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="编辑二级菜单"></i>
                          </a>
                          <a @click="DeleteItem(item)">
                            <i class="fa fa-times" data-toggle="tooltip" data-placement="top" title="删除二级菜单"></i>
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
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 0">新建考试二级菜单信息</h4>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 1">修改考试二级菜单信息</h4>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 2">查看考试二级菜单信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <!-- 新建 -->
                    <form class="form-horizontal" role="form" v-if="judge == 0">
                      <div class="form-group">
                        <div class="col-md-2 control-label" style="font-weight: 900"><strong>一级菜单:</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="first">
                            <option v-for="(item, index) in firstItems" :key="index" :value="item.id">{{ item.title }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-10">
                          <input type="text" class="form-control" v-model="name" />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-2 control-label" style="font-weight: 900"><strong>状态:</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="condition">
                            <option v-for="(item, index) in conditions" :key="index" :value="item.x">{{ item.x | formatExamCondition }}</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <!-- 编辑 -->
                    <form class="form-horizontal" role="form" v-if="judge == 1 && eitem">
                      <div class="form-group">
                        <div class="col-md-2 control-label" style="font-weight: 900"><strong>一级菜单:</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="eitem.exam_id">
                            <option v-for="(item, index) in firstItems" :key="index" :value="item.id">{{ item.title }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-10">
                          <input type="text" class="form-control" v-model="eitem.title" />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-2 control-label" style="font-weight: 900"><strong>状态:</strong></div>
                        <div class="col-md-10">
                          <select class="form-control" v-model="eitem.condition">
                            <option v-for="(item, index) in conditions" :key="index" :value="item.x">{{ item.x | formatExamCondition }}</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <!-- 子类 -->
                    <div class="table-responsive" v-if="judge == 2">
                      <table style="table-layout: fixed" class="table table-bordered table-striped table-hover" id="datatable-editable" v-if="sitem.eitems">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>logo</th>
                            <th>名称</th>
                            <th>标题</th>
                            <th>价格</th>
                            <th>详细信息</th>
                            <th>状态</th>
                          </tr>
                        </thead>
                        <tbody v-if="sitem">
                          <tr class="gradeX" v-for="(item, index) in sitem.eitems" :key="index">
                            <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                            <td>EI-{{ item.id }}</td>
                            <td><img :src="host + item.logo" alt="logo" class="img-thumbnail img-responsive" style="width: 100px" /><br /></td>
                            <td>{{ item.name }}</td>
                            <td class="some" :title="item.title">{{ item.title }}</td>
                            <td>{{ item.price }}</td>
                            <td class="some" :title="item.title">{{ item.detail }}</td>
                            <td>{{ item.condition | formatExamItemCondition }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="panel-heading" v-else><h4>暂无子类信息</h4></div>
                    </div>
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
  name: 'mexam',
  data() {
    return {
      firstItems: null,
      showItem: null,
      searchkey: null,

      offsize: 0,
      limit: 10,
      currentPage: 1,

      judge: 0,
      conditions: [{ x: -1 }, { x: 0 }],

      first: null,
      name: null,
      condition: null,

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
    this.findFirstMenu();
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
    // 获取一级菜单
    findFirstMenu() {
      apis.exam.findAllBySchool(this.school_id, 0, 100).then(res => {
        this.firstItems = res.data.rows;
        print.log('考试一级菜单', res.data);
      });
    },
    // 获取所有考试二级菜单
    findAndCountAll(offsize, limit) {
      apis.mexam.findAllBySchool(this.school_id, offsize, limit).then(res => {
        this.showItem = res.data;
        print.log('考试二级菜单', res.data);
      });
    },
    creat() {
      this.judge = 0;
      (this.first = null), (this.name = null);
      this.condition = null;
    },
    // 新增二级菜单
    toCreat() {
      print.log(this.name, this.condition);
      if (this.first != null && this.name != null && this.condition != null) {
        apis.mexam.creat(this.first, this.name, this.condition, this.school_id).then(res => {
          s_alert.Success('新建二级菜单成功!', '成功新建一个菜单考试二级菜单', 'success');
          this.init();
        });
      } else s_alert.Warning('新建二级菜单失败', '输入非法');
    },
    editItem(item) {
      this.judge = 1;
      this.eitem = JSON.parse(JSON.stringify(item));
    },
    toEdit() {
      print.log(this.eitem);
      if (this.eitem != null) {
        apis.mexam.update(this.eitem.id, this.eitem.exam_id, this.eitem.title, this.eitem.condition).then(res => {
          if (res.data[0]) {
            s_alert.Success('编辑二级菜单成功!', '成功编辑一个菜单考试二级菜单', 'success');
            this.init();
          } else s_alert.Warning('编辑失败', '请联系技术人员');
        });
      } else s_alert.Warning('新建二级菜单失败', '输入非法');
    },
    eItem(item) {
      this.judge = 2;
      this.sitem = item;
    },
    // 删除考试二级菜单
    DeleteItem(item) {
      if (confirm(`你确定要删除${item.title}？`)) {
        apis.mexam.delete(item.id).then(res => {
          s_alert.Success('删除成功!', '成功移除了一个考试二级菜单', 'success');
          this.init();
        });
      }
    },
    // 搜索
    search() {
      if (this.searchkey)
        apis.mexam.findAndCountAllLikeByNameSchool(this.searchkey, this.school_id).then(res => {
          this.showItem = res.data;
        });
      else this.init();
    }
  }
};
</script>

<style scoped></style>
