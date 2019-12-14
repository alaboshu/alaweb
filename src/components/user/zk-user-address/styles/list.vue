<template>
  <view class="add-list" v-if="addList">
    <view class="list" v-for="(item, index) in addList" :key="index">
      <view class="image" v-if="item.name">{{item.name.substr(0, 1)}}</view>
      <view class="cont">
        <view class="cont-title">
          <text>{{item.name}}</text>
          <text class="phone">{{item.mobile}}</text>
        </view>
        <view class="cont-foot">
          <text class="select" v-if="item.isDefault">默认</text>
          <text class="test">{{item.addressDescription}} {{item.address}}</text>
        </view>
      </view>
      <view class="right">编辑</view>
    </view>
  </view>
</template>


<script>
  import styleApi from './styleApi'
  export default {
    data () {
      return {
        addList: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.addList = await styleApi.getAddress(this)
        console.info('resposne', this.addList)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .add-list {
    background: #f2f2f2;
    .list {
      height: 55px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      .image {
        width: 25px;
        height: 25px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 25px;
      }
      .cont {
        height: 40px;
        flex-grow: 2;
        box-sizing: border-box;
        margin-left: 10px;
        margin-bottom: 5px;
        .cont-title {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          .phone {
            font-size: 10.5px;
            color: #909399;
            margin-left: 10px;
          }
        }
        .cont-foot {
          height: 15px;
          box-sizing: border-box;
          .select {
            display: inline-block;
            font-size: 10px;
            height: 15px;
            line-height: 15px;
            padding: 0px 5px;
            background-color: #dcd3cf;
            color: #f74c31;
          }
          .test {
            line-height: 15px;
            font-size: 12.25px;
            color: #000;
          }
        }
      }
      .right {
        color: #909399;
        height: 20px;
        line-height: 20px;
        padding: 0px 5px;
      }
    }
  }
</style>
