<template>
  <view class="zk-beauty-grid">
    <view class="zk-beauty-grid-container">
      <view class="zk-beauty-grid-list" v-if="widgetModel.value">
        <view class="beauty-grid-list-item" v-for="(item,index) in widgetModel.value.table_875" :key="index" @click="goLinks(item.url.value)">
          <view class="list-item_Img">
            <img :src="item.image" alt="">
          </view>
          <view class="list-item_Name">{{item.name}}</view>
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
            name: '面部护理',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00d0527d430d0ffc832109.png'
          },
          {
            name: '身体护理',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00ddb17d430d0ffc8322cf.png'
          },
          {
            name: '眼部护理',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00ddb17d430d0ffc8322cb.png'
          },
          {
            name: '美发护肤',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00ddb17d430d0ffc8322cd.png'
          },
          {
            name: '卸妆清洁',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00ddb17d430d0ffc8322cc.png'
          },
          {
            name: '其他',
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00ddb17d430d0ffc8322ce.png'
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
