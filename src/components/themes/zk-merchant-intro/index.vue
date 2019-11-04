<template>
  <view class="zk-merchant-intro">
    <view class="merchant_intro_container">
      <view class="top_banner">
        <view class="banner_top_title" @click="goBack()">
          <x-icon name="zk-return" size="17"></x-icon>
          <span>企业名片</span>
        </view>

      </view>
      <!-- <view class="merchant_intro">
        <span>企业名片</span>
        <span>2019年1月11日，“咚巴拉平台全球品牌战略发布会”在东莞厚街喜来登酒店隆重举行。
          本次活动由中亚联投集团、深圳企品汇电子商务科技股份有限公司主办；中国发展研究院、
          中国管理科学研究院、延川梁家河村青山商贸有限公司等单位共同协办。
        </span>
      </view>
      <view class="merchant_content">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-21/5ce3a8df17a7b50da0c51b1e.jpg" alt="" class="banner_img">
        <view class="content_text">在此次发布会上，深圳市双创服务协会、中国管理科学研究院深圳分院、
          亚太财税集团等成为该平台的战略伙伴单位，咚巴拉平台以整合五大合伙人为运营模式，共同实现增值和共赢。</view>
      </view> -->
      <view v-html="widgetModel" class="intro_content"></view>
    </view>
  </view>
</template>

<script>
  //
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
        var res = await this.$api.httpGet('/Api/AutoConfig/Get?Type=EnterpriseIntroductionConfig')
        if (res.status === 1) {
          this.widgetModel = res.result.intro
        }
      },
      goBack () {
        this.$api.back('index')
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
