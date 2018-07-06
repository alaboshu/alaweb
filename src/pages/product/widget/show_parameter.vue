<template>
  <div class="zkweb-show_parameter">
    <x-group>
      <x-cell title="请选择:规格" value="qwe" isLink @click="popupVisible1=!popupVisible1"></x-cell>
      <x-cell title="商品参数" value="qwe" isLink @click="popupVisible2=!popupVisible2"></x-cell>
      <x-cell title="备注"></x-cell>
    </x-group>
    <!-- 规格弹出框 -->
    <x-popup :visible="popupVisible1">
      <div>规格</div>
    </x-popup>
    <x-popup :visible="popupVisible2">
      <div>商品参数</div>
    </x-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        popupVisible1: false,
        popupVisible2: false
      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>
<style lang="less">
  .zkweb-show_parameter {
    .weui-cells {
      margin-top: 0;
    }
    .wv-popup {
      z-index: 111111;
    }
  }
</style>
