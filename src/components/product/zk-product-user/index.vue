<template>
  <view class="zk-product-user">
    <view class="product-user_top" v-if="false">
      <view class="user_top-left">
        <view class="left-icon">
        </view>
      </view>
    </view>
    <view class="user-active">
      <view class="user-active_portrait">
        <image class="portrait-image" :src="$api.baseUrl()+viewModel.avator" alt="" v-if="viewModel" />
      </view>
      <view class="user-active_text">
        <view class="user-active_username" v-if="viewModel">{{viewModel.userName}}</view>
        <view class="user-active_username_info" v-if="viewModel">等级：{{viewModel.gradeName}} <span v-if="viewModel.levelName" style="padding-left:15px"> 消费级别：{{viewModel.levelName}}</span></view>
      </view>
      <view class="user-active-seting">
        <view class="user-seting">
          <view @click="$api.to('/pages/safe/set')">
            <x-icon name="icon-zk-renzheng" class="setIng" color="#ffffff" :size="18"></x-icon>
          </view>
        </view>
        <view class="user-seting" @click="$api.to('/pages/user/user_info')">
          <view @click="$api.to('/pages/user/user_info')">
            <x-icon name="icon-zk-setting" color="#ffffff" :size="18"></x-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="user-ul">
      <view class="user-li">
        <p class="p1">现金资产</p>
        <p class="p2" v-if="viewModel">{{viewModel.cnyAmount}}</p>

      </view>

      <view class="user-li">
        <p class="p1">累积消费</p>
        <p class="p2" v-if="viewModel && viewModel.totalPrice">{{viewModel.totalPrice}}</p>
        <p class="p2" v-else>0</p>
      </view>
      <view class="user-li">
        <p class="p1">我的客户</p>
        <p class="p2" v-if="viewModel">{{viewModel.levelNumber}}</p>

      </view>
      <view class="user-li">
        <p class="p1">团队数量</p>
        <p class="p2" v-if="viewModel">{{viewModel.teamNumber}}</p>

      </view>
    </view>
    <view class="user-dimensional-code" @click="$api.to('/pages/user/user_qrcode')">
      <image class="dimensional-code_image" :src="widget.value.image" alt="" />
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'

  export default {

    data () {
      return {
        widgetModel: {},
        viewModel: null,
        isNotIosApp: true,
        loginUser: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.$bus.$off('pages_loginUser').$on('strikeView', () => {
        this.init()
      })
      this.$bus.$off('pages_loginUser').$on('pages_loginUser', () => {
        this.init()
      })
    },
    methods: {
      async init () {
        if (this.$user.isLogin()) {
          var response = await this.$api.httpGet('/Api/UserLevelRecord/Info')
          if (response.status === 1) {
            this.viewModel = response.result
          } else {
            this.$api.toastWarn(response.message)
          }
        }
      }
    }
  }
</script>
