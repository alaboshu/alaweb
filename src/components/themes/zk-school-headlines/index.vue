<template>
  <view class="zk-school-headlines">
    <!-- v-if="allDataList.length!==0" -->
    <!-- :style="'height:'+screen.height+'px;overflow-y: auto;'" -->
    <scroll-view scroll-y="true" @scrolltolower="scrolltolower">
      <view class="school-headlines_container">
        <view class="video_list_head">
          <span>新闻头条</span>
          <!-- <span>查看更多
          <x-icon name="icon-zk-jiantou" size="11"></x-icon>
        </span> -->
        </view>
        <view class="school-headlines_container_item">
          <view class="item_list" v-for="(item,index) in widgetModel.result" :key="index" @click="goDetail(item.id)">
            <view class="item_list_L">
              <view class="item_list_L_name">{{item.title}}</view>
              <view class="item_list_text">{{item.createTime}}</view>
            </view>
            <view class="item_list_R">
              <img :src="$api.baseUrl() + item.image" alt="">
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
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
        this.widgetModel = this.widget
      },
      goDetail (id) {
        this.$api.to('/pages/news/detail?id=' + id)
      },
      scrolltolower () {

      }
    }
  }
</script>
