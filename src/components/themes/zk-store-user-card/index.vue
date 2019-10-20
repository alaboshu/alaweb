<template>
  <view class="zk-store-user-card">
    <view class="store-user-card-container">
      <view class="card_item" @click="$api.to('/pages/index?path=finance_account_index')">
        <span v-if="viewModel.storeRevenue">{{viewModel.storeRevenue}}</span>
        <span v-else>0</span>
        <span>账户余额</span>
      </view>
      <view class="card_item">
        <span>10</span>
        <span>积分</span>
      </view>
      <view class="card_item">
        <span>2</span>
        <span>购物券</span>
      </view>
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
        addressInput: {}
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
      }

    }
  }
</script>
