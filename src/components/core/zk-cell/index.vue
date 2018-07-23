<template>
  <div class="zk-cell" :style="styles" component-path="core/zk-cell">
    <x-cell :elementData="viewModel" v-if="asyncflag"></x-cell>
  </div>
</template>

<script>
  import RouterLink from '@/mixins/router-link'
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    mixins: [RouterLink],
    props: {
      dataId: {
        type: String
      },
      widgetId: {
        type: String
      },
      pageValues: {}
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
      onClick (url) {
        if (url !== '') {
          this.$router.push(url)
        }
      },
      async  init () {
        if (this.pageValues !== undefined) {
          this.viewModel = this.pageValues
        } else {
          const parameter = {
            dataId: this.dataId,
            defaultId: '5b406cddfef00000a0000006'
          }
          this.viewModel = await this.$api.get(THEME_GETVALUE_GET, parameter)
          this.asyncflag = true
          console.info('zk-cell数据', this.viewModel)
        }
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
  .zk-cell {
    font-size: @font-size-base;
  }
</style>

