<template>
  <div class="page">
    <div class="page button js_show">
      <div class="page__hd">
        <h1 class="page__title">Button</h1>
        <p class="page__desc">按钮</p>
      </div>
      <div class="page__bd page__bd_spacing">
        <XButton type="primary" @click="pickerShow = true">单列选择器</XButton>
        <XPicker :columns="pickerItems" value-key="name" :visible.sync="pickerShow"></XPicker>
        <a href="javascript:;" class="weui-btn weui-btn_primary">页面主操作 Normal</a>
        <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn_loading">
          <i class="weui-loading"></i>页面主操作 Loading</a>
        <a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_primary">页面主操作 Disabled</a>
        <a href="javascript:;" class="weui-btn weui-btn_default">页面次要操作 Normal</a>
        <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_loading">
          <i class="weui-loading"></i>页面次操作 Loading</a>
        <a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_default">页面次要操作 Disabled</a>
        <a href="javascript:;" class="weui-btn weui-btn_warn">警告类操作 Normal</a>
        <a href="javascript:;" class="weui-btn weui-btn_warn weui-btn_loading">
          <i class="weui-loading"></i>警告类操作 Loading</a>
        <a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_warn">警告类操作 Disabled</a>

        <div class="button-sp-area">
          <a href="javascript:;" class="weui-btn weui-btn_plain-default">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_plain-default weui-btn_plain-disabled">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_plain-primary">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_plain-primary weui-btn_plain-disabled">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">按钮</a>
          <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn">按钮</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XButton from '@/element/x-button'
import XPicker from '@/element/x-picker'

export default {
  components: {
    XButton,
    XPicker
  },
  data() {
    return {
      pickerShow: false,
      pickerItems: [
        {
          values: [
            {
              name: 'Apple',
              price: 1.3
            },
            {
              name: 'Banana',
              price: 2.0
            },
            {
              name: 'Orange',
              price: 10
            },
            {
              name: 'Pear',
              price: 0.5
            }
          ]
        }
      ]
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang='less'>
</style>
