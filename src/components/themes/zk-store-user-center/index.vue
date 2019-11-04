<template>
  <view class="zk-store-user-center">
    <view class="product-user_top" v-if="false">
      <view class="user_top-left">
        <view class="left-icon">
        </view>
      </view>
    </view>
    <view class="user-active-seting">
      <view class="user-seting" @click="$api.to('/pages/index?path=user_password_index')">
        <view @click="$api.to('/pages/index?path=user_password_index')">
          <x-icon name="icon-zk-renzheng" class="setIng" color="#ffffff" :size="18"></x-icon>
        </view>
      </view>
      <view class="user-seting" @click="$api.to('/pages/user/user_info')">
        <view @click="$api.to('/pages/user/user_info')">
          <x-icon name="icon-zk-setting" color="#ffffff" :size="18"></x-icon>
        </view>
      </view>
    </view>
    <view class="user-active">
      <view class="user-active_portrait">
        <image class="portrait-image" :src="viewModel.avator" alt="" />
      </view>
      <view class="user-active_text">
        <view class="user-active_username">{{viewModel.userName}}</view>
        <!-- <view class="user-active_merchant" v-if="isNotIosApp">{{viewModel.versionName}}</view> -->
        <view class="user-active_merchant" v-if="isNotIosApp">昵称：{{loginUser.name}}</view>
        <!-- <view class="text_tag">
          <view class="user_active_tag">Lv1</view>
          <view class="user_active_tag">积分999</view>
        </view> -->
      </view>
    </view>
    <view class="user-ul">
      <view class="user-li">
        <p class="p2" v-if="viewModel.todayOrderCount">{{moneyTypeAmount}}</p>
        <p class="p2" v-else>0</p>
        <p class="p1">购物券</p>
      </view>
      <view class="user-li">
        <!--  <p class="p2" v-if="viewModel.storeRevenue">{{viewModel.storeRevenue}}</p>
        <p class="p2" v-else>0</p>
        <p class="p1">账户余额</p> -->
      </view>

      <!-- <view class="user-li" @click="$api.to('/pages/index?path=user_favorite_index')">
        <p class="p1">商家消费</p>
        <p class="p2" v-if="viewModel.favorite">{{viewModel.favorite}}</p>
        <p class="p2" v-else>0</p>
      </view> -->
    </view>
    <view class="user-dimensional-code">
      <view class="user_name">牛宝宝最高尊享优惠</view>
      <!-- <view class="updata_btn">立即升级</view> -->
    </view>
  </view>
</template>

<script>
  import { USERADDRESS_SINGLE_GET } from '@/service/all/apiUrl'

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        viewModel: '',
        isNotIosApp: true,
        loginUser: '',
        addressInput: {},
        moneyTypeAmount: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$bus.$off('strikeView').$on('strikeView', () => {
        this.init()
      })
      this.$bus.$off('pages_loginUser').$on('pages_loginUser', () => {
        this.init()
      })
    },
    methods: {
      async init () {
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
        }
        let parament = {
          id: this.pagesId,
          userId: this.$user.loginUser().id
        }
        var singleAddress = await this.$api.httpGet(USERADDRESS_SINGLE_GET, parament)

        if (singleAddress.status === 1) {
          var singleMsg = singleAddress.result
          this.addressInput.name = singleMsg.name
          this.addressInput.mobile = singleMsg.mobile
          this.addressInput.address = singleMsg.address
          this.addressInput.isDefault = singleMsg.isDefault
        } else {
          this.addressInput.name = this.$user.loginUser().name
          this.addressInput.mobile = this.$user.loginUser().mobile
        }
        var res = await this.$api.httpGet('Api/Account/DetailEdit', { id: this.$user.id() })
        if (res.status === 1) {
          for (var i = 0; i < res.result.accountList.length; i++) {
            if (res.result.accountList[i].moneyTypeId === 'e97ccd1e-1478-49bd-bfc7-e73a5d699009') {
              this.moneyTypeAmount = res.result.accountList[i].amount
            }
          }
        }
      }

    }
  }
</script>
