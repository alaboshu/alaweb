<template>
  <transition enter-active-class="weui-animate-slide-up" leave-active-class="weui-animate-slide-down">
    <div class="wv-popup" v-show="visible" :style="style">
      <slot />
    </div>
  </transition>
</template>

<script>
  import PopupMixin from '@/mixins/popup'
  export default {
    name: 'wv-popup',

    mixins: [PopupMixin],

    props: {
      height: {
        type: [String, Number],
        default: 'auto',
        validator: (val) => {
          return /^(auto)|(\d+(px|vh|%)?)$/.test(val)
        }
      },
      visible: {
        default: true
      },
      mask: {
        default: true
      },
      lockOnScroll: {
        default: true
      },
      closeOnClickMask: {
        default: true
      },
      maskClass: {
        default: 'weui-mask'
      }
    },

    computed: {
      style () {
        let ret = {}

        if (/^\d+$/.test(this.height)) {
          ret.height = parseInt(this.height) + 'px'
        } else {
          ret.height = this.height
        }

        return ret
      }
    },

    mounted () {
      if (this.visible) {
        this.open()
      }
    }
  }
</script>

<style scoped lang="less">
  .wv {
    &-modal {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }

    &-overflow-hidden {
      overflow: hidden !important;
    }

    &-popup {
      position: fixed;
      background-color: white;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
</style>
