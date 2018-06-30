<template>
  <img class="svg-icon" :src="Isrc" @click="onClick" :style="'width:'+fontSize">
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
        default: '30px'
      }
    },
    data () {
      return {
        fontSize: this.size,
        Isrc: this.src,
        Iclass: this.class
      }
    },
    methods: {
      onClick () {
        // !this.disabled && go(this.link, this.$router)
        /* istanbul ignore next */
        window.location.href = this.link
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
