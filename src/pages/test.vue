<template>
  <div class="page">
    <wxc-button text="Open Popup" @wxcButtonClicked="buttonClicked">
    </wxc-button>
    <wxc-popup width="500" pos="left" :show="isShow" @wxcPopupOverlayClicked="overlayClicked">
    </wxc-popup>
    <div class="page__hd">
      <div class="page__title">Toast</div>
      <div class="page__desc">弹出式提示，采用小程序原生的toast</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <button class="weui-btn" type="default" @click="openToast">成功提示</button>
        <button class="weui-btn" type="default" @click="openLoading">加载中提示</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { WxcButton, WxcPopup } from 'weex-ui'
  export default {
    components: { WxcButton, WxcPopup },
    data () {
      return {
      }
    },
    methods: {
      openToast () {
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 3000
        })
      },
      openLoading () {
        wx.showToast({
          title: '数据加载中',
          icon: 'loading',
          duration: 3000
        })
      }
    }
  }
</script>

<style>
</style>
