<template>
  <view class="zk-card" v-if="widgetModel">
    <!--  <ul class="zk-card-list">
      <li class="zk-card-item" v-for="(item,index) in widgetModel" :key="index">
        <p v-html="item.userName" class="user-name"></p>
        <div class="zk-card-user-news">
          <p class="car-name">{{item.name}}</p>
          <p class="car-number">{{item.number}}</p>
        </div>
        <p class="car-address">{{item.address}}</p>
        <p class="car-bottom" @click="delItem">
          <span>删除</span>
          <x-icon src="zk-deletes"></x-icon>
        </p>
      </li>
    </ul> -->
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
        <img class="temporarily_img" src="http://ui.5ug.com/static/demo/imageList/02.png">
      </view>
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: ''
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet('Api/BankCard/GetBankCardListByUserId', para)
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
