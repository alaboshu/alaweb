<template>
  <div class="container">
    <!-- <zk-grid></zk-grid>
    <zk-swiper></zk-swiper>
    <zk-image></zk-image>
    <zk-product-item></zk-product-item>
    <zk-footer></zk-footer>
    <zk-input></zk-input>
    <zk-label></zk-label> -->
    <zk-product-class></zk-product-class>
  </div>
</template>

<script>
  export default {
    config: {
      'navigationBarBackgroundColor': '#ffffff',
      'navigationBarTextStyle': 'black',
      'navigationBarTitleText': '微信接口功能演示',
      'backgroundColor': '#eeeeee',
      'backgroundTextStyle': true
    },
    data () {
      return {
        clientType: ''
      }
    },
    mounted () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        // var data = await api.get('api/user/info?id=1')
        // console.info('data', data)
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    height: 100%;
  }
</style>
