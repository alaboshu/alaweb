<template>
  <div class="zk-notice" :style="styles" component-path="core/zk-notice" v-if="asyncflag">
    <x-notice :elementData="viewModel"></x-notice>
  </div>
</template>

<script>
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
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
          const parameter = {
            dataId: this.widget && this.widget.dataId,
            defaultId: '5b406cddfef00000a0000001'
          }
          this.viewModel = await this.$api.get(THEME_GETVALUE_GET, parameter)
        }
        this.asyncflag = true
        // console.info('zk-notice数据',this.viewModel)
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less'; 
  .zk-notice {
    font-size: @font-size-base;
  }
</style>

