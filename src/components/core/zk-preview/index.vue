<template>
  <div class="zk-preview" :style="styles" component-path="core/zk-preview" v-if="asyncflag">
    <x-preview :elementData="viewModel"></x-preview>
  </div>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: {
      widget: {},
      previewId: {}
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
        if (this.widget !== undefined) {
          if (this.widget.value !== undefined) {
            this.viewModel = this.widget.value
          } else {
            const parameter = {
              dataId: this.widget.dataId,
              loginUserId: 0,
              id: this.previewId
            }
            console.info('previewId参数', parameter)
            var result = await this.$api.get(this.widget.apiUrl, parameter)
            this.viewModel = result
          }
        } else {
          console.error('错误:请传入priview数据!!')
        }
        this.asyncflag = true
        console.info('zk-priview数据', this.viewModel)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-preview {
    font-size: @font-size-base;
  }
</style>

