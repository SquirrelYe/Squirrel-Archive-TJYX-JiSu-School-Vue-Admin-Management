<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="pull-left page-title">赛事运营</h4>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">沙漠掘金后台管理系统-日程管理</h3>
                    </div>
                    <!-- 日程管理 -->
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="table-responsive">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">当前日程</h3>
                                    </div>
                                    <table class="table table-bordered table-striped" id="datatable-editable" >
                                        <thead>
                                            <tr>
                                                <th>当前赛事</th>
                                                <th>日程持续时间(分钟)</th>
                                                <th>当前日程</th>
                                                <th>开启天气显示</th>
                                                <th>执行操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="showGameItems">
                                            <tr>
                                                <td>{{showGameItems.name}}</td>
                                                <td>{{showGameItems.stay}}</td>
                                                <td style="color:red" v-if="showGameItems.day">{{showGameItems.day.day}}</td>
                                                <td style="color:red">{{showGameItems.judgewhether | formatJudgeWhether}}</td>
                                                <td class="actions" align="center">
                                                    <a class="on-default remove-row font-weight-bold" @click="nextYear(showGameItems)" href="javascript:void(0)" >进入下一日程</a>
                                                    <a class="on-default remove-row font-weight-bold" @click="openWhether(showGameItems)" href="javascript:void(0)" >开启天气显示</a>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 资金流清算 -->
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="table-responsive">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">参赛团队资产清算 
                                            <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="刷新" style="color:red" @click="getTeamItems">
                                                刷新
                                            </a>
                                        </h3>
                                    </div>
                                    <table class="table table-bordered table-striped" id="datatable-editable" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>团队名称</th>
                                                <th>所处位置</th>
                                                <th>所处日期</th>
                                                <th>可用金币</th>
                                                <th>剩余载重</th>
                                                <th>更新时间</th>
                                                <th>执行操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="gradeX" v-for="(item,index) in showStasticsItems" :key="index">
                                                <td>{{index}}</td>
                                                <td>{{item.name}}</td>
                                                <td>P{{item.map_id}}</td>
                                                <td v-if="item.day">{{item.day.day}}</td>  <td v-else></td>
                                                <td v-if="item.statistic">{{item.statistic.money}}</td>  <td v-else></td>
                                                <td v-if="item.statistic">{{item.statistic.load}}</td>  <td v-else></td>
                                                <td>{{item.updated_at|formatTime}}</td>
                                                <td class="actions" align="center">
                                                    <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="向团队增减物品"  @click="tran(item)">
                                                        <i class="fa  fa-tags" data-toggle="modal" data-target="#toteam" ></i>
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
        <!-- 指向团队转账 -->
        <div id="toteam" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">向团队增减物品</h4>
                </div>
                <div class="modal-body" align='center'> 
                    <form class="form-horizontal" role="form">
                        <div class="form-group">     
                            <label class="col-sm-2 control-label">物品:</label>                       
                            <div class="col-md-9">
                                <select class="form-control" v-model="thing">
                                    <option v-for="(item,index) in showThingItem" :key="index" :value="item.id">{{item.type | formatType}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">数量:</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control"  v-model="number"  placeholder="0" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">备注:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="detail" placeholder="请输入转账原因">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-sm-8 control-label">注意：以上输入框——正值增加，负值减少</label> 
                        </div>
                    </form>  
                             
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="updateStatistics()">确认更改</button>
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

const async=require('async')

export default {
  name: "syear",
  data() {
    return {
        showGameItems: null,
        showStasticsItems: null,
        showThingItem:null,

        thing:null,
        number:0,
        detail:null,

        // 计算折旧
        diggerDeprelief:[],
        lineDeprelief:[],

    };
  },
  mounted() {
      this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters: {
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatType(x){
        if(x==-1) return '金币';
        if(x==0) return '食物';
        if(x==1) return '水';
        if(x==2) return '指南针';
        if(x==3) return '帐篷';
        if(x==4) return '智者密函';
        if(x==5) return '金块';
    },
    formatJudgeWhether(x){
        if(x==0) return '关闭';
        if(x==1) return '开启';
    }
  },
  methods: {
    init() {
        this.getCurrentGameInfo();
        this.getTeamItems();
        this.getThingItem();
    },
    // 当前赛事信息
    getCurrentGameInfo(){
        apis.getOneGameById(JSON.parse(ses.getSessionStorage("gameinfo")).id)
        .then( res=>{
            print.log('当前赛事信息',res.data)
            this.showGameItems = res.data
        })
    },
    // 获取参赛团队资产信息
    getTeamItems() {
        apis.getAllTeamByGameId(JSON.parse(ses.getSessionStorage("gameinfo")).id)
        .then(res => {
          print.log('获取参赛团队资产信息',res.data);
          this.showStasticsItems=res.data.rows
        })
    },
    // 获取物品信息
    getThingItem(){
        apis.getAllThing()
        .then(res=>{
            print.log('获取物品信息',res.data.rows)
            this.showThingItem=res.data.rows
        })
    },
    // 点击进入下一日程
    nextYear(item) {
        print.log('当前比赛信息',item)
        if (confirm("你确定要进入下一日程？这将对参赛者资产进行清算！")) {
            this.updateDay(item);
        }
    },
    // 开启天气显示
    openWhether(item){
        print.log('当前比赛信息',item)
        if (confirm("你确定要开启天气显示？")) {
            
        }
    },
    // 更新日程信息
    updateDay(item) {
        let game = item;  // 当前赛事信息
        let team = this.showStasticsItems   //  所有团队信息
        //  判断能否进入下一天（时间最大25，所有人必须位于当前日期）
        if(game.day.day < 25){
            // 判断所有团队信息
            let judge = true
            let nteam = []
            for (let i = 0; i < team.length; i++) {
                const e = team[i].day.day;
                if(e != game.day.day){
                    judge = false;
                    nteam.push(team[i].name)
                }
            }
            if(!judge){
                s_alert.Success('还有团队未操作',`未操作的团队清单为：${nteam}`,'warning')
            }else{
                // 执行资产清算
                this.updateRelief(game,team);
            }
        }else{
            s_alert.Success('最后一天啦','第25天为最后一天，再无后续日期可以进入！','warning')
        }
    },
    // 点击转账到此团队，中转信息
    tran(model){
        print.log('当前选中转移资产团队资产信息',model)
        this.currentStastics=model
    },
    // 更改资产
    updateStatistics(){
        print.log(this.thing,this.number,this.detail)
        
        // // 更新资产信息
        // req.post_Param('api/ent/statistic',{
        //     'judge':3,
        //     'id':this.currentStastics.id,
        //     'money':money,
        //     'load':load,
        //     'food':food,
        //     'water':water,
        //     'compass':compass,
        //     'tent':tent,
        //     'secret':secret,
        //     'gold':gold
        // })
        // // 写入交易信息
        // req.post_Param('api/ent/transaction',{
        //     'judge':1,
        //     'game_id':JSON.parse(ses.getSessionStorage("gameinfo")).id,
        //     'type':-1,
        //     'me':this.currentStastics.team_id,
        //     'detail':`组委会改动：${this.detail}`
        // })
        // .then(res => {
        //     print.log(res.data);
        //     s_alert.Success("资金信息更新成功!", "参赛者资产信息更新成功", "success");
        //     this.init()
        // })
    },

    // ---------------------------------------------------资产清算---------------------------------------------------
    updateRelief(game,team){   
        s_alert.Warning('正在统计资产信息，请稍等……','固定资产更新成功会在右上角提示')

        for (let i = 0; i < team.length; i++) {
            let cteam = team[i]
            print.log('执行团队资产信息更新--->',cteam)
            //对资产扣除价值初始化.
            let index=i
            this.diggerDeprelief[index]=0
            // 找到天气
            let land = cteam.map.land
            let cwhether
            if (land == 0) cwhether = cteam.day.whether_village   //    大本营天气随村庄
            if (land == 1) cwhether = cteam.day.whether_desert
            if (land == 2) cwhether = cteam.day.whether_oasis
            if (land == 3) cwhether = cteam.day.whether_village
            if (land == 4) cwhether = cteam.day.whether_tomb
            if (land == 5) cwhether = cteam.day.whether_gold
            print.log(land ,cwhether)
            //循环计算扣除信息
            


            // let that=this
            // async.series([
            //     //串行同时执行
            //     function(callback) {          
            //         //计算挖掘机折旧      
            //         that.getMiningDigger(index,cid,callback);
            //     },
            //     function(callback) {
            //         // 计算生产线折旧
            //         that.getInduslandFactory(index,cid,callback);
            //     }],
            //     function(err, results) {
            //         //等上面两个执行完返回结果
            //         print.log('更新固定资产统计信息',results)
            //         if(i==that.showStasticsItems.length-1){
            //             that.updateFixedMoney(cid,re,results,1)
            //         }else{
            //             that.updateFixedMoney(cid,re,results,0)
            //         }
            //     })            
        };
    },
    // 获取 矿区 - 挖掘机
    getMiningDigger(index,cid,callback){
        req.post_Param('api/ass/mining_digger',{
            'judge':5,
            'company_id':cid
        })
        .then(res => {
            // print.log('矿区 - 挖掘机',res.data)
            this.diggerDeprelief[index]=0
            for (let i = 0; i < res.data.length; i++) {  //对矿区 循环，找到某一个矿区
                const w = res.data[i];
                let kdepre=w.deprelief; //找到某一矿区 折旧减免值
                for (let j = 0; j < w.diggers.length; j++) {  //对挖掘机 进行循环，找到某一类挖掘机
                    const wjj = w.diggers[j];
                    let totalDepre=(1-kdepre)*wjj.deprelief*wjj.mining_digger.number*wjj.price;
                    this.diggerDeprelief[index]+=totalDepre
                }
            }
            print.log('统计所有的挖掘机折旧',this.diggerDeprelief[index])   
            callback(null, this.diggerDeprelief[index]);
        })
    },
    // 获取 工业用地 - 工厂
    getInduslandFactory(index,cid,callback){
        req.post_Param('api/ass/indusland_factory',{
            'judge':4,
            'company_id':cid
        })
        .then(res => {
            print.log('工业用地 - 工厂',res.data)
            this.lineDeprelief[index]=0
            if(res.data.length>0){      //如果存在工业用地
                let judgeHaveFactory=0;
                for (let i = 0; i < res.data.length; i++) {  //对工业用地循环 找到 工业用地-工厂 中间表，从而获取到 对应的生产线
                    const w = res.data[i];
                    let idepre=w.repurchase; //找到某一工业用地 折旧减免值
                    // 判定有工业用地 是否有 工厂                    
                    if( w.factories.length!=0){            // 有工厂
                        judgeHaveFactory++;
                        for (let j = 0; j < w.factories.length; j++) {  //对工业用地下的 工厂 进行循环，找到中间表id，从而找到 对应的生产线
                            let judgeHaveLine=0;
                            if(w.factories[j].indusland_factory!=null){     //有生产线
                                judgeHaveLine++;
                                const infa = w.factories[j].indusland_factory.id;
                                //对找到的 中间表id，寻找生产线，计算折旧
                                // print.log('工业用地 - 工厂、中间表id',infa)
                                //逐层回调，找到最终结果
                                if(i==res.data.length-1 && j==w.factories.length-1){
                                    this.getLineDepre(index,infa,idepre,callback,true);
                                }else{
                                    this.getLineDepre(index,infa,idepre,callback,false);
                                }
                            }else{
                                if(j==w.factories.length-1 && judgeHaveLine==0){
                                    this.lineDeprelief[index]=0
                                    callback(null,this.lineDeprelief[index])
                                }
                            }
                            
                        }
                    }else{          // 无工厂
                        if(i==res.data.length-1 && judgeHaveFactory==0){
                            this.lineDeprelief[index]=0
                            callback(null,this.lineDeprelief[index])
                        }
                    }
                    
                }
            }else{      //如果不存在工业用地
                this.lineDeprelief[index]=0
                callback(null, this.lineDeprelief[index]);
            }
        })
    },
    // 获取 工业用地 - 工厂 - 生产线
    getLineDepre(index,infa,idepre,callback,sure){  //infa,idepre 分别为 中间表id与 工业用地 折旧减免值
        req.post_Param('api/ass/indusland_factory_line',{
            'judge':8,
            'indusland_factory_id':infa
        })
        .then(res => {
            // print.log('工业用地 - 工厂 - 生产线',res.data)
            for (let i = 0; i < res.data.length; i++) {  //对中间表-生产线 信息 循环，从而获取到 对应的生产线 & 数量
                const w = res.data[i];
                for (let j = 0; j < w.lines.length; j++) {  //对工业用地 - 工厂 - 生产线 进行循环，找到生产线，从而找到 对应的生产线 折旧率
                    const line = w.lines[j];
                    let totalDepre=(1-idepre)*line.relief*line.indusland_factory_line.number*line.price;
                    this.lineDeprelief[index]+=totalDepre
                }
            }
            if(sure){
                print.log('统计所有的生产线折旧',this.lineDeprelief[index])   
                callback(null, this.lineDeprelief[index]);
            }
        })
    },
    // 更新团队资产
    updateFixedMoney(cid,re,result,judge){
        print.log(re,result)
        let fixed=Number(re.fixed)-(Number(result[0])+Number(result[1]));
        let total=Number(re.total)-(Number(result[0])+Number(result[1]));
        // 更新个人资产
        req.post_Param('api/statistic',{
            'judge':4,
            'company_id':cid,
            'fixed':fixed,
            'total':total
        })
        .then(res => {
            if(res.data){
                $.notify(
                    {message: `${re.company.name}->团队资产更新成功！减少${(Number(result[0])+Number(result[1])).toFixed(2)}w`},
                    {type: "success"}
                );
                // 写入交易信息
                req.post_Param('api/transaction',{
                    'judge':1,
                    'id':0,
                    'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                    'inout':1,
                    'type':4,
                    'kind':3,
                    'price':Number(result[0])+Number(result[1]),
                    'number':1,
                    'me':cid,
                    'detail':`固定资产折旧：${Number(result[0])+Number(result[1])}`
                })
                this.init()
                if(judge==1){
                    swal("更新日程信息成功!", "参赛者资产信息更新成功", "success");
                }
            }else{
                $.notify(
                    {message: `${re.company.name}->资产更新失败！请检查！！`},
                    {type: "warning"}
                );
                this.init()
            }
        })        
    }
  }
};
</script>

<style>

</style>
