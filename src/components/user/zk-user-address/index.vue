<template>
  <view class="zk-user-address" v-if="addressList">
    <view class="address-list">
      <view class="address-list_item" v-for="(item,index) in addressList" :key="index">
        <view class="list_item-hd">
          <view class="address-boxs">
            <view class="initial-icon">{{item.initial}}</view>
            <view class="list_item-hds">
              <view class="item-hd-top">
                <view class="item-hd-name">
                  {{item.name}}
                </view>
                <view class="item-hd-mobile">
                  {{item.mobile}}
                </view>
              </view>
              <view class="item-hd-bottom">
                <span class="default" v-if="isDefault[index]">默认</span>{{item.addressDescription}}&nbsp;&nbsp;{{item.address}}
              </view>
            </view>
            <view class="handle">
              <view class="editorial" @click="editAddress(item.id)">编辑</view>
            </view>
            <view class="handle" v-if="showDetail">
              <view class="editorial" @click="deleteAddress(item.id)">删除</view>
            </view>
          </view>
        </view>
        <view class="list_item-divider"></view>
      </view>
    </view>
    <view>
      <view class="address-btn_foot"></view>
      <view class="address-btn_boxs">
        <!-- b端显示添加地址 -->
        <view class="address-btn" @click="addAddress()" v-if="$api.config().isCustomerShop">
          添加地址
        </view>
        <view class="address-btn" @click="addAddress()" v-else-if="addressList.length === 0">
          添加地址就是你了
        </view>
      </view>
    </view>
    <mapL :address="addressList" v-if="false"></mapL>
  </view>
</template>

<script>
  import mapL from './map'
  import apiId from '@/service/config'
  export default {

    data () {
      return {
        widgetModel: '',
        option: {},
        addressList: '',
        radioT: false,
        isDefault: [],
        showDetail: false
      }
    },
    components: {
      mapL
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init (type) {
        let parameter = {
          LoginUserId: this.$user.loginUser().id
        }
        var response = await this.$api.httpGet('/api/useraddress/get', parameter)
        if (response.status === 1) {
          this.addressList = response.result
          if (this.addressList.length === 0) {
            this.$api.localRemove('default_address')
          }
          this.isDefault = []
          for (var i = 0; i < this.addressList.length; i++) {
            this.isDefault.push(this.addressList[i].isDefault)
            var iniTial = this.addressList[i].name.split('')
            this.addressList[i].initial = iniTial[0]
          }
          if (type === 'isDefault') {
            this.$api.toastSuccess('设置成功')
          }
        }
        if (apiId.themeId === '5cc1bfbe23eb301328298b41') {
          this.showDetail = true
        }
      },
      async defaultAddress (id, type) {
        if (type === true) {
          return false
        } else {
          let defaultParameter = {
            userId: this.$user.loginUser().id,
            id: id
          }
          var defaultMsg = await this.$api.httpPost('/api/useraddress/setdefault', defaultParameter)
          if (defaultMsg.status === 1) {
            this.init('isDefault')
          } else {
            this.$api.toastWarn('设置失败')
          }
        }
      },
      async deleteAddress (id) {
        let parameter = {
          loginUserId: this.$user.loginUser().id,
          id: id
        }
        var deleteMsg = await this.$api.httpDelete('/api/useraddress/delete', parameter)
        if (deleteMsg.status === 1) {
          setTimeout(() => {
            this.$api.toastSuccess('删除成功')
            this.init()
          }, 500)
        } else {
          this.$api.toastWarn('删除失败')
        }
      },
      editAddress (id) {
        this.$api.localSet('edit_address', true)
        this.$base.to('/user/address/edit?id=' + id)
      },
      addAddress () {
        this.$$base.to('/user/address/edit')
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

  .zk-user-address {
    font-size: $gl-size-base;
  }
  .address-list {
    .address-list_item {
      .address-boxs {
        display: flex;
        align-items: center;
        padding: 5px 10px 10px 0px;
      }
      .list_item-hd {
        flex: 1;
        margin-left: 10px;
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
        .item-hd-name {
          font-size: $gl-h5-size;
          color: $gl-black;
        }
        .item-hd-mobile {
          font-size: $gl-h7-size;
          color: $gl-text3;
          margin-left: 10px;
        }
      }
      .item-hd-bottom {
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
      .list_item-divider {
        background: #f7f7f7;
        height: 5px;
        line-height: 5px;
        display: block;
        padding: 0;
        margin: 0;
      }
    }
  }
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
</style>
