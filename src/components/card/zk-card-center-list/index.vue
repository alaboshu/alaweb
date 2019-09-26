<template>
  <view class="zk-card-center-list-a">
    <view class="zk-card-center-list">
      <view class="container_box">
        <view class="list_item" v-for="(item,index) in list" :key="index" @click="goLinks(item.url.value)">
          <view class="bg_img">
            <img :src="item.image">
          </view>
          <view class="list_text">{{item.name}}</view>
        </view>
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
        widgetModel: {},
        list: []
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
        this.list = this.widget
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
</style>

