<template>
  <div class="test" :style="styles">>{{viewModel}}</div>
</template>

<script>
  // import { DIY_GETLINK } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}
      }
    },
    mounted () {
      this.init() // 组件初始化
    },
    methods: {
      async  init () {
        // var para = {
        //   diyKey: 'grid_index'
        // }
        this.viewModel = await this.$api.get('api/user/info?id=1')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请尽可能的使用变量
  .test {
    font-size: @brand;
  }
</style>
