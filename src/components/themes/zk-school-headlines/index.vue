<template>
  <view class="zk-school-headlines">
    <view class="school-headlines_container">
      <view class="video_list_head">
        <span>牛牛头条</span>
        <!-- <span>查看更多
          <x-icon name="icon-zk-jiantou" size="11"></x-icon>
        </span> -->
      </view>
      <view class="school-headlines_container_item">
        <view class="item_list" v-for="(item,index) in widgetModel" :key="index" @click="goDetail(item.id)">
          <view class="item_list_L">
            <view class="item_list_L_name">{{item.title}}</view>
            <view class="item_list_text">{{item.intro}}</view>
          </view>
          <view class="item_list_R">
            <img :src="item.image" alt="">
          </view>
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        var para = {
          pageIndex: 1,
          pageSize: 10
        }
        var res = await this.$api.httpGet('/api/article/toplinelist', para)
        var arr = []
        for (var i = 0; i < res.result.apiDataList.length; i++) {
          if (i < 4) {
            arr.push(res.result.apiDataList[i])
          }
        }
        this.widgetModel = arr
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=articles_topline_show&id=' + id)
      }
    }
  }
</script>
