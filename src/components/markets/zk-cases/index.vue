<template>
  <view class="zk-cases">
    <view class="zk-cases-head">
      <view class="iconfont" @click="back">
        <x-icon src="zk-return" color="#fff"></x-icon>
      </view>
      <p class="cgong">成功案例</p>
    </view>
    <view class="zk-cases-sweiper">
      <swiper class="case_heige" :indicator-dots="true" :circular="true" indicator-active-color="#ffffff" indicator-color="#696969" style="height:667px">
        <swiper-item class="box_imgae" v-for="(item,index) in lists" :key="index">
          <view class="ihgs_box" :style="'background:url('+item.image+') no-repeat;'">
            <view class="zk-cases-content">
              <view class="zk-casesContent-title">
                <h2 class="h2_color">{{item.name}}</h2>
              </view>
              <scroll-view scroll-y :style="'height:'+caheiget/5+'px;'">
                <view class="content-text" v-html="item.intro"></view>
              </scroll-view>
              <view class="content-code">
                <!-- <img src="../../../assets/img/zk-cases/zk-casseCode.png" class="code_image"> -->
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <view class="bottom">
      <view class="zk-content-bottom">
        <x-a  path="##">点击详情</x-a >
      </view>
    </view>-->
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        lists: [],
        caweight: '',
        caheiget: '',
        jsgao: '',
        baifb: ''
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
        var than_ = this
        uni.getSystemInfo({
          success: function (res) {
            than_.caweight = res.windowWidth
            than_.caheiget = res.windowHeight + 40
          }
        })
        this.baifb = this.caheiget / 20
        this.jsgao = this.caheiget / 2 - this.caheiget / 15
                  this.widgetModel = await this.$api.themeWidget(this.widget)

        var res = await this.$api.httpGet('/api/cases/list')

        res.result.forEach(element => {
          this.lists.push(element)
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    updated () {
      // document.querySelector('.uni-swiper-dots').style.bottom = 15 + '%'
      // document.querySelector('.content-text p').style.fontSize = 12 + 'px'
      // document.querySelector('.content-text span').style.fontSize = 12 + 'px'
      // document.querySelector('.content-text p').style.lineHeight = 22 + 'px'
      // document.querySelector('.content-text span').style.lineHeight = 22 + 'px'
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-cases {
    .case_heige {
      width: 100vw;
      height: 100vh;
    }
    .ihgs_box {
      width: 100%;
      height: 100%;
      background-size: 100% 100% !important;
    }
    .zk-cases-head {
      width: 100vw;
      height: 46px;
      line-height: 46px;
      text-align: center;
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 999;
    }
    .iconfont {
      height: 46px;
      line-height: 46px;
      position: absolute;
      top: 0px;
      left: 15px;
    }
    .cgong {
      color: $gl-light;
      font-size: 18px;
    }
    .h2_color {
      font-size: 16px;
      color: $gl-light;
      margin-left: 18%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .zk-cases-content {
      padding: 0 12%;
      position: absolute;
      top: 50%;
      transform: translateY(-18%);
    }
    .content-text {
      color: $gl-light;
      text-indent: 2em;
      overflow: auto;
    }
    .bottom {
      width: 100vw;
      position: fixed;
      bottom: 70px;
    }
    .zk-content-bottom {
      position: relative;
      a {
        color: $gl-light;
        background-color: $gl-brand;
        display: block;
        font-size: 16px;
        padding: 10px 40px;
        border-radius: 100px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .content-code {
      width: 100%;
      text-align: right;
      margin-top: 2%;
    }
    .code_image {
      margin-right: -4%;
      width: 18%;
      height: 18%;
    }
    .zk-casesContent-title {
      margin-bottom: 10%;
    }
  }
</style>
