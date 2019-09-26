<template>
  <view class="zk-data-merchant-grid">
    <view class="merchant-grid_box">
      <view class="merchant-list-head">开通商家</view>
      <view class="grid_conter">
        <router-link to="" class="grid_conter-a" :style="'width:'+100/3+'%;'" v-for="(item,index) in widgetModel" :key="index">
          <view class="grid_conter-number">{{item.count}}</view>
          <view class="grid_conter-title">{{item.gradeName}}</view>
        </router-link>
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
        var data = {
          userId: 1
        }
        this.widgetModel = await this.$crud.widget(this, 'MerchantGridWidget', data)
      }
    }
  }
</script>
