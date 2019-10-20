<template>
  <view class="zk-user-center-a">
    <view class="zk-user-center">
      <view class="container_box">
        <view class="user_center_icon">
          <view class="user_setting">
            <view class="user_setting-icon" @click="securitySet">
              <x-icon name="icon-zk-renzheng" size="18" :color="'#fff'"></x-icon>
            </view>
            <view class="user_setting-icon" @click="skipSetting">
              <x-icon name="icon-zk-setting" size="18" :color="'#ffffff'"></x-icon>
            </view>
          </view>
        </view>
        <view class="user_logo">
          <view style="dispaly:flex" class="all_box">
            <view class="logo_left">
              <img :src="viewModel.avator" class="logo">
            </view>
            <view class="logo_middle">
              <span>{{viewModel.userName}}</span>
              <span v-if="isNotIosApp">{{viewModel.versionName}}</span>
              <span v-if="!isNotIosApp">{{loginUser.name}}</span>
            </view>
          </view>
          <!-- <view class="logo_right" v-if="viewModel.upgradeButton" @click="onGredge">
            {{viewModel.upgradeButton}}
          </view> -->
        </view>
        <view class="user_content">
          <view class="user_content_item" v-if="isNotIosApp">
            <span>我的余额</span>
            <span v-if="viewModel.storeRevenue">{{viewModel.storeRevenue}}</span>
            <span v-else> 0</span>
          </view>
          <view class="user_content_item">
            <span>今日订单</span>
            <span v-if="viewModel.todayOrderCount">{{viewModel.todayOrderCount}}</span>
            <span v-else> 0</span>
          </view>
          <view class="user_content_item" v-if="isNotIosApp">
            <span>会员数量</span>
            <span v-if="viewModel.fansCount">{{viewModel.fansCount}}</span>
            <span v-else> 0</span>
          </view>
          <view class="user_content_item" @click="$api.to('/pages/index?path=user_favorite_index')">
            <span>我的收藏</span>
            <span v-if="viewModel.favorite">{{viewModel.favorite}}</span>
            <span v-else> 0</span>
          </view>
        </view>
        <view class="user_bottom" @click="$api.to('/pages/index?path=user_qrcode')">
          点击分享个人二维码
        </view>
      </view>
      <view class="select_address" v-show="addressShow">
        <view class="address_title">请先选择地区(必选)</view>
        <div class="item">
          <div class="label">地区：</div>
          <div class="address-content" @click="showMulLinkageThreePicker">
            <view class="address-edit_area" :class="{placeholder_area: pickerValue === '请选择地区'}">{{pickerValue}}</view>
          </div>
        </div>
        <div class="selectAddress_tap">选择之后不可更改,请谨慎选择</div>
        <div class="select_confirm" @click="seltextAddress">确定</div>
      </view>
      <x-city-picker :model="addressInput.regionId " :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
      <div class="address_mask" v-show="addressShow"></div>
    </view>

  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import { USERADDRESS_SINGLE_GET } from '@/service/all/apiUrl'
  export default {

    data () {
      return {
        viewModel: '',
        widgetModel: {},
        userIf: '',
        themeColor: '#007AFF',
        cityPickerValueDefault: [0, 0, 0],
        pickerValue: '请选择地区',
        isSumbit: true,
        addressShow: false,
        isNotIosApp: true,
        loginUser: '',
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
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$bus.$off('pages_loginUser').$on('pages_loginUser', () => {
        this.init()
      })
    },
    methods: {
      async init () {
        // this.$refs.mpvueCityPicker.show()

        if (this.$user.isLogin()) {
          var para = {
            userId: this.$user.loginUser().id
          }
          var response = await this.$crud.widget(this, 'MemberWidget', para)
          this.viewModel = response
          var localMsg = this.$user.loginUser()
          localMsg.gradeName = this.viewModel.versionName
          localMsg.gradeId = this.viewModel.upgradeGradeId
          this.$user.setUser(localMsg)
          this.loginUser = this.$user.loginUser()
          if (this.$api.client() === 'AppPlus' && this.$api.payType() === 3) {
            this.isNotIosApp = false
          }
          // var isRegin = await this.$api.httpGet('api/userrights/IsRegion', para)
          // if (isRegin.status !== 1) {
          //   this.addressShow = true
          // }
        }
        let parament = {
          id: this.pagesId,
          LoginUserId: this.$user.loginUser().id
        }
        var singleAddress = await this.$api.httpGet(USERADDRESS_SINGLE_GET, parament)
        if (singleAddress.status === 1) {
          var singleMsg = singleAddress.result
          this.addressInput.name = singleMsg.name
          this.addressInput.mobile = singleMsg.mobile
          this.addressInput.address = singleMsg.address
          this.addressInput.isDefault = singleMsg.isDefault
          // this.addressInput.regionId = singleMsg.regionId
        } else {
          this.addressInput.name = this.$user.loginUser().name
          this.addressInput.mobile = this.$user.loginUser().mobile
        }
        this.async = true
      },
      skipSetting () {
        this.$api.to('/pages/index?path=user_info')
      },
      onGredge () {
        this.$api.to('/pages/index?path=user_open&gradeId=' + this.viewModel.upgradeGradeId)
      },
      securitySet () {
        this.$api.to('/pages/index?path=user_password_index')
      },
      onCancel (e) {
      },
      onConfirm (e) {
        this.addressInput.regionId = e.cityCode
        this.pickerValue = e.label
      },
      showMulLinkageThreePicker () {
        this.$refs.mpvueCityPicker.show()
      },
      async seltextAddress () {
        var para = {
          userId: this.$user.loginUser().id,
          regionid: this.addressInput.regionId
        }
        var resAddrss = await this.$api.httpGet('api/userrights/UserRightsAddRegion', para)
        if (resAddrss.status === 1) {
          this.addressShow = false
          this.$api.toastSuccess('区域选择成功')
        } else {
          this.$api.toastWarn(resAddrss.message)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
