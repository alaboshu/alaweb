<template>
  <i class="weui-loading" :style="style" v-if="type === 'default'" />
  <span v-else class="wv-spinner">
    <i class="iconfont" :class="fontClassName" :style="style" />
  </span>
</template>

<script>

  export default {
    name: 'wv-spinner',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: Number,
        default: 17
      },
      color: {
        type: String,
        default: '#aaa'
      }
    },

    computed: {
      fontClassName () {
        switch (this.type) {
          case 'snake':
            return 'icon-spinner-1'
          case 'double-snake':
            return 'icon-spinner9'
          case 'bar-circle':
            return 'icon-spinner2'
          case 'dot-circle':
            return 'icon-spinner1'
          default:
            return ''
        }
      },

      style () {
        return {
          fontSize: this.size + 'px',
          color: this.color
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/iconfont/iconfont.css';
  .wv-spinner {
    display: inline-block;
    overflow: hidden;
    -webkit-animation: circle 1.2s infinite linear;
    -o-animation: circle 1.2s infinite linear;
    animation: circle 1.2s infinite linear;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
