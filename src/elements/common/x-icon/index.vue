<template>
  <img class="svg-icon" :src="src" @click="onClick" :style="'width:'+size+'px;height:'+size+'px'">
</template>

<script>
  export default {
    name: 'x-icon',
    props: {
      src: {
        type: String
      },
      link: [String, Object],
      size: {
        type: String,
        default: '18'
      }
    },
    created () {
      this.init()
    },
    data () {
      return {
        Iclass: this.class
      }
    },
    methods: {
      init () {
        console.info('x-icon', this.src)
        if (this.src.indexOf('/') <= 0) {
          this.src = 'src/assets/svg/' + this.src
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

<style>
  .svg-icon {
  	display: inline-block;
  	fill: currentColor;
  }
</style>
