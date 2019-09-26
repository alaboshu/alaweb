<template>
  <view class="zk-business-card">
    <view class="business-card_list">
      <view class="business-card_left">
        <view class="card-title">{{widgetModel.name}}</view>
        <view class="card-intro">{{widgetModel.description}}</view>
      </view>
      <view class="business-card_right">
        <img class="card_img" :src="widgetModel.logo" />
      </view>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {}
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
        var res = await this.$api.httpGet('/Api/MerchantProduct/GetMerchantProducts')
        if (res.status === 1) {
          this.widgetModel = res.result.merchantStore
          document.title = this.widgetModel.name
          // 针对微信中的处理
          const iframe = document.createElement('iframe')
          iframe.src = ''
          iframe.style.display = 'none'
          iframe.onload = () => {
            setTimeout(() => {
              iframe.remove()
            }, 9)
          }
          document.body.appendChild(iframe)
        }
      }
    }
  }
</script>
