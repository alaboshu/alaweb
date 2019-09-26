<template>
  <view class="zk-news-headline-a">
    <view class="zk-news-headline">
      <view class="container_box" v-for="item in list" :key="item">
        <view class="headline_left">
          <view class="headline_title">
            <span class="title">任正非接受CNN采访：特朗普的恐吓策略会吓跑投资者</span>
            <view class="news_data">
              <span>2019-9-10</span>
              <span style="display:flex">
                <x-icon name="zk-eyecare" size="10" style="margin-top:2px"></x-icon>1.3万
              </span>
            </view>
          </view>
        </view>
        <view class="headline_right">
          <img src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=2285092185,1171881062&fm=85&s=16B1C1214A73649E1AB578830300E090">
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
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
