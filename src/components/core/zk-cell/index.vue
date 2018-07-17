<template>
  <div class="zk-cell" :style="styles">
    <x-cell></x-cell>
  </div>
</template>

<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
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
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, para)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-cell {
  	font-size: @font-size-base;
  }
</style>

