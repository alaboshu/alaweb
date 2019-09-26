<template>
  <view class="zk-school-case-card" v-if="widgetModel">
    <view class="school_case_card_container" v-for="(Citem,index) in widgetModel" :key="index">
      <view class="case_card_top">
        <img src="http://img3.imgtn.bdimg.com/it/u=660669131,2652560896&fm=26&gp=0.jpg" alt="">
        <span v-if="widgetModel">{{Citem.name}}</span>
      </view>
      <view class="case_card_img" v-if="Citem.switch">
        <view class="card_img_left" @click="goDetail(Citem._id)">
          <img :src="Citem.image" alt="">
        </view>
        <view class="card_img_right">
          <view class="card_img_right_item" v-for="(item,indexs) in shopsList" :key="indexs" @click="goDetail(item._id)">
            <img :src="item.image" alt="">
          </view>
        </view>
      </view>
      <view class="case_card_text">
        <view class="case_card_text_info" v-if="Citem.remarks" v-html="Citem.remarks"></view>
        <!-- <view class="case_card_text_info" v-else v-html="Citem.remarks"></view> -->
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
        shopsList: []
      }
    },
    props: {
      widget: {},
      showTag: {
        default: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        let par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        } else {
          this.$api.toastWarn(response.message)
        }
        for (let i = 0; i < 2; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.length)
          this.shopsList.push(this.widgetModel[roundMath])
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=school_detail&id=' + id + '&TableName=' + this.widget.value.name)
      }
    }
  }
</script>
