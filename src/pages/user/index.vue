<template>
  <view>
    <zk-head title="我的中心"></zk-head>
    <zk-product-user :widget="widget"></zk-product-user>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-border-header :widget="viewModel"></zk-border-header>
    <zk-grid :widget="viewModel"></zk-grid>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-border-header :widget="platData"></zk-border-header>
    <zk-grid :widget="platData"></zk-grid>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-image :widget="imageData" style="background: #F0F0F0;"></zk-image>
  </view>
</template>

<script>
  import indexJson from './json/index.json'
  import platform from './json/platform.json'
  import imageJson from './json/imageList.json'
  import minx from './mix/index.js'
  export default {
    mixins: [minx],
    data () {
      return {
        widget: {
          value: {
            name: '',
            image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-08-07/5d4aada9cc65ed20909ca52a.png'
          }
        },
        viewModel: indexJson,
        platData: platform,
        imageData: imageJson
      }
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
