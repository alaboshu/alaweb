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
      addAddress () {
        this.$api.localSet('addressJump', '/pages/index?path=order_buy')
        this.$api.to('/user/address/select')
        this.popupVisible1 = true
      },
      async init () {

      }
    }
  }
  </script>
 
