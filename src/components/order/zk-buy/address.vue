<template>
  <view>
    <div v-if="!orderAddress" class="address-message" @click="$api.to('/pages/index?path=user_address_select')">
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
          var response = this.$api.httpGet('/Api/UserAddress/Single')
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
                //   this.addAddress()
              }
            }
          })
          this.addAddress()
        } else {
          this.setDefaultAddress()
        }
      },
      addAddress () {
        this.$api.localSet('addressJump', '/pages/index?path=order_buy')
        this.$api.toastWarn('请先添加地址')
        this.$api.to('/user/address/select')
      },
      setDefaultAddress (defaultAddress) {
        if (defaultAddress) {
          this.$api.localSet('default_address', defaultAddress)
        }
      },
      async getDefaultAddress (jsThis) {
        // var _this = this
        if (await jsThis.$api.localGet('default_address') === undefined) {
          let parameter = {
            userId: jsThis.$user.loginUser().id
          }
          var Single = await jsThis.$api.httpGet('/Api/UserAddress/Single', parameter)
          if (Single.status === 1) {
            jsThis.$api.localSet('default_address', Single.result)
            jsThis.addressMsg = Single.result
            jsThis.addressId = Single.result.id
            jsThis.addressType = true
          } else {
            jsThis.addressType = false
          }
        } else {
          jsThis.addressType = true
          jsThis.addressMsg = await jsThis.$api.localGet('default_address')
          jsThis.addressId = await jsThis.$api.localGet('default_address').id
        }
      }
    }
  }
  </script>
 
