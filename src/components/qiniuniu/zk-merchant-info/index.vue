<template>
  <view class="zk-merchant-info-a">
    <view class="zk-merchant-info">
      <view class="container_box" v-for="(item,index) in infoList" :key="index">
        <view class="info_left">
          <view class="merchant_name">
            <view class="merchant-title">{{item.name}}</view>
            <view class="merchant-money">￥{{item.price}}</view>
          </view>
          <view class="text">{{item.text1}}</view>
          <view class="text">{{item.text2}}</view>
          <view class="text">{{item.text3}}</view>
          <view class="info_right">
            <view class="btn_buy">点击购买</view>
          </view>
        </view>
        <view class="container-list">
          <image class="container-img" :src="item.img" :style="'height:'+conterImage+'px;'+'width:'+conterImage+'px;'" />
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
        infoList: [
          {
            name: '标准商家',
            text1: '可采购平台内50%的 产品',
            text2: '赠送标准商家端口5个',
            text3: '赠送价值9800元《系统业绩倍增》课程一套',
            img: 'http://statichome.weimob.com/img/nweb/img/zhan/ban_zhan.png?20190213',
            price: '990'
          },
          {
            name: '至尊商家',
            text1: '可采购平台内50%的 产品',
            text2: '赠送标准商家端口5个',
            text3: '赠送价值9800元《系统业绩倍增》课程一套',
            img: 'http://statichome.weimob.com/img/nweb/img/xst/sales-ban.png?20180609',
            price: '6000'
          },
          {
            name: '联盟商家',
            text1: '可采购平台内50%的 产品',
            text2: '赠送标准商家端口5个',
            text3: '赠送价值9800元《系统业绩倍增》课程一套',
            img: 'http://statichome.weimob.com/img/nweb/img/buss/ban_buss.png?20180301',
            price: '1.5w'
          }
        ],
        conterImage: ''
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
        var this_ = this
        uni.getSystemInfo({
          success: function (res) {
            this_.conterImage = (res.screenWidth - 20) * (4 / 10)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

