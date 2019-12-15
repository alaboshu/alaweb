<template>
  <view class="x-region">
    <view class="x-region-form">
      <view class="test">选择地址</view>
      <view class="form-item">
        <!-- <textarea value="为什么" class="cont"></textarea> -->
      </view>
    </view>
    <cityPicker></cityPicker>
  </view>
</template>


<script>
  import cityPicker from './city-picker'
  export default {
    components: {
      cityPicker
    }

  }
</script>


<style lang="scss" scoped>
  .x-region {
    width: 100%;
    height: 100px;
    padding: 0 10px;
    .x-region-form {
      width: 100%;
      height: 40px;
      display: flex;
      .test {
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
      }
      .form-item {
        flex-grow: 2;
        height: 40px;
        margin-left: 10px;
        box-sizing: border-box;
        background: red;
        .cont {
          width: 100%;
          height: 100%;
          line-height: 40px;
        }
      }
    }
  }
</style>
