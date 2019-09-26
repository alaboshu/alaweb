<template>
  <view class="zk-data-brand-list-a">
    <view class="zk-data-brand-list">
      <view class="container_box">
        <view class="list_item" v-for="(item,index) in widget" :key="index">
          <view class="brand_list_left">
            <view class="merchant_name">{{item.gradeName}}</view>
            <view class="merchant_icon">
              <img :src="item.icon" style="width:80px;height:80px;margin-top:8px;margin-left:-15px" alt="">
            </view>
          </view>
          <view class="brand_list_middle" style="font-size:12px">
            <span>{{item.gradeName}}端口</span>
            <span class="span_list">{{item.rightInfo.totalCount}}</span>
            <span>剩余{{item.gradeName}}端口</span>
            <span class="span_list">{{Number(item.rightInfo.totalCount)-Number(item.rightInfo.totalUseCount)}}</span>
          </view>
          <view class="brand_list_right" @click="onBusiness(item.rightInfo.gradeId)">
            {{item.buttonText}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles/a.scss'


  export default {
    
    data () {
      return {
        widgetModel: {},
        list: [1, 2, 3]
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
        if (this.widget !== null) {
          this.list = this.widget
        }
      },
      onBusiness (gradeId) {
        this.$api.to('/pages/index?path=user_open&gradeId=' + gradeId)
      }
    }
  }
</script>
