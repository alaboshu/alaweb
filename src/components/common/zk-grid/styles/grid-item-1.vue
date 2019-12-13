<template>
  <view class="grid-item-1" v-if="async">
    <scroll-view class="scroll-view" :style="'width:' + (this.$base.screenWidth() - 20) + 'px;'" :scroll-x="isScroll" @scroll="scrollChange">
      <view class="ul" :style="'width:' + gridWidth * gridLength + 'px;'">
        <view class="list" :style="'width:' + gridWidth + 'px;'" v-for="(item, index) in gridList" :key="index" @click="$api.to(item.link.url)">
          <img :src="item.image" class="image" alt="" />
          <view class="test">{{ item.link.name }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="foot-item" v-if="isScroll">
      <view class="scroll-for" :style="{ left: flotLeft }"></view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      gridList: {},
      gridModel: {}
    },
    data () {
      return {
        async: false,
        gridWidth: 0, // 每个图标宽度
        flotLeft: 0, // 轮播滚动距离
        gridLength: 4, // 每行展示数量默认为四个
        isScroll: false // 是否支持滚动，默认为不支持
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.gridWidth =
          (this.$base.screenWidth() - 20) / this.gridModel.gridCount
        if (this.gridList) {
          if (this.gridList.length / this.gridModel.gridCount > 2) {
            this.gridLength = Math.ceil(this.gridList.length / 2)
            this.isScroll = true
          } else {
            this.gridLength = this.gridModel.gridCount
            this.isScroll = false
          }
        }
        this.async = true
      },
      scrollChange (ev) {
        // 计算滚动条位置
        if (ev.detail) {
          var scrollWidth = ev.detail.scrollWidth
          var scrollLeft = ev.detail.scrollLeft
          var width = this.$base.screenWidth() - 20
          var footLeft = (scrollLeft / (scrollWidth - width)).toFixed(2)
          // toFixed
          // 小数转百分比
          this.flotLeft = Number(footLeft * 100) / 2 + '%'
        }
        // console.info('ev', ev.detail)
      },
      clickLink (item) {
        console.info('item', item.link.url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grid-item-1 {
    min-height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    .scroll-view {
      height: 100%;
      background: #fff;
      border-radius: 3px;
      .ul {
        display: flex;
        flex-wrap: wrap;
        .list {
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .image {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          .test {
            color: #333;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
          }
        }
      }
    }
    .foot-item {
      margin: 0 auto;
      width: 30px;
      height: 3px;
      background: rgba(0, 0, 0, 0.3);
      position: relative;
      .scroll-for {
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        background: #fff;
      }
    }
  }
</style>
