<template>
  <div class="zkweb-row" :class="xClass">
    <slot />
  </div>
</template>
<script>
  export default {
    props: {
      xClass: {
        type: String
      },
      gutter: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    computed: {
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less';
  .zkweb-row {
    width: 100%;
  }
  .zkweb-row:after {
    content: '';
    display: block;
    clear: both;
  }
</style>

