<template>
  <view class="zk-product-image" v-if="widgetModel">
    <productItem1 :viewModel="viewModel" v-if="widgetModel.productType == 1"></productItem1>
    <productItem2 :viewModel="viewModel" v-if="widgetModel.productType == 2"></productItem2>
    <productItem3 :viewModel="viewModel" v-if="widgetModel.productType == 3"></productItem3>
    <productItem4 :viewModel="viewModel" v-if="widgetModel.productType == 4"></productItem4>
  </view>
</template>

<script>
  import productItem1 from './styles/product-item-1'
  import productItem2 from './styles/product-item-2'
  import productItem3 from './styles/product-item-3'
  import productItem4 from './styles/product-item-4'
  export default {
    components: {
      productItem1,
      productItem2,
      productItem3,
      productItem4
    },
    props: {
      widget: {}
    },
    data () {
      return {
        viewModel: [],
        widgetModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widget && this.widget.value) {
          this.widgetModel = this.widget.value
        }
        var response = await this.$api.httpGet('/Api/Product/List')
        if (response.status === 1) {
          this.viewModel = response.result
        }
        console.info('aaaaaaaaaaaa', this.viewModel)
      }
    }
  }
</script>
