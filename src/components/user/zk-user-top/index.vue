<template>
  <view class="zk-product-user">
    <view class="product-user_top" v-if="false">
      <view class="user_top-left">
        <view class="left-icon">
          <!-- <x-icon name="icon-zk-white" :color="'#ffffff'" size="18"></x-icon> -->
        </view>
      </view>
    </view>
    <view class="user-active">
      <view class="user-active_portrait">
        <image class="portrait-image" :src="viewModel.avator" alt="" />
      </view>
      <view class="user-active_text">
        <view class="user-active_username">{{viewModel.userName}}</view>
        <view class="user-active_merchant">{{loginUser.name}} {{loginUser.gradeName}}</view>
      </view>
      <view class="user-active-seting">
        <view class="user-seting">
          <view @click="$api.to('/user/set')">
            <x-icon name="icon-zk-renzheng" class="setIng" color="#ffffff" :size="18"></x-icon>
          </view>
        </view>
        <view class="user-seting" @click="$api.to('/pages/index?path=user_info')">
          <view @click="$api.to('/pages/index?path=user_info')">
            <x-icon name="icon-zk-setting" color="#ffffff" :size="18"></x-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="user-ul">
      <view class="user-li" @click="$api.to('/account/index')">
        <p class="p1">我的余额</p>
        <p class="p2" v-if="viewModel.storeRevenue">{{viewModel.storeRevenue}}</p>
        <p class="p2" v-else>0</p>
      </view>
      <view class="user-li" @click="$api.to('/order/list?orderStatus=1')">
        <p class="p1">今日订单</p>
        <p class="p2" v-if="viewModel.todayOrderCount">{{viewModel.todayOrderCount}}</p>
        <p class="p2" v-else>0</p>
      </view>
      <view class="user-li" v-if="false" @click="$api.to('/pages/index?path=user_rec_index')">
        <p class="p1">会员数量</p>
        <p class="p2" v-if="viewModel.fansCount">{{viewModel.fansCount}}</p>
        <p class="p2" v-else>0</p>
      </view>
      <view class="user-li" @click="$api.to('/collect/list')">
        <p class="p1">我的收藏</p>
        <p class="p2" v-if="viewModel.favorite">{{viewModel.favorite}}</p>
        <p class="p2" v-else>0</p>
      </view>
    </view>
    <view class="user-dimensional-code" v-if="false" @click="$api.to('/pages/index?path=user_qrcode')">
      <!-- <view class="dimensional-code_text">点击分享个人二维码</view> -->
      <!-- <image class="dimensional-code_image" :src="widget.value.image" alt="" /> -->
    </view>
  </view>
</template>

<script>
  import './var.scss'
  export default {

    data () {
      return {
        widgetModel: {},
        viewModel: '',
        loginUser: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.$user.isLogin()) {
          var para = {
            userId: this.$user.loginUser().id
          }
          var response = await this.$crud.widget(this, 'MemberWidget', para)
          this.viewModel = response
          this.loginUser = this.$user.loginUser()
        }
      }
    }
  }
</script>
