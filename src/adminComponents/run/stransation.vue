<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">赛事运营</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">沙漠掘金后台管理系统-参赛团队交易情况</h3>
          </div>
          <div class="form-group row">
              <form class="form-horizontal" role="form">  
                <div class="col-md-3">
                  <!-- <div class="col-md-4 control-label" style="color:red"><strong>团队名称</strong></div> -->
                  <div class="col-md-8">
                      <select class="form-control" v-model="choosedTeam_id" @change="getTranByTeam_id()">
                          <option v-for="(item,index) in team" :key="index" :value="item.id">{{item.name}}</option>
                      </select>
                  </div>
                </div>
              </form>
          </div> 
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>交易类型</th>
                    <th>物品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>状态</th>
                    <th>交易明细</th>
                    <th>卖方</th>
                    <th>买方</th>
                    <th>创建日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.type|formatType}}</td>
                    <td v-if="item.module">{{item.module.type | formatModule}}</td><td v-else></td>
                    <td>{{item.price}}</td> 
                    <td>{{item.number}}</td>
                    <td>{{item.condition}}</td>
                    <td>{{item.detail}}</td>
                    <td v-if="item.out">{{item.out.name}}</td><td v-else></td>
                    <td v-if="item.in">{{item.in.name}}</td><td v-else></td>
                    <td>{{item.created_at|formatTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 分页 -->
            <div class="col-sm-6">
              <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
            </div>
            <div class="col-sm-6">
              <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                <ul class="pagination" style="float:right">
                  <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                    <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                  </li>
                  <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                    <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                  </li>
                  <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
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
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../interface/apis");

const moment = require("moment");

export default {
  name: "stransaction",
  data() {
    return {
      choosedTeam_id:'',
      showTransaction: '',
      team:'',
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  mounted() {
    this.init()
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatType(x){
      if(x===-1) return '组委会处理';
      if(x===0) return '大本营交易';
      if(x===1) return '小组间交易';
      if(x===2) return '金块兑换';
    },
    formatModule(x){
      if(x===0) return '食物';
      if(x===1) return '水';
      if(x===2) return '帐篷';
      if(x===3) return '智者密函';
      if(x===4) return '金块';
    }
  },
  methods: {
    init(){
      this.getAllTeam();
    },
    // 获取按id查询的团队交易信息
    showAllTransaction(team_id) {
      apis.getAllTransationByTeamId(team_id)
      .then(res => {
          print.log(res.data);
          this.showTransaction = res.data.rows;
          // 分页
          this.currentPage='0'
          this.show(res.data.rows)
      })
    },
    //获取团队列表
    getAllTeam(){        
        apis.getAllTeam()
        .then(res => {
          this.team = res.data.rows;
          print.log('所有团队列表->',res.data.rows)
        })
    },
    // 选择团队显示交易信息
    getTranByTeam_id(){
      this.showAllTransaction(this.choosedTeam_id)
    },

    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    show(items) {
      this.items=items;
      this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
      //页面加载完成，默认加载第一页
      let page = Number(this.currentPage) + 1;
      this.showEachPage(page);
      print.log("当前数据总页为：--->", this.sumPage);
    },
    switchPage(page) {
      let p = page - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", page);
      this.showEachPage(page);
    },
    showEachPage(page) {
      let all = this.items;
      this.showItems = [];
      for (
        let i = (page - 1) * this.PageShowSum;
        i < page * this.PageShowSum;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.showItems.push(all[i]);
        }
      }
    },
    nextPage() {
      if (this.currentPage == this.sumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.currentPage) + 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
    previousPage() {
      if (this.currentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.currentPage) - 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    }
    //结束分页
  }
};
</script>

<style>
</style>
