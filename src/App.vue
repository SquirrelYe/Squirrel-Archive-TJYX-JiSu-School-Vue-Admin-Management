<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
const async = require('async');
const notify = require('bootstrap-notify');
const s_alert = require('./utils/alert');

export default {
    name: "App",
    data() {
        return {

        };
    },
    mounted() {
        // 总是会执行
        // console.log('app.vue')
    },
    methods: {

    }
};
</script>

<style>

</style>
