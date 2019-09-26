<template>
  <view class="zk-data-column-list-a" v-if="async">
    <view class="zk-data-column-list">
      <view class="container_box">
        <view class="list_title"><span v-if="widgetModel.name">{{widgetModel.name}}权益</span><span class="triangle"></span></view>
        <view class="list_all">
          <view class="list_item" v-for="(item,index) in widgetModel.privileges" :key="index">
            <view class="bgImg">
              <img :src="item.icon" class="bgImg_box">
            </view>
            <view class="list_item_text">
              <span>{{item.name}}</span>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import apiUrl from '@/service/config.js'
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        async: false,
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.api = apiUrl.apiBaseUrl
        this.async = true
      }
    },
    watch: {
      widget (val) {
        this.widgetModel = val
      }
    }
  }
</script>
