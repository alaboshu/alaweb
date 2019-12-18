<template>
  <view class="list-item">
    <view class="list" v-for="(item, index) in widget" :key="index" @click="listItemClick(item)">
      <view class="left">{{item.type}}</view>
      <view class="right">
        <view class="right-test" v-if="!item.isAct">{{item.value}}</view>
        <view class="right-image" v-else>
          <img :src="item.value" alt="暂无图片" />
        </view>
        <view class="right-icon" v-if="item.show">
          <i class="iconfont" :class="item.icon"></i>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      widget: {}
    },
    methods: {
      listItemClick (item) {
        if (item.infoType === 'loginOut') {
          this.$user.loginOut()
        }
        if (item.infoType === 'editAddress') {
          this.$api.to('/user/address')
        }
        if (item.url) {
          this.$api.to(item.url)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    .list {
      width: 100%;
      box-sizing: border-box;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      padding: 0 10px;
      border-bottom: 1px solid #f2f6fc;
      .left {
        width: 300px;
      }
      .right {
        display: flex;
        align-items: center;
        .right-icon {
          width: 15px;
          height: 25px;
          color: #d4cbcd;
        }
        .right-test {
        }
        .right-image {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      &:last-child {
        border: none;
      }
    }
  }
</style>
