// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/index'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.$axios = axios
Vue.prototype.$uploadpath = 'http://127.0.0.1:11130/upload'
Vue.prototype.$host = 'http://127.0.0.1:11130/'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})