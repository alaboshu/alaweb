<template>
  <div id="app">
    <h1>APP</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data: function () {
        return {
            member: {}
        }
    },
    methods: {
        init () {
        }
    },
    created () {
        this.init();
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
