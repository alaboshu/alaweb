<template>
  <view class="zk-evaluate">
    <view class="evaluate-detail" v-if="false">
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4060543606,3642835235&fm=27&gp=0.jpg" alt="">
      <view class="cont">
        <p>[包邮] 亚洲较大的网上交易平台,提供各类服饰、美容、家居、数码、话费/点卡充值…</p>
        <p class="price">￥17.00</p>
      </view>
    </view>
    <view class="evaluate">
      <view class="text">评价:</view>
      <radio-group :name="String(widgetModel.reviewType)">
        <label>
          <radio :value="String(1)" checked="true" />好评</label>
        <label>
          <radio :value="String(2)" />中评</label>
        <label>
          <radio :value="String(3)" />差评</label>
      </radio-group>
    </view>
    <view class="evaluate">
      <view class="text">商品评分:</view>
      <unirate :value="widgetModel.productScore" @change="productScore" size="18"></unirate>
    </view>
    <view class="evaluate">
      <view class="text">物流服务:</view>
      <unirate :value="widgetModel.serviceScore" size="18" @change="serviceScore"></unirate>
    </view>
    <view class="evaluate">
      <view class="text">服务态度:</view>
      <unirate :value="widgetModel.logisticsScore" size="18" @change="logisticsScore"></unirate>
    </view>
    <view class="evaluate">
      <view class="text">评价内容:</view>
      <textarea v-model="widgetModel.content" class="textarea" maxlength="1000"></textarea>
    </view>
    <view class="evaluate">
      <view class="text">晒图:</view>
      <upload :widgetModel="widgetModel"></upload>
    </view>
    <view class="evaluate">
      <view class="text"></view>
      <view @click="save" class="evaluate-bottom">提交评价</view>
    </view>
  </view>
</template>

<script>
 
  import unirate from './stars/uni-rate.vue'
  import upload from './upload/upload.vue'
  import './var.scss'


  export default {
    
    data () {
      return {
        widgetModel: {},
        inshow: false
      }
    },
    components: { unirate, upload },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.inshow = false
     this.widgetModel = await this.$api.themeWidget(this.widget)
        this.widgetModel = await this.$crud.getView(this, 'api/Evaluate/viewbyid')
        this.widgetModel.id = '564'
        this.widgetModel.content = ''
        this.inshow = true
      },
      productScore (val) {
        this.widgetModel.productScore = val.value
      },
      serviceScore (val) {
        this.widgetModel.serviceScore = val.value
      },
      logisticsScore (val) {
        this.widgetModel.logisticsScore = val.value
      },
      async save () {
        await this.$crud.save(this, 'api/Evaluate/QuerySave', this.widgetModel)
      }
    }
  }
</script>
