<template>
  <button :style="buttonStyle" class="weui-btn" :class="[{
      'weui-btn_disabled': !plain && disabled,
      'weui-btn_plain-disabled': plain && disabled,
      'vux-x-button-no-border': noBorder,
      'weui-btn_loading': showLoading,
      [`weui-btn_${type}`]: plain,
      [`weui-btn_plain-${type}`]: plain}, className]" :disabled="disabled" :type="type" @click="onClick" :size="mini ? 'mini' : 'default'">
    <i class="weui-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  export default {
    name: 'x-button',
    props: {
      type: {
        default: 'default'
      },
      disabled: Boolean,
      mini: Boolean,
      plain: Boolean,
      text: String,
      showLoading: Boolean,
      link: [String, Object],
      gradients: {
        type: Array,
        validator: function (val) {
          return val.length === 2
        }
      },
      className: String
    },
    methods: {
      onClick () {
        this.$emit('click')
      }
    },
    computed: {
      noBorder () {
        return Array.isArray(this.gradients)
      },
      buttonStyle () {
        if (this.gradients) {
          return {
            background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
            color: '#FFFFFF'
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~style/widget/weui-button/weui-button.less';
  @import '~style/widget/weui-loading/weui-loading.less';

  .weui-btn.vux-x-button-no-border:after {
    display: none;
  }
</style>
