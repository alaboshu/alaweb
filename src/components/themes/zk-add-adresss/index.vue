<template>
  <view class="zk-add-adresss" v-if="async">
    <view class="input_boxs">
      <div class="item">
        <div class="label">姓名：</div>
        <div class="address-content">
          <input class="phopes " placeholder="请输入姓名" v-model="addressInput.name">
        </div>
      </div>
      <div class="item">
        <div class="label">电话：</div>
        <div class="address-content">
          <input class="phopes vercate" placeholder="请输入电话" v-model="addressInput.mobile">
        </div>
      </div>
      <div class="item">
        <div class="label">地区：</div>
        <div class="address-content" @click="showMulLinkageThreePicker">
          <view class="address-edit_area" :class="{placeholder_area: pickerValue === '请选择地区'}">{{pickerValue}}</view>
          <x-icon name="icon-zk-right" size="12" color="#C8C8CD"></x-icon>
        </div>
      </div>
      <div class="item">
        <div class="label">详细地址：</div>
        <div class="address-content">
          <input class="phopes vercate" placeholder="请输入详细地址" v-model="addressInput.address">
        </div>
      </div>
      <div class="item">
        <div class="label">是否默认：</div>
        <div class="address-content switch-box">
          <div class="switch-box_poist" :class="{'check_poist':addressInput.isDefault==true}" @click="onSwitch">
            <span class="switch_circle"></span>
          </div>
        </div>
      </div>
    </view>
    <div></div>
    <x-city-picker :model="addressInput.regionId " :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
    <view class="address-edit_btn">
      <div class="edit_btn" @click="sumbit()">确定</div>
    </view>
  </view>
</template>

<script>
 
  import { setTimeout } from 'timers'
  export default {
    
    data () {
      return {
        async: true,
        option: '',
        widgetModel: '',
        themeColor: '#007AFF',
        cityPickerValueDefault: [0, 0, 0],
        pickerValue: '请选择地区',
        isSumbit: true,
        addressInput: {
          name: '',
          mobile: '',
          address: '',
          isDefault: false,
          userId: '',
          regionId: '',
          type: 1
        },
        pagesId: null
      }
    },
    props: {
      widget: {}
    },
    onLoad (option) {
      this.option = option
    },
    mounted () {
      // this.init()
    },
    methods: {
      async  init () {
      },
      showMulLinkageThreePicker () {
        this.$refs.mpvueCityPicker.show()
      },
      onCancel (e) {
      },
      onConfirm (e) {
        this.addressInput.regionId = e.cityCode
        this.pickerValue = e.label
      },
      switch1Change: function (e) {
        this.addressInput.isDefault = e.target.value
      },
      onSwitch () {
        this.addressInput.isDefault = !this.addressInput.isDefault
      },
      async sumbit () {
        if (this.isSumbit) {
          var that = this
          this.addressInput.userId = this.$user.loginUser().id
          if (this.pagesId !== undefined) {
            this.addressInput.id = this.pagesId
          }
          var response = await this.$api.httpPost('/Api/UserAddress/SaveOrderAddress', this.addressInput)
          if (response.status === 1) {
            that.$api.toastSuccess('添加成功')
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              })
            }, 500)
          } else {
            this.$api.toastWarn(response.message)
          }
          /*    if (response.status === 1 && this.pagesId !== undefined) {
               that.$api.toastSuccess('添加成功')
               setTimeout(() => {
                 uni.navigateBack({
                   delta: 1
                 })
               }, 500)
             } else if (response.status === 1) {
               this.$api.toastSuccess('添加成功')
               if (await this.$api.localGet('addressJump')) {
                 setTimeout(() => {
                   that.$api.to(this.$api.localGet('addressJump'))
                   that.$api.localRemove('addressJump')
                 }, 500)
               } else {
                 this.$api.toastSuccess('添加成功')
                 setTimeout(() => {
                   that.$api.to('/pages/index?path=user_address_index')
                 }, 500)
               }
             } else {
               this.$api.toastWarn(response.message)
             } */
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>
