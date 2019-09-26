<template>
  <view class="zk-user-grade">
    <view class="zk-userG-top">
      <view class="zk-userG-head">
        <view @click="back" class="grade_head">
          <x-icon src="zk-return" color="#ffffff" class="zk-icon-left"></x-icon>
        </view>
        <p>服务商家</p>
      </view>
      <p class="zk-userNumber">{{this.statistic.total}}</p>
      <p class="zk-userTitle">累计商家</p>
      <view class="zk-user-bottom">
        <view class="user-titalType" v-for="(item,index) in statistics" :key="index">
          <p class="amount">{{item.key}}</p>
          <p class="title">{{item.value}}</p>
        </view>
      </view>
    </view>
    <view class="zk-user-tabBar">
      <view class="uni-tab-bar">
        <view id="uni-tab-fixex">
          <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" style="background:#FF6565;" :class="isFixed== true?'isFixed':''">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="'swiper-tab-list'+(tabIndex==index ? ' active' : '')" :id="'tab_'+index" :data-current="index" gl-click="tapTab(index)" style="width: 95px;font-size: 14px;color:#fff ">{{tab.name}}</view>
          </scroll-view>
        </view>
        <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" style="height:500px">
          <swiper-item v-for="(tab,index1) in widgets" :key="index1">
            <zk-list v-if="tab !== undefined" :widget="tab"></zk-list>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        tabIndex: -1,
        scrollLeft: 0,
        isFixed: false,
        statistic: {},
        widgets: [],
        statistics: [],
        tabBars: []
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()

      window.addEventListener('scroll', this.handleScroll())
    },
    methods: {
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
        var res = await this.$api.httpGet('/api/user/getuserstatistic')

        this.statistic = res.result
        this.statistics.push({ key: this.statistic.unActivated, value: '未激活' })
        this.statistics.push({ key: this.statistic.today, value: '今日商家' })
        this.statistics.push({ key: this.statistic.thisMonth, value: '本月商家' })

        res = await this.$api.httpGet('/api/grade/allgrade')
        res.result.forEach(element => {
          this.tabBars.push(element)
          this.widgets.push(undefined)
        })
        this.changeTapIndex(0)
      },
      async changeTab (e) {
        let index = e.detail.current
        if (this.isClickChange) {
          this.changeTapIndex(index)
          this.isClickChange = false
          return
        }
        let tabBar = await this.getElSize('tab-bar')
        let tabBarScrollLeft = tabBar.scrollLeft
        let width = 0

        for (let i = 0; i < index; i++) {
          let result = await this.getElSize('tab_' + i)
          width = width + result.width
        }
        let winWidth = this.$api.getSystemInfoSync().windowWidth
        let nowElement = await this.getElSize('tab_' + index)
        let nowWidth = nowElement.width
        if (width + nowWidth - tabBarScrollLeft > winWidth) {
          this.scrollLeft = width + nowWidth - winWidth
        }
        if (width < tabBarScrollLeft) {
          this.scrollLeft = width
        }
        this.isClickChange = false
        this.changeTapIndex(index)
      },
      getElSize (id) {
        return new Promise((resolve, reject) => {
          uni.createSelectorQuery().select('#' + id).fields({
            size: true,
            scrollOffset: true
          }, (data) => {
            resolve(data)
          }).exec()
        })
      },
      async tapTab (index) {
        if (this.tabIndex === index) {
          return false
        } else {
          let tabBar = await this.getElSize('tab-bar')
          let tabBarScrollLeft = tabBar.scrollLeft
          this.scrollLeft = tabBarScrollLeft
          this.isClickChange = true
          this.changeTapIndex(index)
        }
      },
      back () {
        uni.reLaunch({
          url: '/pages/default'
        })
        // window.location.href('http://qiniuniu99.com/pages/index')
        // this.$router.go(-1)
      },
      async changeTapIndex (index) {
        if (this.tabIndex !== index) {
          var element = this.tabBars[index]
          this.widgets[index] = {
            apiUrl: 'api/user/recommend?gradeId=' + element.id,
            gradeId: element.id,
            dataId: element.id
          }
        }
        this.tabIndex = index
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 10) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-user-grade {
    font-size: $gl-size-base;
    .zk-userG-top {
      width: 100%;
      height: 210px;
      background: rgba(239, 65, 65, 1);
      .zk-userG-head {
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: relative;
        p {
          width: 100%;
          font-size: 18px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          text-align: center;
        }
        .zk-icon-left {
          margin-left: 15px;
        }
        .zk-icon-right {
          margin-right: -37px;
        }
      }
      .zk-userNumber,
      .zk-userTitle {
        text-align: center;
      }
      .zk-userNumber {
        margin-top: 7px;
        font-size: 24px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .zk-userTitle {
        margin-top: 4px;
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .zk-user-bottom {
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding: 0 30px;
        margin-top: 37px;
        // height: 25px;
        div {
          flex: 1;
        }
        div:nth-child(2n) {
          border-right: 1px solid rgba(221, 221, 221, 1);
          border-left: 1px solid rgba(221, 221, 221, 1);
          // padding: 0 30px;
        }
        .amount,
        .title {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(241, 241, 241, 1);
        }
      }
      .uni-swiper-tab {
        display: flex;

        .swiper-tab-list {
          color: #fff;
        }
      }
    }
    .swiper-img {
      width: 65px;
      height: 65px;
      border-radius: 10px;
      margin-right: 15px;
    }
    .swiper-all {
      display: flex;
      width: 100%;
      height: 74px;
      padding: 18px 0 0 18px;
      margin-bottom: 15px;
    }
    .swiper-title {
      height: 68px;
      border-bottom: 1px solid rgba(199, 199, 205, 0.2);
    }
    .swiper-title-all {
      display: flex;
      justify-content: space-around;
      .title {
        font-size: 14px;
        color: #333;
      }
    }
    .datatime {
      width: 260px;
      font-size: 13px;
      color: rgba(199, 199, 205, 1);

      padding-bottom: 20px;
    }
    .tabDataTime {
      margin-left: 64px;
      color: rgba(199, 199, 205, 1);
    }
    .active {
      color: #bababa !important;
    }
    .linhegt .x-list_box2 .fontsize {
      width: 100%;
      font-size: 15px;
      color: $gl-black;
    }
    .swiper-tab-list {
      // color: #fff;
    }
    .grade_head {
      height: 50px;
      line-height: 50px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
