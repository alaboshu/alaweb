<template>
  <zk-qrcode></zk-qrcode>
</template>

<script>
  import uniIcon from './uni-icon'
  import minx from './mix'
  export default {
    mixins: [minx],
    components: {
      uniIcon
    },
    methods: {
      getToBlack () {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>
