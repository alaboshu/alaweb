<template>
  <view class="grid-item-2">
    <view class="ul">
      <view class="list" :style="'width:'+ (100/gridModel.gridCount) +'%;'" v-for="(item, index) in list" @click="$base.to(item.link.url)" :key="index">
        <img v-if="item.image" :src="item.image" class="image" alt="">
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
        count: 3,
        list: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.list = this.gridList
        if (this.gridList) {
          var num = this.gridModel.gridCount - (this.gridList.length % this.gridModel.gridCount)
          if (num > 0) {
            for (let i = 0; i < num; i++) {
              this.list.push({ link: {} })
            }
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .grid-item-2 {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    .ul {
      border-left: 1px solid #f4f4f4;
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
