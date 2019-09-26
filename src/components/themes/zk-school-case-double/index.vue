<template>
  <view class="zk-school-case-double">
    <view class="school_case_double_container" v-if="widgetModel">
      <view class="case_card_top" v-if="widgetModel[0]">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561721737436&di=d785a448f9f1f1b1d3072f05969c1c18&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F84%2F79%2F06g58PICwsU.jpg" alt="">
        <span>{{widgetModel[0].name}}</span>
      </view>
      <view class="case_card_img" v-if="widgetModel[0]">
        <view class="case_card_img_item" v-for="(item,index) in dataList" :key="index" @click="goDetail(item._id)">
          <img :src="item.image" alt="" v-if="item.switch">
        </view>
      </view>
      <view class="case_card_text" v-if="widgetModel[0].switch">
        <view class="case_card_text_info" v-html="widgetModel[0].detail">商家简介 --- 商家专提供自己独特的产品关于商家专提供自己独特的产品关于</view>
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
        dataList: []
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
        if (this.widget.value) {
          var par = {
            TableName: this.widget.value.name
          }
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        } else {
          this.$api.toastWarn(response.message)
        }
        for (var i = 0; i < this.widgetModel.length; i++) {
          if (i < 2) {
            this.dataList.push(this.widgetModel[i])
          }
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=school_detail&id=' + id + '&TableName=' + this.widget.value.name)
      }
    }
  }
</script>
