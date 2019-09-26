<template>
  <view class="zk-merchant-image">
    <view :title="widgetModel.name" v-for="(item,index) in widgetModel" :key="index">
      <image :src="item.Image" :alt="item.name" class="zk-merchant-image-bg" :style="{height:height+'px'}" />
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        height: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var res = await this.$api.httpGet('/Api/AutoConfig/List?Type=WebDiyAdShow')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
      }
    }
  }
</script>
