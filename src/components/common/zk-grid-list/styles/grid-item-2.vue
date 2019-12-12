<template>
  <view class="grid-item-2">
    <view class="ul">
      <view class="list" :style="'width:'+ (100/gridModel.gridCount) +'%;'" v-for="(item, index) in gridList" :key="index">
        <img :src="item.image" class="image" alt="">
        <view class="test">{{item.link.name}}</view>
      </view>
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
        count: 3
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('aaaaaaaaaaaaa', this.gridModel)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .grid-item-2 {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    background: red;
    .ul {
      border-top: 1px solid #f4f4f4;
      width: 100%;
      background: #ffffff;
      display: flex;
      flex-wrap: wrap;
      .list {
        height: 100px;
        border-right: 1px solid #f4f4f4;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .image {
          width: 45px;
          height: 45px;
        }
        .test {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
</style>
