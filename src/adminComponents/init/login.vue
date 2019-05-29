<template>
    <div>
        <div class="wrapper-page">
            <div class="panel panel-color panel-primary panel-pages">
                <div class="panel-heading bg-img">
                    <div class="bg-overlay"></div>
                    <h3 class="text-center m-t-10 text-white">天津毅襄科技发展有限公司</h3>
                    <br>
                    <h3 class="text-center text-white" style="font-size:30px;">极速校园后台管理系统</h3>
                </div>

                <div class="panel-body">
                    <div class="form-horizontal m-t-20">
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input
                                    class="form-control input-lg"
                                    type="text"
                                    required
                                    placeholder="用户名"
                                    v-model="name"
                                    v-on:keyup.enter="login()"
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12">
                                <input
                                    class="form-control input-lg"
                                    type="password"
                                    required
                                    placeholder="密码"
                                    v-model="pass"
                                    v-on:keyup.enter="login()"
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="checkbox checkbox-primary">
                                    <input id="checkbox-signup" type="checkbox" v-model="check">
                                    <label for="checkbox-signup">记住我</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group text-center m-t-40">
                            <div class="col-xs-12">
                                <button class="btn btn-primary btn-lg w-lg waves-effect waves-light" @click="login()" >登录</button>
                            </div>
                        </div>

                        <div class="form-group m-t-30">
                            <div class="col-sm-7">
                                <a href="javascript:void(0)" @click="confirmadmin()">
                                    <i class="fa fa-lock m-r-5"></i> 忘记密码？
                                </a>
                            </div>
                            <div class="col-sm-5 text-right" @click="confirmadmin()">
                                <a href="javascript:void(0)">创建新用户</a>
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

import app from "../../App.vue";
import {mapMutations} from 'vuex'
var App = app;

export default {
    name: "login",
    data() {
        return {
            name: null,
            pass: null,
            check: true
        };
    },
    mounted() {},
    beforeRouteEnter(to, from, next) {
        next();
    },
    methods: {
        ...mapMutations(['LOGIN']),
        login() {
            if (this.name == null || this.pass == null) {
                s_alert.basic("用户名或密码不能为空");
            } else {
               apis.user.login(this.name , this.pass)
               .then(res => {
                    if (res) {
                        print.log(res.data)
                        if(res.data.type == 1){
                            localStorage.setItem('token', res.data.token) //存储token
                            localStorage.setItem('user', res.data.id) //存储用户
                            localStorage.setItem('school_id', res.data.school_id) //存储管理学校
                            this.LOGIN({
                                token: res.data.token,
                                user: res.data.id,
                                school_id: res.data.school_id
                            });
                            s_alert.Success( "登录成功！", "现在可以对系统进行设置", "success" );
                            this.$router.push({ name: "menu" });
                        }else{
                            s_alert.Success( "没有权限进入！", "此系统仅限管理员能操作", "warning" )
                        }
                    }else{
                        s_alert.Success( "用户名或密码错误！", "请检查后重试", "warning" )
                    }
                    
                })
            }
        },
        confirmadmin() { s_alert.Success( "重要", "请联系管理员进行注册、找回密码", "warning" ); },
        test(){
            for (let i = 0; i < 50; i++) {
                apis.user.findAndCountAll(0,10).then(res=> { print.log(res.data)})
            }
        }
    }
};
</script>

<style scoped>
</style>
