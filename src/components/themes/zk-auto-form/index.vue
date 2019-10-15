<template>
  <view>
    <view v-if="async" class="zk-auto-form">
      <div v-if="showAutoForm">
        <!-- <view class="zkAutoFormText" v-if="config.config.alertText">{{config.config.alertText}}</view> -->
        <view class="zkAutoFormText2" v-if="config.config.alertText">{{config.config.alertText}}</view>
        <view class="pushButton" v-if="returnButtom" @click="onBack">
          <x-icon name="zk-arrows-left_black" size="16" :color="'#999999'"></x-icon>
        </view>
        <view class="form-login" v-if="loginPage">
          <view class="form-login_box">
            <image class="form-login_img" src="https://diyservice.5ug.com/wwwroot/uploads/api/2019-03-20/5c924388397d411c8c07de3e.png" alt="" />
          </view>
        </view>
        <div class="box-top" v-if="config.config.title">{{config.config.title}}</div>
        <div v-for="(list,index) in config.list" :key="index">
          <form-item v-model="formModel[list.model]" :list="list" :model="list.model" :config="config" :formModel="formModel" :widget="widget" @inputModel="inputModel"></form-item>
          <div v-if="list.type==='tab'">
            <div v-for="(tabItem,tabItemIndex) in list.columns" :key="tabItemIndex">
              <div class="group-title">{{tabItem.name}}</div>
              <div class="box" v-for="(tabList,tabListIndex) in tabItem.list" :key="tabListIndex">
                <x-input v-model="formModel[tabList.model]" :label="tabList.name" :placeholder="tabList.helpblock" :disabled="tabList.options.disabled" :clearable="true"></x-input>
              </div>
            </div>
          </div>
        </div>
        <div class="reg-protocol" v-if="widget&&widget.apiUrl==='/Api/Member/Reg'">
          <checkbox-group @change="changeValue">
            <checkbox :checked="check" />
            <span>已阅读并同意以下协议</span>
            <span class="agreement" @click="agreement">《注册协议》</span>
          </checkbox-group>
          <div class="help-back">
            如没有推荐人，请联系客服
            <span @click="makePhoneCall()"> 400-680-9088 </span>为您分配。
          </div>
        </div>
        <view class="btn-box">
          <!-- <view class="btn-sumbit" @click="sumbit">{{config.config.bottonText}}</view> -->
          <view class="btn-sumbit " :class="{'buttombac':check==false}" :disabled="disboll" type="primary" @click="sumbit">{{config.config.bottonText}}</view>
        </view>
        <view v-if="config.config.buttomHelpText !== null && config.config.buttomHelpText !== undefined">
          <ul class="zkAutoFormUl">
            <li class="zkAutoFormList" v-for="(item, index) in config.config.buttomHelpText" :key="index"> {{index+1}}、{{item}}</li>
          </ul>
        </view>
        <view v-if="config.config.links">
          <view v-for="(item, index) in config.config.links" :key="index" class="box-bottom" @click="reDirecTion(item)">
            <p>{{item.name}}</p>
          </view>
        </view>
      </div>
    </view>
    <x-msg caption="您尚未开通自定义商城，请联系客服开通相关权限" v-if="showMsg" type="warn" :defaultMsgss="false" :adminMsg="true"></x-msg>
    <x-msg v-if="operationTips"></x-msg>
  </view>
</template>

<script>
  import formItem from './form-item.vue'
  import service from './service.js'
  export default {
    components: {
      formItem
    },
    props: {
      widget: {
      }
    },
    data () {
      return {
        async: false,
        showAutoForm: false,
        showWeChatLite: false,
        config: '',
        apiUrl: null,
        type: null, // 如果type不为空的时候，表单从服务器上动态获取
        key: null, // 服务器表单key
        formModel: {},
        loginPage: false,
        returnButtom: false,
        isTenant: false,
        showMsg: false,
        operationTips: false,
        check: true,
        disboll: false

      }
    },
    onLoad (option) {
      this.option = option
    },
    computed: {

    },
    created () {
      if (this.$user.isLogin() && this.widget && this.widget.apiUrl) {
        if (this.widget.apiUrl.indexOf('/user/login') !== -1) {
          uni.reLaunch({
            url: '/pages/tabbar/user_index'
          })
        }
        if (this.widget.apiUrl.indexOf('/user/reg') !== -1) {
          uni.reLaunch({
            url: '/pages/tabbar/user_index'
          })
        }
      }
    },
    mounted () {
      // console.log('this.$user.loginUser()', this.$user.loginUser())
      // console.log('this.$user.isTenant()', this.$user.isTenant())
      if (!this.$user.isLogin()) {
        this.init()
      } else {
        if (!this.$user.isTenant() && this.widget.route.path.indexOf('admin') !== -1) {
          this.showMsg = true
        } else {
          this.init()
        }
      }
    },
    methods: {
      agreement () {
        uni.navigateTo({
          url: '/pages/index?path=user_agreement'
        })
      },
      async init () {
        if (this.widget.route.path.indexOf('admin') !== -1) {
          this.isTenant = true
        }
        if (this.widget.apiUrl.indexOf('/api/user/findpassword') !== -1) {
          this.$api.localSet('success_reg_ jump_to_user_center', true)
        }
        service.init(this)
        this.showAutoForm = true
      },
      inputModel (val) {
        this.formModel[val.model] = val.val
      },
      async  sumbit () {
        if (this.check) {
          service.save(this).then(() => {
            if (this.widget.apiUrl.indexOf('/user/login') !== -1) {
              if (this.$user.isLogin()) {
                this.$bus.$emit('shopBurstList')
                if (this.$user.loginUser().gradeName !== '免费会员') {
                  this.$store.state.showPrice = true
                } else {
                  this.$store.state.showPrice = false
                }
              }
            }
          })
        }
      },
      onBack () {
        this.$api.back('login')
      },
      reDirecTion (conter) {
        uni.navigateTo({
          url: conter.link
        })
      },
      makePhoneCall () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      },
      changeValue () {
        this.check = !this.check
        if (this.check === true) {
          this.disboll = false
        } else {
          this.disboll = true
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>

