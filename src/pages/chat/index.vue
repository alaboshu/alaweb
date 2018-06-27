<template>
  <div class="page">
    <div class="page">
      <div class="page__hd">
        <div class="page__title">Button</div>
        <div class="page__desc">按钮，WeUI采用小程序原生的按钮为主体，加入一些间距的样式。</div>
      </div>
      <div class="page__bd page__bd_spacing">
        <button class="weui-btn weui-btn_primary">页面主操作 Normal</button>
        <button class=" weui-btn " type="primary " disabled="true ">页面主操作 Disabled</button>

        <button class="weui-btn " type="default ">页面次要操作 Normal</button>
        <button class="weui-btn " type="default " disabled="true ">页面次要操作 Disabled</button>

        <button class="weui-btn " type="warn ">警告类操作 Normal</button>
        <button class="weui-btn " type="warn " disabled="true ">警告类操作 Disabled</button>

        <div class="button-sp-area ">
          <button class="weui-btn " type="primary " plain="true ">按钮</button>
          <button class="weui-btn " type="primary " disabled="true " plain="true ">按钮</button>

          <button class="weui-btn " type="default " plain="true ">按钮</button>
          <button class="weui-btn " type="default " disabled="true " plain="true ">按钮</button>

          <button class="weui-btn mini-btn " type="primary " size="mini ">按钮</button>
          <button class="weui-btn mini-btn " type="default " size="mini ">按钮</button>
          <button class="weui-btn mini-btn " type="warn " size="mini ">按钮</button>
        </div>
      </div>
    </div>
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
<script>

  import store from '../../vuex/store'
  export default {
    name: "chat",

    created () {

    }
  }

</script>
<style scoped lang='less'>
  // .center {
  //   text-align: center;
  //   padding-top: 20 * @rem;
  //   color: #fff;
  //   font-size: @h3-font-size;
  // }
  // .center img {
  //   width: 100 * @rem;
  //   height: 100 * @rem;
  //   border-radius: 50%;
  //   border: 4px solid #ececec;
  // }
</style>
