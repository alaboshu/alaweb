<template>
  <view class="zk-logistics-details">
    <view class="details-box">
      <view class="box_title">
        快递方式：{{widgetModel.company}}
      </view>
      <view class="details-box_list" v-for="(item,index) in widgetModel.list" :key="index">
        <view class="conter-list">
          <view class="conter-list_left" :class="{'list_left-one':index==0}"></view>
          <view class="conter-list_coter"></view>
          <view class="conter-list_right list_left-two"></view>
        </view>
        <view class="text_right">
          <view class="text_right-remark">{{item.remark}}</view>
          <view class="time-text">{{item.datetime}}</view>
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
        var para = {
          expressId: this.widget.route.id
        }
        var res = await this.$api.httpGet('/api/order/GetExpressInfo', para)
        var repones = JSON.parse(res.message)
        if (repones.error_code !== 0) {
          this.$api.toastWarn(repones.reason)
          var this_ = this
          setTimeout(function () {
            this_.$api.back()
          }, 1500)
        } else {
          this.widgetModel = repones.result
        }
      }
    }
  }
</script>
