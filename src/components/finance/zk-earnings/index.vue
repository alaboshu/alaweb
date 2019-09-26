<template>
  <view class="zk-earnings">
    <view class="zk-earn-head" @click="back">
      <x-icon src="zk-return" color="#ffffff"></x-icon>
    </view>
    <view class="zk-earns-top">
      <h2>我的钱包</h2>
      <p class="zk-earns-amount">{{this.statistic.balance}}</p>
      <view class="zk-earns-topB">
        <view class="zk-earns-topL">
          <p>累计收益</p>
          <p class="topB-Mon">{{this.statistic.total}}</p>
        </view>
        <view class="zk-earns-topR">
          <p>今日收益</p>
          <p class="topB-Mon">{{this.statistic.today}}</p>
        </view>
      </view>
    </view>
    <view class="zh-earns-content">
      <zk-list :widget="this.widget"></zk-list>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        statistic: {},
        listWidget: {},
        show: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      // var header = document.getElementsByTagName('uni-page-head')
      // header[0].style.display = 'none'
    },
    methods: {
      async  init () {
        var res = await this.$api.httpGet('/api/user/getearnstatistic')
        this.statistic = res.result
      },
      back () {
        this.$router.go(-1)
      }
    },
    computed: {}
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import './style.scss';


</style>
