<template>
  <view class="zk-school-class-train">
    <view class="school_class_train">
      <view class="school_timeline_container">
        <view class="video_list_head">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-01/5d19ab02e11c550c2c006265.png" alt="">
          <span>往期回顾</span>
        </view>
        <view class="school_timeline_item" v-for="(item,index) in longData" :key="index" @click="goDetail(item.id)">
          <view class="school_timeline_left">
            <img :src="item.image" alt="">
          </view>
          <view class="school_timeline_right">
            <view class="school_timeline_right_name">{{item.name}}</view>
            <view class="school_timeline_right_btn">
              <span>{{item.startTime}}</span>
              <span :class="{'endStart':item.state === 3}">{{getTime(item)}}</span>
            </view>
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
        widgetModel: {},
        longData: []
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
        var res = await this.$api.httpGet('/Api/BookingSignup/QueryList')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
        for (var i = 0; i < this.widgetModel.length; i++) {
          if (this.widgetModel[i].state === 3) {
            this.longData.push(this.widgetModel[i])
          }
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
