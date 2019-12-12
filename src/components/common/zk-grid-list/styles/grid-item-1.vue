<template>
  <view class="grid-item-1" v-if="async">
    <scroll-view class="scroll-view" :style="'width:'+(this.$api.screenWidth() - 20)+'px;'" :scroll-x="true" :show-scrollbar="true" @scroll="scrollChange">
      <view class="ul" :style="'width:'+ gridWidth*gridLength + 'px;'">
        <view class="list" :style="'width:'+ gridWidth+'px;'" v-for="(item, index) in gridModel.gridList" :key="index">
          <img :src="item.image" class="image" alt="">
          <view class="test">{{item.link.name}}</view>
        </view>
      </view>
    </scroll-view>
    <view class="foot-item">
      <view class="scroll-for" :style="{left:flotLeft}"></view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      widget: {},
      gridModel: {}
    },
    data () {
      return {
        async: false,
        gridWidth: 0,
        flotLeft: 0,
        gridLength: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.gridWidth = (this.$api.screenWidth() - 20) / this.gridModel.gridCount
        if (this.gridModel.gridList) {
          if (this.gridModel.gridList.length / this.gridModel.gridCount > 2) {
            this.gridLength = this.gridModel.gridList.length
          } else {
            this.gridLength = 5
          }
        }
        this.async = true
      },
      scrollChange (ev) {
        // 计算滚动条位置
        if (ev.detail) {
          var scrollWidth = ev.detail.scrollWidth
          var scrollLeft = ev.detail.scrollLeft
          var width = this.$api.screenWidth() - 20
          var footLeft = (scrollLeft / (scrollWidth - width)).toFixed(2)
          // toFixed
          // 小数转百分比
          this.flotLeft = (Number(footLeft * 100) / 2) + '%'
        }
        // console.info('ev', ev.detail)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .grid-item-1 {
    min-height: 130px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .scroll-view {
      height: 100%;
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
            color: #fff;
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
        background: yellow;
      }
    }
  }
</style>
