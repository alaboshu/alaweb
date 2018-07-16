<template>
  <div class="container">
    <!-- <component :is="current"></component> -->
  </div>
</template>

<script>
  // import Vue from 'vue'
  // export default {
  //   config: {
  //     title: '会员中心'
  //   },
  //   data () {
  //     return {
  //       clientType: '',
  //       template: '',
  //       current: ''
  //     }
  //   },
  //   mounted () {
  //     var comp = [{
  //       key: '/core/zk-grid/index.vue',
  //       name: 'root',
  //       position: { left: 100, top: 0 }
  //     }, {
  //       key: '/core/zk-grid/index.vue',
  //       name: 'root',
  //       position: { left: 100, top: 0 }
  //     }]

  //     for (var i = 0; i < comp.length; i++) {
  //       console.log(comp[i])
  //       this.recur(comp[i])
  //     }
  //     var myComponent = Vue.extend({
  //       template: '<div>' + this.template + '</div>'
  //       // components: {}
  //     })
  //     this.current = myComponent
  //   },
  //   methods: {
  //     recur (component) {
  //       if (component != null) {
  //         var citem = require('@/components' + component.key + '').default
  //         Vue.component(component.name, citem)
  //         this.template += '<' + component.name + '></' + component.name + '>'
  //         // console.log(this.template)
  //       }
  //     }
  //   }
  // }
</script>

<style scoped lang="less">
</style>
