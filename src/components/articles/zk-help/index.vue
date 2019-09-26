<template>
  <view class="zk-help">
    <view class="zk-help-head">
      <view class="zk-help-return" @click="back">
        <x-icon src="zk-return" color="#ffffff"></x-icon>
        <h1 class="title">帮助中心</h1>
      </view>
      <view class="zk-help_top">
        <x-a path="tel://400-680-9088" class="zk-help-tel">立即咨询</x-a>
      </view>
    </view>

    <!-- <zk-grid v-if="classWidet" :valueArray="classWidet"></zk-grid> -->
    <view class="zk-help-lists">
      <view class="page">
        <view class="uni-card">
          <view class="uni-list">
            <view v-for="(item,index) in this.topList" :key="index" class="uni-list-cell" hover-class="uni-list-cell-hover">
              <x-a :path="item.url">
                <view class="uni-list-cell-navigate uni-navigate-right">{{item.title}}</view>
              </x-a>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        gridCol: '4',
        classWidet: undefined,
        topList: []
      }
    },
    props: {
      widget: {},
      iconClass: {
        type: String,
        default: 'metal'
      },
      iconSize: {
        type: Number,
        default: 45
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var res = await this.$api.httpGet('/api/article/helpclassify')
        this.classWidet = res.result
        res = await this.$api.httpGet('/api/article/tophelplist')
        this.topList = res.result.apiDataList
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./style.scss";
</style>
