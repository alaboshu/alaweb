<template>
  <view class="h5-zk-amount">
    <view class="x-amount_zichan">
      <view class="x-amount_my" v-if="false">我的资产</view>
      <view class="x-amount_ul">
        <ul v-if="viewModel">
          <li class="x-amount_li" :style="'width:'+100/gridCol+'%'" v-for="(item,index) in viewModel" :key="index" :class="{'x-amount_lenght':viewModel.lenth>4}">
            <a>
              <span class="x-amount_span x-amount_color" ref="Xamountcolor">{{item.amount}}</span>
              <span class="x-amount_span x-amount_size">{{item.moneyTypeName}}</span>
            </a>
          </li>
        </ul>
      </view>
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        viewModel: null,
        gridCol: '4'
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var para = {
          userId: this.$user.id()
        }
        var response = await this.$api.httpGet('/api/account/allaccounts', para)
        if (response.status === 1) {
          this.viewModel = response.result
        } else {
          this.$api.toastWarn(response.message)
        }
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
    border-bottom: 1px solid $gl-border2;
    padding: 10px 0px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
