<template>
  <div class="introduction_img-box">
    <img src="../static/img/Introduction/Introduction_1.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_2.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_3.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_4.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_5.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_6.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_7.jpg" alt="">
    <img src="../static/img/Introduction/Introduction_8.jpg" alt="">
    <div class="introduction_bottom">
      <div class="introduction-icon" @click="goDefault">
        <i class="icon iconfont icon-zk-home"></i>
        <p>首页</p>
      </div>
      <div class="introduction-info">
        <div>
          <i class="icon iconfont icon-zk-dianhua"></i>
          400-680-9088
        </div>
        <div>客服</div>
      </div>
      <div class="introduction-buy" @click="goUrl">
        立即购买
      </div>
    </div>
    <div class="introduction_bottom-placeholder"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$api.share('企牛牛', 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png', '盛吉信高丽参精美铁盒装100g', 'https://m.qiniuniu99.com/pages/index?path=product_show&id=8916')
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
