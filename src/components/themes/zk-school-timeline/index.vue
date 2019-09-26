<template>
  <view class="zk-school-timeline">
    <view class="school_timeline_container">
      <view class="video_list_head">
        <span>会议培训</span>

      </view>
      <view class="school_timeline_item" v-for="(item,index) in widgetModel" :key="index" @click="goDetail(item.id)">
        <view class="school_timeline_left">
          <img :src="item.image" alt="">
        </view>
        <view class="school_timeline_right">
          <view class="school_timeline_right_name">{{item.name}}</view>
          <!-- <view class="school_timeline_right_news">剩余名额:10 {{item.address}}</view> -->
          <view class="school_timeline_right_btn">
            <span>{{item.startTime}}</span>
            <span :class="{'endStart':item.state === 3}">{{getTime(item)}}</span>
          </view>
        </view>
      </view>
      <view class="school_timeline_box">
        <view class="timeline_item" v-for="(item,index) in widgetModel" :key="index">
          <span :class="{'endStart':item.state === 3}"></span>
          <span class="timeline_line"></span>
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
        /* var para = {
          pageIndex: 1,
          pageSize: 4
        } */
        var res = await this.$api.httpGet('/Api/BookingSignup/QueryList')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=user_bookingsignup_show&id=' + id)
      },
      getTime (data) {
        if (data.state === 1) {
          return '立即报名'
        }
        if (data.state === 2) {
          return '立即报名'
        }
        if (data.state === 3) {
          return '活动结束'
        }
      }
    }
  }
</script>
