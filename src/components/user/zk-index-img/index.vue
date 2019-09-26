<template>
  <view>
    <div class="index_mask" v-if="async">
      <div class="popupBox">
        <div class="popupImg">
          <img :src="$api.baseUrl()+'/wwwroot/uploads/image/20190328/20190328232437.jpg'" alt="" class="bgImg">
        </div>
        <div class="popupIcon" @click="closeImg">
          <x-icon class="icon_p" name=" icon-zk-close" :size="32" color="#fff"></x-icon>
        </div>
      </div>
    </div>
  </view>
</template>
<script>
  import themes from '../../../service/config.js'
  export default {
    components: {

    },
    props: {
      widget: {}
    },
    data () {
      return {
        async: false,
        imgWidth: '',
        imgHeight: '',
        apiUrl: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.widget.url === '/index') {
          this.async = true
        }
        if (this.$api.client() === 'WeChatLite' || this.$api.client() === 'AppPlus' || themes.themeId === '5cc1bfbe23eb301328298b41') {
          this.async = false
        }
        this.imgWidth = (this.$api.getSystemInfoSync().windowWidth * 0.8)
        this.imgHeight = this.imgWidth * 1.17
        if (this.$api.getSystemInfoSync().windowHeight >= 750) {
          // this.imgWidth = this.$api.getSystemInfoSync().windowWidth * 0.6
          // this.imgHeight = 750
        }
        // this.async = true
      },

      closeImg () {
        this.async = false
      }
    }
  }
</script>

<style lang="scss" scope>
  .index_mask {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    .popupBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      .popupImg {
        flex: 1;
        width: 100%;
        img {
          max-width: 620px;
          min-width: 320px;
        }

        @media screen and (max-width: 600px) {
          img {
            width: 100%;
            margin: 0 auto;
          }
        }
        @media screen and (min-width: 600px) and (max-width: 960px) {
          .bgImg {
            width: 100%;
          }
        }
        @media screen and (min-width: 960px) {
          .bgImg {
            width: 100%;
          }
        }
        .popupIcon {
          width: 100%;
          height: 50px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .icon_p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
</style>
