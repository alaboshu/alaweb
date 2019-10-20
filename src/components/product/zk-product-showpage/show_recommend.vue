<template>
  <view>
    <view class="show-recommend">
      <view class="intro-title" id="showIntro">
        推荐商品
      </view>
      <zk-product-item ref="product_item" :showPrice="isFrontShowPrice"></zk-product-item>
    </view>
  </view>
</template>

<script>
  import { setTimeout } from 'timers'
  export default {
    data () {
      return {
        isFrontShowPrice: true,
        isLoading: false
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
        var _this = this
        setTimeout(async () => {
          let par = { productId: this.productView.id, userId: this.$user.id() }
          if (this.widget.value !== null && this.widget.value.priceStyleId !== undefined) {
            par.priceStyleId = this.widget.value.priceStyleId
          }
          var list = await _this.$api.httpGet('Api/Product/GetRelation', par)
          var data = {
            productItems: list.result
          }
          // _this.isLoading = true
          _this.$refs.product_item.$emit('toProductItem', data)
          _this.isFrontShowPrice = _this.productView.isFrontShowPrice
        }, 3000)
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
