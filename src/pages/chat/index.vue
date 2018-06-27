<template>
  <div class="page">

    <div class="page button js_show">
      <div class="page__hd">
        <h1 class="page__title">Button</h1>
        <p class="page__desc">按钮</p>
      </div>
      <div class="page__bd page__bd_spacing">
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
<script  >
  export default {
    name: "chat",

    created () {

    }
  }

</script>
<style scoped lang='less'>
  .weui-btn {
    border-radius: 10px;
    margin-top: 10px;
  }
</style>
