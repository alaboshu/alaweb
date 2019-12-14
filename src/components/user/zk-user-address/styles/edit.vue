<template>
  <view class="user-add-edit">
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
        <div class="address-content" @click="$refs.mpvueCityPicker.show()">
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
          <div class="switch-box_poist" :class="{'check_poist':addressInput.isDefault==true}" @click="addressInput.isDefault = !addressInput.isDefault">
            <span class="switch_circle"></span>
          </div>
        </div>
      </div>
    </view>
    <div></div>
    <x-city-picker :model="addressInput.regionId" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></x-city-picker>
    <view class="address-edit_btn">
      <div class="edit_btn" @click="sumbit()">确定</div>
    </view>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        themeColor: '#007AFF',
        pickerValue: '请选择地区',
        cityPickerValueDefault: [0, 0, 0], // 默认地址
        addressInput: {
          name: '',
          mobile: '',
          address: '',
          isDefault: false,
          userId: '',
          regionId: '',
          type: 1
        }
      }
    },
    methods: {
      async sumbit () {
        this.addressInput.userId = this.$user.loginUser().id
        if (this.pagesId !== undefined) { this.addressInput.id = this.pagesId }
        var response = await this.$api.httpPost('/Api/UserAddress/SaveOrderAddress', this.addressInput)
        if (response.status === 1) {
          this.$api.toastSuccess('添加成功')
          if (await this.$api.localGet('addressJump')) {
            setTimeout(() => {
              this.$api.to(this.$api.localGet('addressJump'))
              this.$api.localRemove('addressJump')
            }, 500)
          } else {
            this.$api.toastSuccess('添加成功')
            setTimeout(() => {
              this.$emit('change', 'list')
            }, 300)
          }
        } else {
          this.$api.toastWarn(response.message)
        }
      },
      onConfirm (e) {
        this.addressInput.regionId = e.cityCode
        this.pickerValue = e.label
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../css/edit.scss";
</style>
