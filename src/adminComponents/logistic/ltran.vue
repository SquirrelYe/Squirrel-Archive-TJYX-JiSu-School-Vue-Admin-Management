<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">快递管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-快递管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control search-bar" placeholder="输入搜索快递订单用户名" v-model="searchkey" v-on:keyup.enter="search()" />
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-hover" id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>快递订单ID</th>
                        <th>用户名</th>
                        <th>数量</th>
                        <th>佣金</th>
                        <th>取货地址</th>
                        <th>送货联系</th>
                        <th>状态</th>
                        <th>校园大使</th>
                        <th>最近时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody v-if="showItem">
                      <tr class="gradeX" v-for="(item, index) in showItem.rows" :key="index" :class="item.condition >= 3 ? 'text-success' : ''">
                        <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                        <td>L{{ item.id }}</td>
                        <td v-if="item.cus">{{ item.cus.name }}</td>
                        <td v-else></td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.money }}</td>
                        <td>{{ item.from }}</td>
                        <td>{{ item.location.name }}:{{ item.location.phone }}</td>
                        <td>{{ item.condition | formatLogisticCondition }}</td>
                        <td v-if="item.tak">{{ item.tak.name }}</td>
                        <td v-else></td>
                        <td>{{ item.updated_at | formatTime }}</td>
                        <td class="actions">
                          <a @click="getMsg(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-book" data-toggle="tooltip" data-placement="top" title="查看快递短信"></i>
                          </a>
                          <a @click="getOrder(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-reorder" data-toggle="tooltip" data-placement="top" title="查看订单信息"></i>
                          </a>
                          <a @click="setOrder(item)" data-toggle="modal" data-target="#Model">
                            <i class="fa fa-arrow-right" data-toggle="tooltip" data-placement="top" title="派发大使订单"></i>
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

    <!-- 模态信息 -->
    <div id="Model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 0">查看快递短信</h4>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 1">查看订单信息</h4>
            <h4 class="modal-title" id="myModalLabel" v-if="judge == 2">派发大使订单</h4>
          </div>

          <!-- 查看快递短信 -->
          <div class="modal-body" align="center" v-if="judge == 0 && item">
            <h4>查看快递短信</h4>
            {{ item.key }}
          </div>

          <!-- 查看订单信息 -->
          <div class="modal-body" align="center" v-if="judge == 1 && item">
            <h4>查看订单信息</h4>
            <address class="ng-scope" v-if="item.cus && item.tak && item.location">
              <strong>发单用户:{{ item.cus.name }}</strong
              ><br />
              <strong>发单电话:{{ item.cus.phone }}</strong
              ><br />
              <strong>校园大使:{{ item.tak.name }}</strong
              ><br />
              <strong>大使电话:{{ item.tak.phone }}</strong
              ><br /><br />

              <strong>所在学校:{{ item.location.school }}</strong
              ><br />
              <strong>宿舍编号:{{ item.location.dom }}</strong
              ><br />
              <strong>补充说明:{{ item.location.detail }}</strong
              ><br />
              <strong>更新时间:{{ item.updated_at | formatTime }}</strong
              ><br />

              <hr />
            </address>
          </div>

          <!-- 派发大使订单 -->
          <div class="modal-body" align="center" v-if="judge == 2 && takes">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <div class="col-md-3 control-label" style="font-weight: 900"><strong>校园大使:</strong></div>
                <div class="col-md-9">
                  <select class="form-control" v-model="take">
                    <option v-for="(item, index) in takes" :key="index" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-body" align="center" v-if="judge == 2 && !takes"><h4>暂无校园大使</h4></div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-if="judge != 2">确认</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" v-else @click="toTake()">派发订单</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // 注册 state

const s_alert = require('../../utils/alert');
const ses = require('../../utils/ses');
const print = require('../../utils/print');
const apis = require('../../interface/apis');

const moment = require('moment');
const filter = require('../../filter/filter');
const page = require('../../interface/page');

export default {
  name: 'cardlist',
  data() {
    return {
      showItem: null,
      searchkey: null,

      offsize: 0,
      limit: 10,
      currentPage: 1,

      judge: 0,
      item: null,

      take: null,
      takes: null
    };
  },
  computed: { ...mapState(['school_id']) },
  filters: { ...filter },
  mounted() {
    this.init();
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
    // 获取所有快递订单
    findAndCountAll(offsize, limit) {
      apis.logistic.findAllBySchool(this.school_id, offsize, limit).then(res => {
        this.showItem = res.data;
        print.log('获取所有快递订单', res.data);
      });
    },
    getMsg(item) {
      this.item = item;
      this.judge = 0;
    },
    getOrder(item) {
      this.item = item;
      this.judge = 1;
      print.log('快递代取', this.item);
    },
    setOrder(item) {
      this.item = item;
      apis.user.findAndCountAllXYDS(0, this.school_id, 0, 1000).then(res => {
        this.takes = res.data.rows;
        this.judge = 2;
      });
    },
    toTake() {
      print.log(this.take, this.item);
      //  更改logistic状态
      apis.logistic.addTake(this.item.id, this.take, 1).then(res => {
        if (res.data[0] == 1) {
          s_alert.Success('派发成功', '', 'success');
          this.init();
        } else s_alert.Warning('派发失败！', '请联系技术人员');
      });
    },
    // 搜索
    search() {
      if (this.searchkey)
        apis.logistic.findAndCountAllLikeByNameSchool(this.searchkey, this.school_id).then(res => {
          this.showItem = res.data;
        });
      else this.init();
    }
  }
};
</script>

<style scoped></style>
