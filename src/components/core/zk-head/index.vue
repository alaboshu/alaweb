<template>
  <div class="zk-head" :style="styles">
    <x-head :title="title">
      <div class="btn-back" slot="left">
        <div @click="$router.push(goBackUrl)" class="btn-back-left">
          <x-icon src="zk-arrows-left" size="20"></x-icon>{{backText}}
        </div>
      </div>
    </x-head>
    <div class="head-placeholder "></div>
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
      },
      goBackUrl: {
        type: String,
        default: '/'
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
      console.log('goBackUrl', this.goBackUrl)
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
  @import '~_style/index.less';
  .zk-head {
    font-size: @font-size-base;
    .head-placeholder {
      height: 50px;
    }
    .btn-back {
      .btn-back-left {
        display: flex;
        align-items: center;
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
</style>

