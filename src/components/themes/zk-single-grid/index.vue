<template>
  <view class="zk-single-grid">
    <view class="single-grid-container">
      <view class="inde-grid-box" v-if="widget.value.links">
        <view class="grid-item" v-for="(item,index) in widget.value.links" :key="index" @click="goLinks(item.url.value)">
          <view class="grid_img">
            <img :src="item.image" alt="">
          </view>
          <p class="grid_info">{{item.name}}</p>
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
        dataList: [
          {
            name: '厨房小家',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239b.png'
          },
          {
            name: '个人护理',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239a.png'
          },
          {
            name: '家具品牌',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c72399.png'
          },
          {
            name: '其他',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239c.png'
          }
        ]
      }
    },
    props: {
      widget: {}
      /*  dataContent: {
         type: Array,
         data: this.dataList
       } */
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
