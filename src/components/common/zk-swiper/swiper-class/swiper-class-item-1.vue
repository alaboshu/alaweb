<template>
  <view class="swiper-class-item-1" :style="widget.style.css">
    <view class="left" :style="widget.style.css">
      <scroll-view style="width: 100%;height: 30px;" :show-scrollbar="false" :scroll-x="true" @scroll="scrollChange">
        <view class="left-ul" :style="{width: (50*swiperLength) +'px'}">
          <view class="left-list" :class="{active: swiperIndex === index}" @click="swiperIndex = index" v-for="(item, index) in swiperHeadModel" :key="index">{{item.name}}</view>
        </view>
      </scroll-view>
    </view>
    <view class="right" :style="widget.style.css">
      <view class="iconList">
        <x-icon name="zk-qrcode" size="20" color="#efd6b4"></x-icon>
      </view>
    </view>
  </view>
</template>

<script>
  import indexJson from './swiper-class.json'
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        swiperHeadModel: indexJson,
        swiperLength: 21,
        swiperIndex: 0
      }
    },
    mounted () {
    },
    methods: {
      scrollChange () {
      }
    }
  }
</script>


<style lang="scss" scoped>
  .swiper-class-item-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    padding-right: 10px;
    display: flex;
    align-items: center;
    z-index: 2;
    background: #ff4a2d;
    .left {
      width: 90%;
      height: 100%;
      background: #ff4a2d;
      .left-ul {
        display: flex;
        .left-list {
          width: 50px;
          height: 30px;
          color: #efd6b4;
          line-height: 30px;
          text-align: center;
          &.active {
            color: #fff;
            font-weight: 600;
          }
        }
      }
    }
    .right {
      width: 10%;
      height: 100%;
      background: #ff4a2d;
      box-shadow: -8px 0px 10px rgba(0, 0, 0, 0.3);
      .iconList {
        position: relative;
        bottom: 3px;
        margin: 0 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
