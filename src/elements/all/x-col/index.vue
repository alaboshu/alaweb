<template>
  <div class="zkweb-col" :class="xClass" :style="style">
    <slot />
  </div>
</template>
<script>
  export default {
    props: {
      xClass: {
        type: String
      },
      col: {
        type: Number,
        default: 12
      }
    },
    computed: {
      style () {
        if (this.col > 24) {
          this.col = 24
        }
        var num = this.$parent.gutter
        if (num === '') {
          num = 0
        } else {
          num = num / 2
        }
        return {
          paddingLeft: num + 'px',
          paddingRight: num + 'px',
          width: (100 / 24) * this.col + '%'
        }
      }
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less';
  .zkweb-col {
  	float: left;
  }
</style>

