<template>
  <img :class="xClass" :src="imgSrc" @click="onClick" :style="'width:'+size+'px;height:'+size+'px'">
</template>

<script>
  export default {
    name: 'x-icon',
    props: {
      src: {
        type: String
      },
      xClass: {
        type: String
      },
      link: [String, Object],
      size: {
        type: String,
        default: '24'
      }
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        imgSrc: ''
      }
    },
    computed: {
      clazz () {
        return {
          'svg-icon': true,
          spin: this.spin
        }
      }
    },
    methods: {
      init () {
        //  console.info('x-icon', this.src)
        if (this.src.indexOf('/') <= 0) {
          // 不是远程图标，使用本地图标
          this.imgSrc = '/static/svg/' + this.src + '.svg'
          // console.info('x-icon', this.src)
        } else {
          this.imgSrc = this.src
        }
      },
      onClick () {
        // !this.disabled && go(this.link, this.$router)
        /* istanbul ignore next */
        // window.location.href = this.link
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  img {
    vertical-align: baseline;
  }
  .svg-icon {
    display: inline-block;
    fill: currentColor;
  }
</style>
