<template>
  <view class="zk-data-merchant-list">
    <view class="merchant-list-box">
      <view class="merchant-list-head">我的端口</view>
      <view class="time-quantum">03-10 22:56:31</view>
      <view class="merchant-listbox">
        <ul class="merchant-ul">
          <li class="merchant-li" v-for="(item,index) in widgetModel" :key="index">
            <view class="merchant-li-list">
              <view class="merchant-img_box">
                <image class="merchant-img" src="../../../static/svg/standard-business.png" alt="" />
              </view>
              <view class="merchant-title">{{item.gradeName}}</view>
            </view>
            <view class="merchant-list_right">
              <view class="right-box">
                <view class="right-box_number" :class="{'strikethrough':item.totalCount=='0'}">{{item.totalCount}}</view>
                <view class="right-box_intro" :class="{'strikethrough':item.totalCount=='0'}">免费享有</view>
              </view>
              <view class="merchant-decollator"></view>
              <view class="right-box">
                <view class="right-box_number" :class="{'strikethrough':item.usableCount=='0'}">{{item.usableCount}}</view>
                <view class="right-box_intro" :class="{'strikethrough':item.usableCount=='0'}">当前可用</view>
              </view>
            </view>
          </li>
        </ul>
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
        list: [
          { name: '标准商家', number1: '1000', title1: '免费享有', number2: '20', title2: '当前可用' },
          { name: '标准商家', number1: '1000', title1: '免费享有', number2: '20', title2: '等级不够' },
          { name: '标准商家', number1: '1000', title1: '免费享有', number2: '0', title2: '当前可用' },
          { name: '标准商家', number1: '1000', title1: '免费享有', number2: '20', title2: '当前可用' },
          { name: '标准商家', number1: '1000', title1: '免费享有', number2: '0', title2: '等级不够' }
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
        var data = {
          userId: 1
        }
        this.widgetModel = await this.$crud.widget(this, 'MerchantListWidget', data)
      }
    }
  }
</script>
