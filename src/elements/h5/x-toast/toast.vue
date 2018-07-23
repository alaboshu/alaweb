<template>
  <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
    <div v-show="visible">
      <div class="weui-toast" :class="{ 'weui-toast_text': type === 'text' }" ref="toast">
        <wv-icon :type="icon" class="weui-icon_toast" v-if="type !== 'text' && type !== 'loading'" />
        <wv-spinner class="weui-icon_toast" v-if="type === 'loading' && spinnerType !=='none'" :type="spinnerType" :size="25" />
        <p class="weui-toast__content" v-text="message" />
      </div>
    </div>
  </transition>
</template>

<script>
  import WvIcon from '../x-toast-icon/index'
  import WvSpinner from '../x-spinner/index'
  import PopupMixin from '../../../mixins/popup'

  export default {
    name: 'x-toast',

    components: {
      WvIcon,
      WvSpinner
    },

    mixins: [PopupMixin],

    props: {
      mask: {
        default: true
      },
      icon: {
        type: String,
        default: 'success-no-circle'
      },
      type: {
        type: String,
        default: 'success',
        validator: (value) => {
          return ['success', 'fail', 'loading', 'text', 'html'].indexOf(value) !== -1
        }
      },
      spinnerType: {
        type: String,
        default: 'default'
      },
      message: {
        type: String,
        default: ''
      },
      maskClass: {
        default: 'weui-mask_transparent'
      }
    }
  }
</script>

<style lang="scss">
  .weui-icon_toast {
    font-size: 40px;
  }

  .weui-toast_text {
    width: auto;
    min-width: 0;
    max-width: 85%;
    min-height: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
    text-align: center;
    word-break: break-all;

    .weui-toast__content {
      margin: 0;
      padding: 0.5em 1em;
    }
  }
</style>
