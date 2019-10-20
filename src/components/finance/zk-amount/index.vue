<template>
  <!-- <view class="zk-amount">{{widgetModel}}</view> -->
  <view class="h5-zk-amount" element-path="h5/x-amount">
    <!-- {{viewModel}} -->
    <view class="x-amount_zichan">
      <view class="x-amount_my">我的资产</view>
      <view class="x-amount_ul">
        <ul>
          <li class="x-amount_li" :style="'width:'+100/gridCol+'%'" v-for="(item,index) in viewModel" :key="index" :class="{'x-amount_lenght':viewModellenght>4}">
            <a>
              <span class="x-amount_span x-amount_color" ref="Xamountcolor">{{item.amount}}</span>
              <span class="x-amount_span x-amount_size">{{item.moneyTypeName}}</span>
            </a>
          </li>
        </ul>
      </view>
    </view>
    <view class="x-amount_fuwu">服务</view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        viewModel: '',
        gridCol: '4',
        viewModellenght: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$bus.$off('strikeView').$on('strikeView', () => {
        this.init()
      })
    },
    methods: {
      async  init () {
        //   this.widgetModel = await this.$api.themeWidget(this.widget)
        // this.viewModel = this.widgetModel.value.result
        // this.viewModellenght = this.viewModel.length
        var para = {
          dataId: this.widget.dataId,
          widgetId: this.widget.widgetId,
          userId: this.$user.id()
        }
        var ponsen = await this.$api.httpGet('/api/user/account/allaccounts', para)
        this.viewModel = ponsen.result
        this.viewModellenght = this.viewModel.length
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-amount {
    font-size: $gl-size-base;
  }
  .x-amount_zichan {
    border-top: 1px solid $gl-border2;
  }
  .x-amount_my {
    padding: 10px 0px;
    color: $gl-text3;
    border-bottom: 1px solid $gl-border2;
    font-size: 13px;
    padding-left: 15px;
  }
  .x-amount_ul {
    overflow: hidden;
  }
  .x-amount_span {
    display: block;
    font-size: 12px;
  }
  .x-amount_li {
    float: left;
    text-align: center;
    border-right: 1px solid $gl-border2;
    padding: 10px 0px;
    box-sizing: border-box;
  }
  .x-amount_li:nth-child(4n) {
    border-right: none;
  }
  .x-amount_lenght:nth-child(-n + 4) {
    border-bottom: 1px solid $gl-border2;
  }
  .x-amount_color {
    color: $gl-orange;
  }
  .x-amount_size {
    margin-top: -3px;
  }
  .x-amount_fuwu {
    border-top: 1px solid $gl-border2;
    padding: 10px 15px;
    font-size: 13px;
  }
</style>
