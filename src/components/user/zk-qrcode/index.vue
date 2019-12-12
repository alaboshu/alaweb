<template>
  <view class="zk-qrcode">
    <view class="qrcode_icon" @click="back" :style="'top:'+statusBarHeight+'px;'" v-if="isNotApp">
      <x-icon name="icon-zk-black" :color="'#ffffff'" :size="16"></x-icon>
    </view>
    <img :src="vimodel" class="qrcode_image">
  </view>
</template>

<script>

  import apiBaseUrl from '@/service/config.js'
  export default {

    data () {
      return {
        widgetModel: '',
        vimodel: '',
        imgUrl: apiBaseUrl.apiBaseUrl,
        statusBarHeight: '',
        isNotApp: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight + 15
        }
        var para = {
          userId: this.$user.loginUser().id
        }
        var reposen = await this.$api.httpGet('/api/userdetail/qrcode', para)
        this.vimodel = reposen.result
        if (this.$api.client() === 'AppPlus') {
          this.isNotApp = false
        } else {
          this.isNotApp = true
        }
      },
      back () {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-qrcode {
    font-size: $gl-size-base;
    width: 100vw;
    height: 100vh;
  }
  .zk-qrcode::before {
    display: none;
  }
  .qrcode_image {
    width: 100%;
    height: 100%;
  }
  .qrcode_icon {
    width: 28px;
    height: 28px;
    text-align: center;
    line-height: 30px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 15px;
    left: 15px;
    padding-left: 3px;
  }
</style>
