<template>
  <view>
    <view class="listItem" v-for="(item,index) in list" :key="index" :click="tap(item.id)">
      <view class="listItem-img">
        <image class="img" :src="item.img" />
      </view>
      <view class="listItem-content">
        <view class="title" v-text="item.title"></view>
        <view class="info" v-text="item.info"></view>
        <view class="another" v-text="item.another"></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Newslist',
    props: {
      list: Array,
      urls: String
    },
    data () {
      return {
        goUrl: this.urls
      }
    },
    methods: {
      tap (o) {
        let _this = this
        if (_this.goUrl !== '') {
          uni.navigateTo({
            url: _this.goUrl + o
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .listItem {
    background: #ffffff;
    border-bottom: 1upx solid #f2f2f5;
    display: flex;
    align-items: center;
    padding: 10upx;
  }
  .listItem:last-child {
    border-bottom: 1upx solid #ffffff;
  }
  .listItem {
    .listItem-img {
      width: 120upx;
      height: 120upx;
      flex: inherit;
    }
  }
  .listItem {
    .listItem-img {
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .listItem {
    .listItem-content {
      box-sizing: border-box;
      padding-left: 10upx;
      flex: 1;
    }
  }
  .listItem {
    .listItem-content {
      .title {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .listItem {
    .listItem-content {
      .info {
        color: #777777;
        font-size: 30upx;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
      }
    }
  }
  .listItem {
    .listItem-content {
      .another {
        text-align: right;
        font-size: 30upx;
      }
    }
  }
</style>
