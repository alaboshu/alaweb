<script>
  import api from '@/service/api/version.api.js'
  export default {
    name: 'App',
    mpType: 'app',
    async onLaunch () {
      /* eslint-disable */
      // #ifdef APP-PLUS  
      await api.checkVersion()
      plus.push.addEventListener('click', function (message) {
        // plus.nativeUI.toast('push click')
        // _handlePush(message)
      })
      plus.push.addEventListener('receive', function (message) {
        plus.push.createMessage(message.title)
        // _handlePush(message)
      })
      // #endif  
    }
  }
</script>
