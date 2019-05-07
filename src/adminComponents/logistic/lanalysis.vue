<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">快递流水管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">极速校园后台管理系统-快递管理</h3>
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

const moment = require('moment');
const filter = require("../../filter/filter");
const page = require("../../interface/page");

export default {
  name: "cardcode",
  data() {
    return {
      userItem:null,
      searchkey:null,

    };
  },
  filters:{ ...filter },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    ...page,
    init(){  }    
  }
};
</script>

<style scoped>

</style>