<template>
  <view class="zk-team">
    <view class="zk-team-top">
      <!-- <img src="../../../assets/img/zk-team/left.png" class="left" @click="back"> -->
    </view>
    <swiper class="swiper_quan" :autoplay="false" :interval="3000" :duration="500" :circular="true">
      <swiper-item v-for="(item,index) in lists" :key="index" class="swiper_box" :style="'height:'+ksheiget+'px;'">
        <scroll-view scroll-y class="scrolltop">
          <view class="zhuang">
            <img :src="item.image" class="swiper-img">
            <view class="xio_image">
              <view class="zk-team-Number">{{index+1}}</view>
              <view class="line">
                <!-- <img src="../../../assets/img/zk-team/line.png"> -->
              </view>
              <view class="zk-team-All">{{lists.length}}</view>
            </view>
          </view>
          <view class="conter-swpi">
            <view class="zk-team-PerName">
              <p>{{item.name}}</p>
              <p>{{item.position}}</p>
            </view>
            <view class="personDetail" v-html="item.intro" style="color:rgba(255,255,255,0.2);"></view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        lists: [],
        ksweight: '',
        ksheiget: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var res = await this.$api.httpGet('/api/team/queryList')
        res.result.forEach(element => {
          this.lists.push(element)
        })
        var than_ = this
        uni.getSystemInfo({
          success: function (res) {
            than_.ksweight = res.windowWidth
            than_.ksheiget = res.windowHeight
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    updated () {
      // document.querySelector('.personDetail p').style.fontSize = 16 + 'px'
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-team {
    font-size: $gl-size-base;
    height: 100vh;
  }
  .swiper_box {
    overflow: auto;
  }
  .swiper_quan {
    background: rgba(21, 22, 24, 1);
    height: 100%;
  }
  .zk-team-top {
    height: 44px;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    position: fixed;
    top: 15px;
    left: 15px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .zk-team-PerName {
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 33px;
    margin-top: -37px;
    p {
      font-size: 18px;
    }
  }
  .personDetail {
    margin-top: 10px;
    margin-left: 33px;
    padding-bottom: 10px;
    color: rgba(255, 255, 255, 0.4) !important;
    p {
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 0.4);
    }
  }
  .line {
    margin: 0 auto;
    img {
      width: 19px;
      height: 45px;
    }
  }
  .zk-team-Number,
  .zk-team-All {
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .zk-team-Number {
    margin-top: -25px;
    margin-right: -10px;
  }
  .zk-team-All {
    margin-bottom: -25px;
    margin-left: -10px;
  }
  .zhuang {
    position: relative;
  }
  .swiper-img {
    width: 100%;
  }
  .xio_image {
    height: 45px;
    position: absolute;
    right: 10px;
    bottom: -46px;
    display: flex;
    align-items: center;
  }
  .conter-swpi {
    margin-top: 10px;
  }
  .scrolltop {
    height: 100vh;
  }
  .uni-page-wrapper:after {
    display: none;
  }
  .uni-swiper-slides {
    height: 668px !important;
    background: #131313;
  }
</style>
