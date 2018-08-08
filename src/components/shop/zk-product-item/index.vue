<template>
  <div component-path="shop/zk-product-item">
    <x-product-item :elementData="viewModel"></x-product-item>
  </div>
</template>

<script>
  import { PRODUCT_LIST_GET } from '@/service/api/apiUrl'
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
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.viewModel = await this.$api.get(PRODUCT_LIST_GET)
        this.asyncflag = true
      }
    }
  }
</script>
