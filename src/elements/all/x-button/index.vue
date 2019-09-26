<template>
  <x-a  class="weui-btn btn_a" :style="'background-color:'+buttombc+';'" :class="classObject" @click="handleClick" :disabled="disabled">
    <i class="weui-loading" v-if="isLoading" />
    <slot />
  </x-a >
</template>

<script>
  export default {
    name: 'x-button',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      isLoading: Boolean,
      disabled: Boolean,
      mini: Boolean,
      plain: Boolean,
      buttombc: {
        type: String,
        default: '#9816f4'
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    },
    computed: {
      classObject () {
        let ret = {}
        let classType = this.plain ? `weui-btn_plain-${this.type}` : `weui-btn_${this.type}`
        let classDisabled = this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'
        ret[classType] = true
        ret[classDisabled] = this.disabled
        ret['weui-btn_loading'] = this.isLoading
        ret['weui-btn_mini'] = this.mini
        return ret
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/variable.scss';

  @import '@/assets/style/variable.scss';

  .btn_a {
    display: block;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    text-align: center;
    line-height: 45px;
    color: $gl-light;
    font-size: 18px;
    &:active {
      opacity: 0.8;
    }
  }
</style>
