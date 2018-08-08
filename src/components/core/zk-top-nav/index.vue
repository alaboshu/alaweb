<template>
  <div class="zk-top-nav" :style="styles" component-path="core/zk-top-nav" v-if="asyncflag">
    <x-top-nav :elementData="viewModel"></x-top-nav>
  </div>
</template>

<script>
  import { COMMON_GETAUTOCONFIG_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: {
      widget: {}
    },
    data () {
      return {
        viewModel: '',
        asyncflag: false,
        styles: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.widget !== undefined && this.widget.value !== undefined) {
          this.viewModel = this.widget.value
        } else {
          // 获取配置
          this.viewModel = await this.$api.get(COMMON_GETAUTOCONFIG_GET, 'configKey=WebSiteConfig')
        }
        this.asyncflag = true
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-top-nav {
  	font-size: @font-size-base;
  }
</style>

