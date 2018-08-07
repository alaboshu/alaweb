<template>
  <div class="zk-grid" :style="styles" component-path="core/zk-grid" v-if="asyncflag" :data-id="dataId">
    <x-grid :col="columnCount" :elementData="viewModel" v-if="asyncflag"></x-grid>
  </div>
</template>
<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  export default {
    name: 'zk-grid',
    data () {
      return {
        viewModel: '',
        styles: {},
        asyncflag: false
      }
    },
    props: {
      dataId: {
        type: String,
        default: '5b406cddfef00000a0000001'
      },
      columnCount: {
        type: Number,
        default: 4
      }
    },
    created () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        console.info('数据Id', this.dataId)
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, 'dataId=' + this.dataId)
        this.asyncflag = true
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
</style>
