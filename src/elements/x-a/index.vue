<template>
  <navigator :url="realUrl">
    <slot></slot>
  </navigator>
</template>

<script>
  export default {
    name: 'x-a',
    props: {
      url: {},
      path: {}
    },
    data () {
      return {
        realUrl: ''
      }
    },
    mounted () {
      if (this.url !== undefined) {
        this.realUrl = this.url
      }
      if (this.path !== undefined) {
        this.realUrl = '/pages/index?path=' + this.path
      }
    },
    methods: {
    }
  }
</script>

