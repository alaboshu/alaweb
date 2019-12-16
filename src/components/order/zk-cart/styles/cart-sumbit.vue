<template>
  <view class="submit-cart" :style="'bottom:'+bottom+'px;'">
    <view class="left" :class="{'left-active': isRadio}" @click="radioClick">
      <x-icon name="icon-testsu" size="20" color="#007AFF" v-if="isRadio"></x-icon>
    </view>
    <view class="center">
      <view>全选</view>
      <view>
        合计:<span class="price">￥{{money}}</span>
      </view>
    </view>
    <view class="right" @click="save">提交</view>
  </view>
</template>

<script>
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        isRadio: false,
        money: '0.00',
        bottom: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.widget && this.widget.route) {
          if (this.widget.route.path.indexOf('tabbar') > -1) {
            this.bottom = 50
          }
        }
      },
      radioClick () {
        this.isRadio = !this.isRadio
        this.$emit('change', this.isRadio)
      },
      computePrice (data) {
        if (data.length > 0) {
          var num = 0
          data.forEach(element => {
            num += element.price * element.buyCount
          })
          this.money = num.toFixed(2)
        } else {
          this.money = '0.00'
        }
      },
      // 提交订单
      save () {
        this.$emit('save')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .submit-cart {
    width: 100%;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    background: #fff;
    .left {
      width: 20px;
      height: 20px;
      margin: 0 10px;
      border-radius: 50%;
      border: 1px solid #d6d6d6;
      .x-icon {
        height: 20px;
      }
      &.left-active {
        border: none;
      }
    }
    .center {
      flex-grow: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .price {
        color: #c81432;
        font-weight: 700;
      }
    }
    .right {
      width: 100px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      background: #c81432;
    }
  }
</style>
