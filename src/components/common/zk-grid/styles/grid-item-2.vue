<template>
  <view class="grid-item-2">
    <view class="ul">
      <view class="list" :style="'width:' + (screenWidth / gridModel.gridCount-1) + 'px;'" v-for="(item, index) in list" @click="linkTo(item)" :key="index">
        <img v-if="item.image" :src="item.image" class="image" alt="" />
        <view class="test">{{ item.link.name }}</view>
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
        list: [],
        screenWidth: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.list = this.gridList
        this.screenWidth = this.$base.screenWidth()
        if (this.gridList) {
          var remainder = this.gridList.length % this.gridModel.gridCount
          var num = remainder === 0 ? 0 : this.gridModel.gridCount - remainder
          if (num > 0) {
            for (let i = 0; i < num; i++) {
              this.list.push({ link: {} })
            }
          }
        }
      },
      linkTo (item) {
        this.$api.to(item.link.url)
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
      border-left: 1px solid #e4e7ed;
      border-top: 1px solid #e4e7ed;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list {
        height: 100px;
        border-right: 1px solid #e4e7ed;
        border-bottom: 1px solid #e4e7ed;
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
  .paved-border {
    .grid-item-2 {
      padding: 0;
      .ul {
        border-left: none;
        .list {
          border-left: 1px solid #e4e7ed;
          border-right: none;
        }
      }
    }
  }
</style>
