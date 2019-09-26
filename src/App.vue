<script>
  export default {
    name: 'App',
    mpType: 'app',
    async onLaunch () {
      /* eslint-disable */
      await this.$api.checkUpdatin()
      // #ifdef APP-PLUS  
      plus.push.addEventListener('click', function (message) {
        // plus.nativeUI.toast('push click')
        // _handlePush(message)
      })
      plus.push.addEventListener('receive', function (message) {
        // plus.nativeUI.toast('push receive')
        plus.push.createMessage(message.title)
        // _handlePush(message)
      })
      // #endif  
    }
  }
</script>
