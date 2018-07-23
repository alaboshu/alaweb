<template>
  <a class="weui-btn" :class="classObject" @click="handleClick" :disabled="disabled">
    <i class="weui-loading" v-if="isLoading" />
    <slot />
  </a>
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
      plain: Boolean
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

<style lang="less">
</style>
