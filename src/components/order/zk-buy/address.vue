<template>
  <view v-if="async">
    <div v-if="orderAddress" class="address-message" @click="$api.to('user/address?type=select')">
      <div class="address_icon">
        <x-icon name="icon-zk-address" :size="20" :color="'#606266'"></x-icon>
      </div>
      <div class="address_info">
        <div class="info_hd">
          <div class="info_hd-name">
            {{ orderAddress.name }}
          </div>
          <div class="info_hd-mobile">
            {{ orderAddress.mobile }}
          </div>
        </div>
        <div class="info_ft">
          {{ orderAddress.address }}
        </div>
      </div>
      <div class="address_select">
        <x-icon name="icon-zk-right" color="#dddddd"></x-icon>
      </div>
    </div>
    <div class="address-add" v-if="!orderAddress" @click="addAddress()">
      请先添加地址
      <div class="address_select">
        <x-icon name="icon-zk-right" color="#dddddd"></x-icon>
      </div>
    </div>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        orderAddress: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var defaultAddress = this.$api.localGet('default_address')
        if (!defaultAddress) {
          var response = await this.$api.httpGet('/Api/UserAddress/Single')
          if (response.status === 1) {
            defaultAddress = response.result
          }
        }
        if (!defaultAddress) {
          uni.showModal({
            title: '提示',
            content: '请先添加地址',
            showCancel: true,
            confirmText: '确定',
            success: (res) => {
              if (res.confirm) {
                this.addAddress()
              }
            }
          })
        } else {
          this.orderAddress = defaultAddress
          this.setDefaultAddress(defaultAddress)
        }
        this.async = true
        console.info('orderAddress', this.orderAddress)
      },
      addAddress () {
        this.$api.localSet('addressJump', '/pages/index?path=order_buy')
        this.$api.toastWarn('请先添加地址')
        this.$api.to('/user/address')
      },
      setDefaultAddress (defaultAddress) {
        if (defaultAddress) {
          this.$api.localSet('default_address', defaultAddress)
        }
      }
    }
  }
  </script>
 
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  .address-message {
    padding: 10px 40px;
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    .address_icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 40px;
      text-align: center;
    }
    .address_select {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 40px;
      text-align: center;
    }
    .address_info {
      flex: 1;
      .info_hd {
        display: flex;
        .info_hd-name {
          font-size: $gl-h5-size;
        }
        .info_hd-mobile {
          font-size: $gl-h5-size;
          flex: 1;
          text-align: right;
        }
      }
      .info_ft {
        font-size: $gl-h6-size;
        color: #575962;
        word-break: break-all;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .address-add {
    padding: 8px 15px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    .address_select {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 40px;
      text-align: center;
    }
  }
</style>
