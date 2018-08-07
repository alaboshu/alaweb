<template>
  <x-foot :elementData="viewModel" v-if="asyncflag"></x-foot>
</template>

<script>
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}, 
        asyncflag: false
      }
    },
    props: ['dataId'],
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        const para = {
          dataId: this.dataId,
          defaultId: '5b406cddfef00000a0000002'
        }
        this.viewModel = await this.$api.get(THEME_GETVALUE_GET, para)
        this.asyncflag = true
        // console.info('组件数据', this.viewModel)
      }
    }
  }
</script>


