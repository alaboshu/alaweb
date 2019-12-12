<template>
  <view class="bank-item-1">
    <view class="list" :style="'background: url('+item.bgImage+')  no-repeat;background-size: 100%;'" v-for="(item, index) in list" :key="index">
      <view class="bind-delete">接触绑定</view>
      <view class="test">**** **** **** 9646</view>
    </view>
    <view class="foot">
      <view class="buttom">添加银行卡</view>
    </view>
  </view>
</template>

<script>
  import indexJson from './index.json'
  export default {
    data () {
      return {
        list: indexJson
      }
    }
  }
</script>


<style lang="scss" scoped>
  .bank-item-1 {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px 5px 10px;
    .list {
      width: 100%;
      height: 135px;
      border-radius: 5px;
      margin: 10px 0;
      position: relative;
      .bind-delete {
        position: absolute;
        top: 23px;
        right: 30px;
        height: 20px;
        line-height: 20px;
        padding: 0 8px;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 20px;
      }
      .test {
        position: absolute;
        top: 80px;
        left: 60px;
        color: #fff;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      }
    }
    .foot {
      position: fixed;
      bottom: 0;
      height: 60px;
      width: 100%;
      left: 0;
      background: #fff;
      padding: 0 10px;
      box-sizing: border-box;
      .buttom {
        margin-top: 10px;
        height: 40px;
        width: 100%;
        background: #c91230;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
</style>
