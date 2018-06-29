<template>
  <img class="svg-icon" src="http://admin.czhait.com/wwwroot/assets/svg/zk-classification.svg"></img>
</template>
<script>
  export default {
    name: 'x-icon',
    props: {
      class: {
        type: String
      },
      src: {
        type: String
      },
      link: [String, Object],
      size: {
        type: String,
        default: '1.5rem'
      }
    },
    data () {
      return {
        fontSize: this.size
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
