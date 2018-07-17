<template>
  <div class="zk-head" :style="styles">
    <x-header :title="title"></x-header>
  </div>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: {
      title: String,
      fixed: {
        type: Boolean,
        default: true
      },
      backText: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: String,
        default: '#21292c'
      }
    },
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
      // 设置标题 
      async  init () {
        // console.info('路由标题', this.$route.meta.title)
        if (this.title === undefined) {
          if (this.$route.meta !== undefined) {
            let routerTitle = this.$route.meta.title
            if (routerTitle !== undefined) {
              this.headerTitle = routerTitle
              console.info('路由信息', this.$router)
            }
          }
        } else {
          this.headerTitle = this.title
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-head {
  	font-size: @font-size-base;
  }
</style>

