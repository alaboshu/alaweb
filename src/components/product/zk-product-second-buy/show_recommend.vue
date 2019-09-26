<template>
  <view>
    <view class="show-recommend" v-if="isFrontShowPrice">
      <view class="intro-title" id="showIntro">
        推荐商品
      </view>
      <zk-product-item ref="product_item"></zk-product-item>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        isFrontShowPrice: true
      }
    },
    props: {
      widget: {},
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var list = await this.$api.httpGet('Api/Product/GetRelation', { productId: this.productView.id })
        var data = {
          productItems: list.result
        }
        this.$refs.product_item.$emit('toProductItem', data)
        this.isFrontShowPrice = this.productView.isFrontShowPrice
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/style/variable.scss";

  .show-recommend {
    .intro-title {
      width: 100%;
      height: 35px;
      color: #000;
      text-align: center;
      line-height: 35px;
      font-weight: bold;
    }
  }
</style>
