<template>
  <view class="new-index-index-box">
    <view class="new-index-head-top-bg" :style="'background:'+colorList.headBg">
    </view>
    <view class="new-index-head-box">
      <view class="new-index-head">
        <view class="head-item " :style="'color:'+colorList.headItemColor" :class="{'head-item-active':active===index}" v-for="(item,index) in RClass" :key="index" @click="heaItemClick(index)">
          <view class="head-item-txt">
            {{item.name}}
          </view>
          <view class="head-item-border" :style="'background:'+colorList.headItemBorderColor"> </view>
        </view>
      </view>
    </view>
    <view class="new-index-search-box">
      <view class="index-search" :style="'color:'+colorList.headSearchColor+';background:'+colorList.headSearchBgColor">
        <i class="icon iconfont icon-zk-search"></i>
      </view>
    </view>
    <div class="new-index-swiper-box">
      <swiper :autoplay="false" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" style="height:160px">
        <swiper-item v-for="(item,index) in 3" :key="index">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76ee631109e232cc9d0cc.jpg" class="bgImg" />
        </swiper-item>
      </swiper>
    </div>
    <x-widget :option="option" ref="xWidget"></x-widget>
  </view>
</template>
	<script>

  export default {
    components: {
    },
    data () {
      return {
        RClass: null,
        option: '',
        active: 0,
        colorList: {
          headBg: '#fff',
          headItemColor: '#000',
          headItemBorderColor: '#e4393c',
          headSearchColor: '#303133',
          headSearchBgColor: '#ebeef5'
        },
        colorListFirst: {
          headBg: '#fff',
          headItemColor: '#000',
          headItemBorderColor: '#e4393c',
          headSearchColor: '#303133',
          headSearchBgColor: '#ebeef5'
        },
        colorListSecond: {
          headBg: '#34bfa3',
          headItemColor: '#fff',
          headItemBorderColor: '#fff',
          headSearchColor: '#fff',
          headSearchBgColor: 'rgba(255, 255, 255, 0.2)'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      heaItemClick (index) {
        this.active = index
        if (index % 2 === 0) {
          this.colorList = this.colorListFirst
        } else {
          this.colorList = this.colorListSecond
        }
      },
      async init () {
        var response = await this.$api.httpGet('/api/product/class')
        this.RClass = response.result
      }
    }
  }
	</script>
<style lang="scss" scoped>
  .new-index-index-box {
    position: relative;
    .new-index-head-top-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 190px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  .new-index-head-box {
    position: relative;
    overflow: auto hidden;
    white-space: nowrap;
    height: 40px;
    &::-webkit-scrollbar {
      display: none;
    }
    .new-index-head {
      height: 40px;
      .head-item {
        display: inline-block;
        margin: 0 5px;
        width: 60px;
        height: 40px;
        line-height: 40px;
        text-align: center;

        position: relative;
        .head-item-txt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          transition: all 0.1s linear;
          // color: #ffffff;
        }
        .head-item-border {
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 20px;
          height: 3px;
          transform: translateX(-50%);
          opacity: 0;
          border-radius: 20px;
          transition: all 0.1s linear;
        }
      }
      .head-item-active {
        .head-item-txt {
          font-size: 14px;
          font-weight: bold;
        }
        .head-item-border {
          // display: block;
          opacity: 1;
        }
      }
    }
  }

  .new-index-search-box {
    position: relative;
    width: 100%;
    padding: 5px;
    display: flex;
    margin-bottom: 10px;
    .index-search {
      flex: 1;
      border-radius: 20px;
      height: 25px;
      line-height: 25px;
      padding: 0 15px;
    }
  }
  .new-index-swiper-box {
    position: relative;
    margin: 0 15px;
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
