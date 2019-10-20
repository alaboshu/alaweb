<template>
  <view class="zk-buy-address" v-if="async">
    <view class="zk-user-address">
      <view class="address-list">
        <view class="address-list_item" v-for="(item,index) in addressList" :key="index">
          <view class="address-box">
            <view class="initial-icon">{{item.initial}}</view>
            <view class="list_item-hds" @click="selectAddress(item.id)">
              <view class="item-hd-top">
                <view class="item-hd-name">
                  {{item.name}}
                </view>
                <view class="item-hd-mobiles">
                  {{item.mobile}}
                </view>
              </view>
              <view class="item-hd-bottoms">
                <span class="default" v-if="isDefault[index]">默认</span>{{item.addressDescription}}&nbsp;&nbsp;{{item.address}}
              </view>
            </view>
            <view class="handle">
              <view class="editorial" @click="editAddress(item)">编辑</view>
              <view class="editorial" v-if="showDetail" @click="deleteAddress(item.id)">删除</view>
            </view>
          </view>
          <view class="list_item-dividers"></view>
        </view>
      </view>
    </view>
    <view>
      <view class="address-btn_foot"></view>
      <view class="address-btn_boxs">
        <view class="address-btn" v-if="isAddressList" @click="addAddress()">
          添加地址
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { USERADDRESS_GET_GET, USERADDRESS_QUERYBYID_GET, USERADDRESS_DELETE_GET } from '@/service/all/apiUrl'

  export default {

    data () {
      return {
        widgetModel: '',
        addressList: '',
        isDefault: [],
        isAddressList: true,
        async: false,
        showDetail: false
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        let parameter = {
          userId: this.$user.loginUser().id
        }
        // var sing = await this.$api.httpGet(USERADDRESS_SINGLE_GET , parameter)
        var response = await this.$api.httpGet(USERADDRESS_GET_GET, parameter)
        if (response.status === 1) {
          this.addressList = response.result
          this.isAddressList = false
          if (this.addressList.length === 0) {
            this.isAddressList = true
            this.$api.localRemove('default_address')
          }
          for (var i = 0; i < this.addressList.length; i++) {
            this.isDefault.push(this.addressList[i].isDefault)
            var iniTial = this.addressList[i].name.split('')
            this.addressList[i].initial = iniTial[0]
          }
          this.async = true
        }
      },
      async deleteAddress (id) {
        let parameter = {
          userId: this.$user.loginUser().id,
          id: id
        }
        var deleteMsg = await this.$api.httpGet(USERADDRESS_DELETE_GET, parameter)
        if (deleteMsg.status === 1) {
          this.$api.toastSuccess('删除成功')
          this.$api.localRemove('default_address')
          this.init()
        } else {
          this.$api.toastWarn('删除失败')
        }
      },
      editAddress (item) {
        this.$api.localSet('addressJump', '/pages/index?path=user_address_select')
        this.$api.to('/pages/index?path=user_address_edit&id=' + item.id)
      },
      addAddress () {
        this.$api.localSet('addressJump', '/pages/index?path=user_address_select')
        this.$api.to('/pages/index?path=user_address_edit')
      },
      async selectAddress (id) {
        let parameter = {
          id: id,
          userId: this.$user.id()
        }
        var single = await this.$api.httpGet(USERADDRESS_QUERYBYID_GET, parameter)
        if (single.status === 1) {
          this.$api.localSet('default_address', single.result)
          this.$api.to('/pages/index?path=order_buy')
        } else {
          this.$api.toastWarn(single.message)
        }
      },
      watchRoute () {
        this.init()
      }
    },
    watch: {
      '$route': 'watchRoute'
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-buy-address {
    font-size: $gl-size-base;
    .address-btn_boxs {
      position: fixed;
      bottom: 40px;
      left: 0;
      width: 100%;
      padding: 10px 0;
      background-color: #ffffff;
      .address-btn {
        height: 40px;
        width: 90% !important;
        background: $gl-brand;
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 1rem;
        margin: 0 auto;
      }
    }
    .address-btn_foot {
      height: 65px;
    }
  }
  .address-list {
    .address-list_item {
      .address-box {
        display: flex;
        align-items: center;
        padding: 5px 10px 10px 10px;
      }
      .initial-icon {
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 25px;
        background: rgba(0, 0, 0, 0.3);
        color: $gl-light;
        font-size: $gl-h6-size;
      }
      .list_item-hds {
        flex: 1;
        margin-left: 10px;
      }
      .handle {
        display: flex;
        align-items: center;
        .editorial {
          color: $gl-text3;
          height: 20px;
          line-height: 20px;
          padding: 0px 5px;
        }
        .editorial:hover {
          color: $gl-themeColor;
        }
      }
      .item-hd-top {
        display: flex;
        align-items: baseline;
        height: 24px;
        .item-hd-name {
          font-size: $gl-h5-size;
          color: $gl-black;
        }
        .item-hd-mobiles {
          font-size: $gl-h7-size;
          color: $gl-text3;
          margin-left: 10px;
        }
      }
      .item-hd-bottoms {
        line-height: 15px;
        font-size: $gl-h6-size;
        color: $gl-black;
        .default {
          display: inline-block;
          font-size: 10px;
          padding: 0px 5px;
          background-color: #dcd3cf;
          color: #f74c31;
        }
      }
      .list_item-ft {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        .item-ft_raido {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: $gl-h6-size;
        }
        .item-ft_operation {
          display: flex;
          .operation_item {
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: $gl-metal;
            font-size: $gl-h6-size;
            .operation_icon {
              margin-right: 3px;
            }
          }
        }
      }
      .list_item-dividers {
        background: #f7f7f7;
        height: 5px;
        line-height: 5px;
        display: block;
        padding: 0;
        margin: 0;
      }
    }
  }
  .address-btn_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    .address-btn {
      height: 40px;
      width: 90% !important;
      background: $gl-brand;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 1rem;
      margin: 0 auto;
    }
  }
</style>
