<template>
  <view class="zk-qnn-open">
    <view class="popup_buy-box" :style="'height:'+openHeight+'px;'">
      <view class="popup-tops">
        <view class="business-informations">
          <view class="information-left">
            <image class="information-left_image" :src="widgetModel.icon" alt="" />
          </view>
          <view class="information-right">
            <p class="right-title">{{widgetModel.name}}<span v-if="false">￥{{widgetModel.price}}</span></p>
            <p>账户：{{widgetModel.userName}}</p>
            <p>当前级别：{{widgetModel.currnetGradeName}}</p>
            <p>{{widgetModel.intro}}</p>
          </view>
        </view>
        <view class="account-box">
          <view class="port-number">
            <view class="port-number_text">
              <x-icon name="icon-zk-port" size="20" :color="'#c91230'"></x-icon>
            </view>
            <view class="port-number_text">端口名额</view>
            <view class="port-number_text port-title">共<span class="tag-number">{{widgetModel.totalCount}}个</span>已使用<span class="tag-number">{{widgetModel.totalUseCount}}个</span></view>
          </view>
          <view class="form-tables" v-if="widgetModel.openType=='2'||widgetModel.openType=='4'||widgetModel.openType=='5'">
            <view class="form-tables_list" v-if="widgetModel.openType=='5'">
              <view class="form-lable">推荐人:</view>
              <view class="form-right">
                <input class="form-right_input" v-model="buyUser.parent" placeholder="请输入推荐人手机号码" />
              </view>
            </view>
            <view class="form-tables_list">
              <view class="form-lable">手机号:</view>
              <view class="form-right">
                <input class="form-right_input" @blur="inputBlur(buyUser.mobile)" v-model="buyUser.mobile" placeholder="请输入手机号" />
              </view>
            </view>
            <view class="form-tables_list">
              <view class="form-lable">姓名:</view>
              <view class="form-right">
                <input class="form-right_input" v-model="buyUser.name" placeholder="请输入姓名" maxlength="20" />
              </view>
            </view>
            <view class="form-tables_list" v-if="!widgetModel.isRegion">
              <view class="form-lable">所属区域:</view>
              <div class="form-right" @click="showMulLinkageThreePicker">
                <view class="address-edit_area" :class="{placeholder_area: pickerValue === '请选择地区'}">{{pickerValue}}</view>
              </div>
            </view>
          </view>
          <view class="merchant-register" :class="register.result?'green':'red'">{{register.message}}</view>
          <view class="merchant-intro">
            <view class="merchant-intro_p">1.开通后需提供企业营照执照和法人身份证</view>
            <view class="merchant-intro_p">2.只能帮未激活的商家开通相关的资格</view>
          </view>
          <view class="merchant-intro">
            <view class="merchant-intro_p privileges-explain" v-for="(item,index) in widgetModel.privileges" :key="index">
              <view class="explain-icon">
                <x-icon :src="item.icon" size="16" :color="'#c91230'"></x-icon>
              </view>
              <view class="merchant-intro_p privileges-name">{{item.name}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="popup_buttom" @click="dredgeBut" :class="{'butdisabled':disabled==false}" v-if="widgetModel.buttonText!=null">{{widgetModel.buttonText}}</view>
    </view>
    <x-pay ref="open_pay"></x-pay>
    <x-city-picker :model="addressInput.regionId " :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
  </view>
</template>

<script>
 
  import { USERRIGHTS_BUY_POST, USERADDRESS_SINGLE_GET } from '@/service/all/apiUrl'
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        qnnOpen: false,
        buttonShow: true,
        openHeight: '',
        buyUser: {
          mobile: '',
          name: '',
          parent: ''
        },
        disabled: true,
        register: '',
        themeColor: '#007AFF',
        cityPickerValueDefault: [0, 0, 0],
        pickerValue: '请选择地区',
        isSumbit: true,
        isRegion: '',
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
    },
    methods: {
      async init () {
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请'
          })
          this.$user.toLogin()
        } else {
          this.openHeight = this.$api.getSystemInfoSync().windowHeight - 45
          var para = {
            gradeId: this.widget.route.gradeId,
            userId: this.$user.loginUser().id
          }
          var respon = await this.$api.httpGet('/Api/UserRights/OpenPage', para)
          this.widgetModel = respon.result
          // if (this.widgetModel.buttonText === '') {
          //   this.widgetModel.buttonText = ''
          // }
        }
        let parament = {
          // id: this.$user.loginUser().gradeId,
          userId: this.$user.loginUser().id
        }
        var singleAddress = await this.$api.httpGet(USERADDRESS_SINGLE_GET, parament)
        if (singleAddress.status === 1) {
          var singleMsg = singleAddress.result
          this.addressInput.name = singleMsg.name
          this.addressInput.mobile = singleMsg.mobile
          this.addressInput.address = singleMsg.address
          this.addressInput.isDefault = singleMsg.isDefault
          this.addressInput.regionId = singleMsg.regionId
        } else {
          this.addressInput.name = this.$user.loginUser().name
          this.addressInput.mobile = this.$user.loginUser().mobile
        }
        this.async = true
      },
      async onPopup () {
        this.qnnOpen = true
      },
      async dredgeBut () {
        var para = {
          userId: this.$user.loginUser().id,
          mobile: this.buyUser.mobile,
          name: this.buyUser.name,
          price: this.widgetModel.price,
          parent: this.buyUser.parent,
          openType: this.widgetModel.openType,
          gradeId: this.widgetModel.gradeId,
          regionId: this.addressInput.regionId
        }
        this.process(para)
      },
      async process (para) {
        this.disabled = false
        var response = await this.$api.httpPost(USERRIGHTS_BUY_POST, para)
        if (response.status === 1) {
          if (response.result.payId > 0) {
            this.$refs.open_pay.$emit('payMethod', response.result.payId, response.result.payAmount, response.result.orderIds, '/pages/index?path=successful_opening') // 唤起支付窗口
            this.disabled = true
            var that = this
            var para = {
              name: response.result.buyGrade.name,
              config: response.result.regUser
            }
            that.$api.localSet('openSuccss', para)
            if (that.widgetModel.openType === 2 || that.widgetModel.openType === 4 || that.widgetModel.openType === 4) {
              return false
            } else {
              var user = that.$api.this.$user.loginUser()
              user.gradeName = that.widgetModel.name
              user.gradeId = that.widgetModel.gradeId
              user.gradeIcon = that.widgetModel.icon
              that.$user.setUser(user)
            }
          } else {
            var that = this
            this.zKuserrights = false
            uni.showModal({
              title: '开通成功',
              showCancel: false,
              content: '恭喜您，您的订单已成功开通',
              success: function (res) {
                that.$api.to('/pages/index?path=successful_opening')
                var para = {
                  name: response.result.buyGrade.name,
                  config: response.result.regUser
                }
                that.$api.localSet('openSuccss', para)
                if (that.widgetModel.openType === 2 || that.widgetModel.openType === 4 || that.widgetModel.openType === 4) {
                  return false
                } else {
                  var user = that.$api.this.$user.loginUser()
                  user.gradeName = that.widgetModel.name
                  user.gradeId = that.widgetModel.gradeId
                  user.gradeIcon = that.widgetModel.icon
                  that.$user.setUser(user)
                }
              }
            })
          }
        } else {
          this.$api.toastWarn(response.message)
        }
        this.disabled = true
        this.popupSale = false
      },
      async inputBlur (data) {
        this.register = ''
        if (data.length !== 11) {
          return uni.showToast({
            icon: 'none',
            title: '手机号码不正确，请重新输入',
            duration: 2000
          })
        }
        var para = {
          mobile: data,
          userID: this.$user.loginUser().id
        }
        var resposne = await this.$api.httpPost('Api/User/CheckMobile', para)
        this.register = resposne
      },
      onCancel (e) {
      },
      onConfirm (e) {
        this.addressInput.regionId = e.cityCode
        this.pickerValue = e.label
      },
      showMulLinkageThreePicker () {
        this.$refs.mpvueCityPicker.show()
      }
    }
  }
</script>
