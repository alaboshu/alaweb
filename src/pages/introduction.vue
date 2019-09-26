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
        <!-- <x-icon :size="18" :color="'#606266'" name="icon-zk-home"></x-icon> -->
        <!-- <i class="icon iconfont icon-zk-home"></i> -->
        <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdc136c89bd0706b0158a25.png" />
        <div>首页</div>
      </div>
      <div class="introduction-info">
        <div class="introduction-info-top">
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
      if (this.$api.client() === 'WapH5' || this.$api.client() === 'WeChat') {
        this.$api.share('企牛牛-高丽红参秋冬进补美食', 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png', '高丽红参秋冬进补美食')
      }

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
      height: 500px;
    }
    .introduction_bottom {
      width: 100%;
      height: 45px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #ffffff;
      display: flex;
      .introduction-icon {
        width: 45px;
        height: 45px;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        padding-top: 5px;
        // padding: 0px 15px;
        text-align: center;
        img {
          display: inline-block;
          width: 16px;
          height: 16px;
        }
        div {
          line-height: 14px;
          font-size: 14px;
        }
      }
      .introduction-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .introduction-info-top {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        div {
          text-align: center;
          color: #e62b4d;
          font-size: 14px;
        }
      }
      .introduction-buy {
        flex: 1;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background: #e62b4d;
        font-size: 14px;
      }
    }
    .introduction_bottom-placeholder {
      height: 50px;
    }
  }
</style>
