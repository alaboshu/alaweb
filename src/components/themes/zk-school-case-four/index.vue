<template>
  <view class="zk-school-case-four">
    <view class="school_case_four_container" v-if="widgetModel">
      <view class="case_card_top">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561721737436&di=d785a448f9f1f1b1d3072f05969c1c18&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F84%2F79%2F06g58PICwsU.jpg" alt="">
        <span v-if="widgetModel[0 ].switch">{{widgetModel[0].name}}</span>
      </view>
      <view class="case_card_img" v-if="imgList">
        <view class="case_card_img_item" v-for="(item,index) in imgList" :key="index" @click="goDetail(item._id)">
          <img :src="item.image" alt="" v-if="item.switch">
        </view>
      </view>
      <view class="case_card_text" v-if="widgetModel[3].switch">
        <!-- <view class="case_card_text_title" v-if="widgetModel[0]">{{widgetModel[0].name}}</view> -->
        <view class="case_card_text_info" v-html="widgetModel[3].detail">商家简介 --- 阿拉博数是一个完善的营销系统，我们不仅仅提供营销工具与策略，背后更是有一个强大的“产品供应链+仓储物流+互联网技术”作为支撑。为您降低风险、解决后顾之忧。</view>
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
        imgList: [],
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
        for (var i = 0; i < this.widgetModel.length; i++) {
          if (i > 2) {
            this.imgList.push(this.widgetModel[i])
          }
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=school_detail&id=' + id + '&TableName=' + this.widget.value.name)
      }
    }
  }
</script>
