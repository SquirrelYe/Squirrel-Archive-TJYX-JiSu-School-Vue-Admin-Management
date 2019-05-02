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
            <h3 class="panel-title">沙漠掘金后台管理系统-参赛团队资产情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <button class="btn btn-icon waves-effect waves-light btn-warning m-b-5" data-toggle="tooltip" data-target="#statistics" data-placement="top" title="初始化团队资产">
                <i class="fa fa-wrench" data-toggle="modal" data-target="#statistics"></i> 
              </button>
              <button class="btn btn-icon waves-effect waves-light btn-danger m-b-5" data-toggle="tooltip" data-target="#statistics" data-placement="top" title="删除所有团队资产" @click="deleteAll()"> 
                <i class="fa fa-remove"></i>
              </button>
              <table class="table table-striped table-hover" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>团队名称</th>
                    <th>可用资金</th>
                    <th>剩余载重</th>
                    <th>食物</th>
                    <th>水</th>
                    <th>指南针</th>
                    <th>帐篷</th>
                    <th>智者密函</th>
                    <th>金块</th>
                    <th>更新时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                    <td>{{index}}</td>
                    <td v-if="item.team">{{item.team.name}}</td>  <td v-else></td>
                    <td>{{item.money}}</td>
                    <td>{{item.load}}</td>
                    <td>{{item.food}}</td>
                    <td>{{item.water}}</td>
                    <td>{{item.compass}}</td>
                    <td>{{item.tent}}</td>
                    <td>{{item.secret}}</td>
                    <td>{{item.gold}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p><strong>注意:资产信息在比赛过程中会随时变化，刷新页面以获取最新信息。</strong></p>
          </div>
        </div>
      </div>
    </div>    

    <!-- statistics -->
    <div id="statistics" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">参赛者团队资产初始化</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>资产初始化</h4></div>
                        <div class="panel-body">
                          <form class="form-horizontal" role="form">
                              <div class="form-group">
                                  <label for="inputEmail3" class="col-sm-3 control-label">初始资金</label>
                                  <div class="col-sm-9">
                                    <input type="number" class="form-control" placeholder="100" v-model="money">
                                  </div>
                              </div>      
                              <div class="form-group">
                                  <label for="inputEmail3" class="col-sm-3 control-label">初始载重</label>
                                  <div class="col-sm-9">
                                    <input type="number" class="form-control" placeholder="100" v-model="load">
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
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="initStastics()">初始化资产</button>
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
const notify = require("bootstrap-notify");

const moment = require("moment");

export default {
  name: "statistics",
  data() {
    return {
      showItems:null,

      // 初始化资产
      money:100,
      load:100
    };
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  mounted() {
    this.init()
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    init(){
      this.showAllStastics();
    },
    // 获取比赛参赛团队资产信息
    showAllStastics() {
      apis.getAllStatisticByGameId(JSON.parse(ses.getSessionStorage('gameinfo')).id)
      .then(res => {
          print.log(res.data);
          this.showItems = res.data.rows;
      })
    },
    // 初始化参赛者团队资产信息
    initStastics(){
      apis.getAllTeam()
      .then(res=>{
        print.log('所有的团队信息->',res.data.rows)
        for (let i = 0; i < res.data.rows.length; i++) {
          const e = res.data.rows[i];
          apis.creatOneStatistic(e.game_id,e.id,this.money,this.load)
          .then(msg=>{
            print.log(msg.data)
            if(i==res.data.rows.length-1){
              this.init()
              s_alert.Success("参赛团队资产初始化成功!", `你成功初始化了${res.data.rows.length}个参赛团队资产信息！`, "success");              
            }
          })
        }
      })
    },
    // 删除所有团队资产信息
    deleteAll(){
      if(confirm('这将清空所有参赛者资产信息！请确认！')){
        apis.deleteAllByStatisticGameId(JSON.parse(ses.getSessionStorage('gameinfo')).id)
        .then(res=>{
          if(res.data.affectRows !== 0){
            this.init()
            s_alert.Success("删除成功!", "成功清空所有资产信息", "success");
          }else{
            this.init()
            s_alert.Success("删除失败!", "请检查", "warning");
          }
        })
      }
    }
  }
};
</script>

<style>
</style>
