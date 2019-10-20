<template>
  <zk-product-item></zk-product-item>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$api.share('阿拉博数', 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png', '盛吉信高丽参精美铁盒装100g', 'https://m.qiniuniu99.com/pages/index?path=product_show&id=8916')
      this.init()
    },
    methods: {
      goDefault () {
        uni.switchTab({
          url: '/pages/default'
        })
      },
      goUrl () {
        this.$api.to('/pages/index?path=product_show&id=8916')
      },
      callPhone () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      },
      init () {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .introduction_img-box {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
    .introduction_bottom {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #ffffff;
      display: flex;
      .introduction-icon {
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        i {
          font-size: 24px;
        }
        p {
          margin-top: -5px;
          font-size: 15px;
        }
      }
      .introduction-info {
        flex: 1;
        div {
          text-align: center;
          height: 25px;
          line-height: 25px;
          color: #f4516c;
        }
      }
      .introduction-buy {
        flex: 1;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background: #f4516c;
        font-size: 14px;
      }
    }
    .introduction_bottom-placeholder {
      height: 50px;
    }
  }
</style>
