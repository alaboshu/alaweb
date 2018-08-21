<template>
  <div class="common-x-box  weui-form-preview" element-path="common/x-box">
    <div :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-box',
    props: {
      elementData: {},
      all: { type: String },
      top: { type: String },
      left: { type: String },
      right: { type: String },
      bottom: { type: String }
    },
    computed: {
      style () {
        if (this.all != null) {
          return {
            margin: this.all + 'px'
          }
        } else {
          return {
            marginTop: this.top + 'px',
            marginLeft: this.left + 'px',
            marginright: this.right + 'px',
            marginBottm: this.bottom + 'px'
          }
        }
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      }
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less';
  .common-x-box {
    font-size: @font-size-base;
  }
</style>
