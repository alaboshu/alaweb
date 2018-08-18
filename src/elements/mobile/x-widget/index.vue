<template>
  <div v-if="viewModel">
    <div v-for="(widget,index) in viewModel" :key="index ">
      <zk-swiper :widget="widget" v-if="widget.componentPath==='theme/zk-swiper'"></zk-swiper>
      <zk-grid :widget="widget" v-if="widget.componentPath==='theme/zk-grid'"></zk-grid>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-widget',
    props: {
      widgets: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widgets !== undefined) {
          this.viewModel = this.widgets
          console.info('x-widgets', this.viewModel)
        }
      }
    }
  }
</script>

