<template>
  <view>
    <zk-amount></zk-amount>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-border-header :widget="accoutWidget"></zk-border-header>
    <zk-grid :widget="accoutWidget"></zk-grid>
  </view>
</template>

<script>
  import accoutJson from './json/accout.json'

  export default {
    data () {
      return {
        accoutWidget: accoutJson
      }
    }
  }
</script>
