<template>
    <x-product-item :elementData="viewModel"></x-product-item>
</template>

<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}, // 可视化编辑样式
        asyncflag: false
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
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, para)
        console.log('productItem', this.viewModel)
        this.asyncflag = true
      }
    }
  }
</script>
