<template>
  <view class="zk-card-merchant-count-a">
    <view class="zk-card-merchant-count">
      <view class="container_box">
        <view class="list_item" v-for="(item,index) in widget.items" :key="index">
          <span>{{item.rightInfo.totalCount-item.rightInfo.totalUseCount}}</span>
          <span>{{item.gradeName}}</span>
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
        list: [
          {
            count: '202',
            name: '标准商家'
          },
          {
            count: '82000',
            name: '众享商家'
          },
          {
            count: '1210',
            name: '至尊商家'
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
