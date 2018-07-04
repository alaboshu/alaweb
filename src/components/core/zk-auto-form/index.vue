<template>
  <div class="zk-auto-form" :style="styles">
    <div class="">{{viewModel}}</div>
  </div>
</template>

<script>
  import { DIY_GETLINK_GET } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        const para = {
          diyKey: 'grid_index'
        }
        this.viewModel = await this.$api.get(DIY_GETLINK_GET, para)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-auto-form {
    font-size: @font-size-base;
  }
</style>

