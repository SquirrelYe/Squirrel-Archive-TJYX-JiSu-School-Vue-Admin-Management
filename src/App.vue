<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style>
table td {
  vertical-align: middle !important;
}

.some {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
