<template>
  <div class="zk-footer" :style="styles">
    <!-- <div class="weui-tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
        <span style="display: inline-block;position: relative;">
          <img src="" alt="" class="weui-tabbar__icon">
          <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
        </span>
        <p class="weui-tabbar__label">微信</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <img src="" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">通讯录</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <img src="" alt="" class="weui-tabbar__icon">
          <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
        </span>
        <p class="weui-tabbar__label">发现</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <img src="" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我</p>
      </a>
    </div> -->
  </div>
</template>

<script>
  import { DIY_GETLINK } from '@/service/api/apiUrl' // 引入Api接口常量
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
        this.viewModel = await this.$api.get(DIY_GETLINK, para)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-footer {
    font-size: @font-size-base;
    .footer-placeholder {
      height: 56px;
    }
  }
</style>

