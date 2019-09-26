<template>
  <view class="zk-merchant-list-a">
    <view class="zk-merchant-list">
      <view class="container_box" v-for="(item,index) in infoList" :key="index" :style="'background: url('+item.img+')'">
        <view class="info_left">
          <view class="merchant_name">
            <span>{{item.name}}</span>
            <span>￥{{item.price}}</span>
          </view>
          <view class="text">{{item.text1}}</view>
          <view class="text">{{item.text2}}</view>
          <view class="text">{{item.text3}}</view>
          <view></view>
        </view>
        <view class="info_right">
          <image :src="item.img" />
          <view class="btn_buy">点击购买</view>
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
            text3: '赠送价值9800元 <br />《系统业绩倍增》课程一套',
            img: 'http://img4.imgtn.bdimg.com/it/u=622524462,426902452&fm=26&gp=0.jpg',
            price: '990'
          },
          {
            name: '至尊商家',
            text1: '可采购平台内50%的 产品',
            text2: '赠送标准商家端口5个',
            text3: '赠送价值9800元 <br />《系统业绩倍增》课程一套',
            img: 'http://img4.imgtn.bdimg.com/it/u=622524462,426902452&fm=26&gp=0.jpg',
            price: '6000'
          },
          {
            name: '联盟商家',
            text1: '可采购平台内50%的 产品',
            text2: '赠送标准商家端口5个',
            text3: '赠送价值9800元 <br />《系统业绩倍增》课程一套',
            img: 'http://img4.imgtn.bdimg.com/it/u=622524462,426902452&fm=26&gp=0.jpg',
            price: '1.5w'
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
      }
    }
  }
</script>
