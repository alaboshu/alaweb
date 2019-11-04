<template>
  <view class="zk-card" v-if="widgetModel">
    <view class="zk-card_al">
      <view class="list" v-for="(item, index) in widgetModel" :key="index" :style="'background: url('+item.bankLogo+') no-repeat;background-size: 100% 100%;background-position: center center;'">
        <view class="list_cont">
          <view class="zk-card-buttom">
            <view>{{item.number}}</view>
          </view>
        </view>
        <view @click="unbind(item)" class="button">解除绑定</view>
      </view>
    </view>
    <navigator url="/pages/index?path=finance_bankcard_add" @click="addCars">
      <div class="car-btn">添加银行卡</div>
    </navigator>
    <view class="temporarily_box" v-if="!widgetModel || widgetModel.length===0">
      <view class="temporarily">
        <img class="temporarily_img" src="http://www.szwft.me/img/nodata.png">
      </view>
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: null
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
        var response = await this.$api.httpGet('Api/BankCard/GetBankCardListByUserId')
        if (response.status === 1) {
          this.widgetModel = response.result
        }
      },
      addCars () {
        if (window) {
          this.$api.to('/pages/index?path=finance_bankcard_add')
        }
      },
      delItem () {
        uni.showToast({
          title: '持卡人姓名不能为空',
          icon: 'none',
          mask: true
        })
      },
      unbind (item) {
        var para = {
          id: item.id
        }
        var _this = this
        uni.showModal({
          content: '确认解除此卡绑定？',
          success: async (res) => {
            if (res.confirm) {
              var response = await this.$api.httpDelete('Api/BankCard/DeleteBankCard', para)
              if (response.status === 1) {
                uni.showToast({
                  icon: 'none',
                  title: response.message,
                  success: () => {
                    setTimeout(() => {
                      _this.init()
                    }, 500)
                  }
                })
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./var.scss";
</style>
