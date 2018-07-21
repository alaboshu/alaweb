<template>

  <div class="h5-x-buy-address" element-path="h5/x-buy-address">
    <x-group :mTop="0" v-if="false">
      <x-cell title="地址" value="请选择地址" isLink to="/baidu.com"></x-cell>
    </x-group>
    <div class="buy-addres_box">
      <div class="address-left-icon">
        <x-icon src="zk-orderaddress" size="30"></x-icon>
      </div>
      <div class="buy-address-content">
        <div class="address-content-top">
          <div class="address-name">
            收货人:
          </div>
          <div class="address-phone">
            184965748482
          </div>
        </div>
        <div class="address-content-bottom">
          <div class="addresss-detail">
            收货地址：湖南 长沙市 雨花区 湘府中路18号德思勤广场A8栋2310-2312室
          </div>
        </div>
      </div>
      <div class="address-right-icon">
        <x-icon src="zk-right" size="30"></x-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-buy-address',
    props: {
      elementData: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .h5-x-buy-address {
  	font-size: @font-size-base;
  }
</style>
