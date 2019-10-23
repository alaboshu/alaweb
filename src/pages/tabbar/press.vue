<template>
  <view>
    <zk-school-headlines :widget="pressData"></zk-school-headlines>
  </view>
</template>


<script>
  import pressJson from './json/press.json'
  export default {
    data () {
      return {
        pressData: pressJson.apiDataList
      }
    }
  }
</script>
