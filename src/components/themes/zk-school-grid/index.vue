<template>
  <view class="zk-school-grid">
    <view class="school_grid_container">
      <view class="daily-use-container">
        <view class="daily-use_item" v-for="(item,index) in widget.value.links" :key="index" @click="goLinks(item.url.value)">
          <img :src="item.image" alt="">
          <view class="use_item_name">{{item.name}}</view>
        </view>
      </view>
      <view class="school_banner_img" @click="$api.to('/pages/index?path=user_bookingsignup_show&id=5d37fae223563c12a82dc3d4')">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-24/5d381ce123563c12a82e062e.jpg" alt="">
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
        dataList: [
          {
            name: '厨房用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08892.jpg'
          },
          {
            name: '生活用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08890.jpg'
          },
          {
            name: '家具用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d0888f.jpg'
          },
          {
            name: '其他',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08891.jpg'
          },
          {
            name: '厨房用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08892.jpg'
          },
          {
            name: '生活用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08890.jpg'
          },
          {
            name: '家具用品',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d0888f.jpg'
          },
          {
            name: '其他',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-09/5cfcca8b4ed54f0e70d08891.jpg'
          }
        ]
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
        // this.widgetModel = await this.$api.isApiReqGet(this.widget)

      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
