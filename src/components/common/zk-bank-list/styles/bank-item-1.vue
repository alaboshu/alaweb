<template>
  <view class="bank-item-1" v-if="bankList">
    <!-- :style="'background: url('+item.bgImage+')  no-repeat;background-size: 100%;'" -->
    <view class="list" v-for="(item, index) in bankList" :key="index">
      <view class="bind-delete" @click="deleteClick(item)">接触绑定</view>
      <view class="test">{{item.number}}</view>
    </view>
    <view class="foot">
      <view class="buttom" @click="$base.to('/bank/edit')">添加银行卡</view>
    </view>
    <view style="height: 55px;" v-if="bankList.length > 4"></view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        bankList: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          userId: this.$user.id()
        }
        var response = await this.$api.httpGet('/Api/BankCard/GetBankCardListByUserId', para)
        if (response.status === 1) {
          this.bankList = response.result
        }
      },
      deleteClick (item) {
        uni.showModal({
          content: '确认解除此卡绑定？',
          success: async (res) => {
            if (res.confirm) {
              var para = {
                id: item.id
              }
              var resposne = await this.$api.httpDelete('/Api/BankCard/DeleteBankCard', para)
              if (resposne.status === 1) {
                this.init()
              } else {
                uni.showToast({
                  title: resposne.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          }
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .bank-item-1 {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px 5px 10px;
    .list {
      width: 100%;
      height: 135px;
      border-radius: 5px;
      margin: 10px 0;
      position: relative;
      background: url("http://retail_v13.api.5ug.com//wwwroot/uploads/api/375-431-798/2019-12-12/5df2044830cab9373010c9cb.png")
        no-repeat;
      background-size: 100%;
      .bind-delete {
        position: absolute;
        top: 23px;
        right: 30px;
        height: 20px;
        line-height: 20px;
        padding: 0 8px;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 20px;
      }
      .test {
        position: absolute;
        top: 80px;
        left: 60px;
        color: #fff;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      }
    }
    .foot {
      position: fixed;
      bottom: 0;
      height: 60px;
      width: 100%;
      left: 0;
      background: #fff;
      padding: 0 10px;
      box-sizing: border-box;
      .buttom {
        margin-top: 10px;
        height: 40px;
        width: 100%;
        background: #c91230;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
</style>
