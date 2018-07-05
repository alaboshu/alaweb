<template>
  <img class="svg-icon" :src="imageUrl" @click="onClick" :style="'width:'+fontSize+';height:'+fontSize">
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
        default: '18px'
      }
    },
    created () {
      this.init()
    },
    data () {
      return {
        fontSize: this.size,
        imageUrl: '',
        Iclass: this.class
      }
    },
    methods: {
      init () {
        if (this.src.indexOf('/') <= 0) {
          this.imageUrl = 'src/assets/svg/' + this.src
          console.info('icon', this.imageUrl)
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
