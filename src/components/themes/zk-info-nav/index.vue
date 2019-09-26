<template>
  <view class="zk-info-nav">
    <div class="zk-all">
      <div class="zk-nav-top">
        <p class="totday_get">今日收款(元)</p>
        <p class="count">0.00</p>
        <p class="mode_mount">
          <span class="text">交易共</span>
          <span class="total_mount">0</span>
          <span class="text">笔，客户共</span>
          <span class="total_mount">0</span>
          <span class="text">人</span>
        </p>
      </div>
      <div class="zk-nav-foot">
        <p>
          <!-- //  <img src="../../../assets/img/l1.png"> -->
          <span>收益记录</span>
        </p>
        <p>
          <!-- <img src="../../../assets/img/l2.png"> -->
          <span>提现</span>
        </p>
      </div>
    </div>
  </view>
</template>

<script>

  import './var.scss'
  import './styles/a.scss'

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
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
