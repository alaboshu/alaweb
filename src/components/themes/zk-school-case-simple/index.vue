<template>
  <view class="zk-school-case-simple">
    <view class="school_case_simple_container" v-for="(item,index) in widgetModel" :key="index">
      <view class="case_card_top">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561721737436&di=d785a448f9f1f1b1d3072f05969c1c18&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F84%2F79%2F06g58PICwsU.jpg" alt="">
        <span v-if="item.switch">{{item.name}}</span>
      </view>
      <view class="case_card_img" @click="goDetail(item._id)" v-if="item.switch">
        <view class="case_card_img_item">
          <img :src="item.image" alt="">
        </view>
      </view>
      <view class="case_card_text" v-if="item.switch">
        <view class="case_card_text_info" v-html="item.remarks">商家简介 --- 商家专提供自己独特的产品关于商家专提供自己独特的产品关于</view>
        <!-- <view class="case_card_text_info" v-html="item.detail">商家简介 --- 商家专提供自己独特的产品关于商家专提供自己独特的产品关于</view> -->
      </view>
      <view class="case_card_btn" v-if="showTag">
        <view class="case_card_btn_top">
          <span>新品优选</span>
          <span>会员低价</span>
        </view>
        <view class="case_card_btn_bottom">
          <span>￥39.9</span>
          <span>立即抢购</span>
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
        showTag: false
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
        if (this.widget.route.path === 'school_product') {
          this.showTag = true
        }
        let par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        } else {
          this.$api.toastWarn(response.message)
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=school_detail&id=' + id + '&TableName=' + this.widget.value.name)
      }
    }
  }
</script>
