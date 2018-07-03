<template>
  <div class="zk-image" :style="styles">
    <div class="page">
      <ul class="lazyload-list">
        <li class="lazyload-list-item">
          <img class="lazyload-image" src="http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png">
        </li>
      </ul>
    </div>
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
  .zk-image {
    font-size: @font-size-base;
    .lazyload-list {
      display: block;
      overflow: hidden;
      width: 100%;
      padding: 0;
      margin: 0;
      text-align: center;
      list-style: none;

      .lazyload-list-item {
        width: 100%;
        margin: 5px auto;
      }

      .lazyload-image {
        display: block;
        width: 100%;
        height: 180px;
        // &[lazy='loading'] {
        //   width: 40px;
        //   height: 300px;
        //   margin: auto;
        // }
      }
    }
  }
</style>
