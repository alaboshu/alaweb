<template>
  <div class="zk-help-row" :style="styles" component-path="pc/zk-help-row" v-if="asyncflag">
    <p-help-row :elementData="viewModel"></p-help-row>
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
        // console.info('zk-help-row数据',this.viewModel)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-help-row {
    font-size: @font-size-base;
  }
</style>

