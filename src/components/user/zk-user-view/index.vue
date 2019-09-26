<template>
  <view class="mobile-x-user-view" element-path="mobile/x-user-view" v-if="async">
    <view class="userinfo_box" v-if="isShow">
      <view class="mobile_user">
        <view class="user-view_a" @click="infoClick('avator')">
          <view class="user_conter">
            <p class="weui_margin">头像</p>
          </view>
          <view class="user_img">
            <img class="tuclass" alt :src="imageUrl ">
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </view>
        <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">名字</p>
          </view>
          <view class="user_text">{{viewModel.name}}</view>
        </view>
        <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">用户名</p>
          </view>
          <view class="user_text">{{viewModel.userName}}</view>
        </view>
        <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">电话</p>
          </view>
          <view class="user_text">{{viewModel.mobile}}</view>
        </view>
        <view class="user-view_a" @click="infoClick('sex')">
          <view class="user_conter">
            <p class="weui_margin">性别</p>
          </view>
          <view class="user_text">{{viewModel.sex}}</view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </view>
        <view class="user-view_a" @click="infoClick('email')">
          <view class="user_conter">
            <p class="weui_margin">邮箱</p>
          </view>
          <view class="user_text">{{viewModel.email}}</view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </view>

        <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">等级</p>
          </view>
          <view class="user_text">{{viewModel.gradeName}}</view>
        </view>
        <!-- <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">所属区域</p>
          </view>
          <view class="user_text" v-if="viewModel.regionName">{{viewModel.regionName}}</view>
        </view> -->
        <view class="user-view_a">
          <view class="user_conter">
            <p class="weui_margin">推荐人</p>
          </view>
          <view class="user_text" v-if="viewModel.parentUserName">{{viewModel.parentUserName}}</view>
        </view>
      </view>
      <view class="interlayer_box"></view>
      <view class="mobile_user">
        <div class="user-view_a" @click="$api.to('/pages/index?path=user_qrcode')" v-if="showCode">
          <view class="user_conter">
            <p class="weui_margin">我的二维码</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div>
        <div class="user-view_a" @click="$api.to('/pages/index?path=user_address_index')">
          <view class="user_conter">
            <p class="weui_margin">收货地址</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div>
        <div class="user-view_a" @click="$api.to('/pages/index?path=about_us_index')">
          <view class="user_conter">
            <p class="weui_margin">关于企牛牛</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div>
        <!-- <div class="user-view_a" @click="$api.to('/pages/index?path=finance_account_index')">
          <view class="user_conter">
            <p class="weui_margin">我的钱包</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div> -->
        <!-- <div class="user-view_a" @click="evaluation" v-if="isIosApp">
          <view class="user_conter">
            <p class="weui_margin">给我评价</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div> -->
        <div class="user-view_a" @click="logOut" v-if="showLoginOur">
          <view class="user_conter">
            <p class="weui_margin">退出登录</p>
          </view>
          <view>
            <i class="zk-right icon iconfont"></i>
          </view>
        </div>
      </view>
    </view>
    <view class="update_box" v-if="!isShow">
      <view class="update_avator avator_top" v-if="infoStatus.avator" :class="{'avatar_app':isIosApp==true}">
        <!-- <view :style="'height:'+statusBarHeight+'px'"></view> -->
        <view class="avator_box">
          <view class="avator_info">
            <view @click="uploadpicture">
              <img v-if="imageUrl" alt :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </view>
          </view>
        </view>
        <view class="xbuttom" v-if="!isIosApp">
          <view class="xbuttom-return" @click="comeBack">
            <x-icon name="icon-zk-return" :size="15" color="#ffffff" v-if="isNotApp"></x-icon>
          </view>
          <view class="title_head">账户信息</view>
          <div class="xbuttom_update" @click="upadte('avator')">使用</div>
        </view>
        <view v-else>
          <view class="xbuttom_update-buttom">
            <div class="xbuttom_updates" @click="upadte('avator')">使用</div>
          </view>
        </view>
      </view>
      <view class="update_email avator_top" v-if="infoStatus.email" :class="{'avatar_app':isIosApp==true}">
        <!-- <view :style="'height:'+statusBarHeight+'px'"></view> -->
        <view class="email_box">
          <x-input label="新邮箱:" labelWidth="100" placeholder="请输入新邮箱" v-model="info.email"></x-input>
        </view>
        <view class="xbuttom" v-if="!isIosApp">
          <view class="xbuttom-return" @click="comeBack">
            <x-icon name="icon-zk-return" :size="15" color="#ffffff" v-if="isNotApp"></x-icon>
          </view>
          <view class="title_head">账户信息</view>
          <div class="xbuttom_update" @click="upadte('email')">保存</div>
        </view>
        <view v-else>
          <view class="xbuttom_update-buttom">
            <div class="xbuttom_updates" @click="upadte('email')">保存</div>
          </view>
        </view>
      </view>
      <div class="update_address avator_top" v-if="infoStatus.address">
        <!-- <view :style="'height:'+statusBarHeight+'px'"></view> -->
        <div class="address_box">
          <view class="user-view_a" @click="$refs.mpvueCityPicker.show()">
            <view class="user_conter">
              <p class="weui_margin">请选择</p>
            </view>
            <view class="user_text">{{addressValue}}</view>
            <view>
              <i class="zk-right icon iconfont"></i>
            </view>
          </view>
        </div>
        <view class="xbuttom">
          <view class="xbuttom-return" @click="comeBack">
            <x-icon name="icon-zk-return" :size="15" color="#ffffff" v-if="isNotApp"></x-icon>
          </view>
          <view class="title_head">账户信息</view>
          <div class="xbuttom_update" @click="upadte('address')">保存</div>
        </view>
        <x-city-picker :model="viewModel.address " :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
      </div>
      <div class="upadte_sex avator_top" v-if="infoStatus.sex" :class="{'avatar_app':isIosApp==true}">
        <!-- <view :style="'height:'+statusBarHeight+'px'"></view> -->
        <div class="sex_box">
          <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
              <view>
                <radio :value="item.value" :checked="index === current" color="#c81432" />
              </view>
              <view>{{item.name}}</view>
            </label>
          </radio-group>
        </div>
        <view class="xbuttom" v-if="!isIosApp">
          <view class="xbuttom-return" @click="comeBack">
            <x-icon name="icon-zk-return" :size="15" color="#ffffff" v-if="isNotApp"></x-icon>
          </view>
          <view class="title_head">账户信息</view>
          <div class="xbuttom_update" @click="upadte('sex')">保存</div>
        </view>
        <view v-else>
          <view class="xbuttom_update-buttom">
            <div class="xbuttom_updates" @click="upadte('sex')">保存</div>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script>
  import globalConfig from '@/service/config.js'

  import { setTimeout } from 'timers'
  // #ifdef APP-PLUS
  const storeKit = uni.requireNativePlugin('Xty-StoreKit')
  // #endif
  export default {

    data () {
      return {
        async: false,
        cityPickerValueDefault: [0, 0, 0],
        themeColor: '#007AFF',
        addressValue: '',
        sexValue: '',
        widgetModel: '',
        itemUrl: '',
        viewModel: '',
        isShow: true,
        imageUrl: '',
        infoStatus: {
          avator: false,
          email: false,
          address: false,
          sex: false
        },
        showLoginOur: true,
        info: {
          avator: '',
          email: ''
        },
        items: [{
          value: '1',
          name: '男'
        },
        {
          value: '2',
          name: '女'
        }
        ],
        current: 0,
        showCode: true,
        statusBarHeight: 0,
        isIosApp: false,
        isNotApp: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      radioChange (e) {
        this.sexValue = e.detail.value
      },
      async  init () {
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
          this.isNotApp = false
        }
        if (this.$api.client() === 'AppPlus' && this.$api.payType() === 3) {
          this.isIosApp = true
        }
        if (this.$user.id() >= 1) {
          this.itemUrl = globalConfig.apiBaseUrl
          // this.widgetModel = await this.$api.themeWidget(this.widget)
          var userInfo = await this.$api.httpGet('/api/user/info', { 'LoginUserId': this.$user.id() })
          if (userInfo.status === 1) {
            this.viewModel = userInfo.result
            this.imageUrl = this.viewModel.avator
            this.info.email = this.viewModel.email
            this.addressValue = this.viewModel.address
            if (this.$api.client() === 'WeChatLite') {
              this.showLoginOur = false
            }
            if (this.viewModel.sex === '男') {
              this.current = 0
              this.sexValue = 1
            } else if (this.viewModel.sex === '女') {
              this.current = 1
              this.sexValue = 2
            }
          } else if (userInfo.status === 3) {
            this.$user.loginOut(userInfo.message)
          }
          this.async = true
        }
        if (globalConfig.themeId === '5cc1bfbe23eb301328298b41') {
          this.showCode = false
        } else {
          this.showCode = true
        }
      },
      evaluation () {
        // #ifdef APP-PLUS
        storeKit.review()
        // #endif
      },
      async logOut () {
        this.$user.loginOut()
      },
      async uploadpicture () {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            // this.imageUrl = res.tempFilePaths[0]
            // this.info.avator = res.tempFilePaths[0]
            var imageSrc = res.tempFilePaths[0]
            uni.uploadFile({
              fileType: 'image',
              filePath: imageSrc,
              url: this.$api.baseUrl() + '/api/common/upload',
              name: 'data',
              success: (res) => {
                uni.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1000
                })
                this.imageUrl = imageSrc
                this.info.avator = JSON.parse(res.data).result.path
              }
            })
          }
        })
      },
      infoClick (identifying) {
        this.isShow = false
        if (identifying === 'avator') {
          this.infoStatus.avator = true
        }
        if (identifying === 'email') {
          this.infoStatus.email = true
        }
        if (identifying === 'address') {
          this.infoStatus.address = true
        }
        if (identifying === 'sex') {
          this.infoStatus.sex = true
        }
      },
      comeBack () {
        this.isShow = true
        this.infoStatus.avator = false
        this.infoStatus.email = false
        this.infoStatus.address = false
        this.infoStatus.sex = false
        this.imageUrl = this.viewModel.avator
        this.info.email = this.viewModel.email
      },
      async upadte (identifying) {
        var par = {
          userId: this.$user.loginUser().id,
          Avator: this.viewModel.avator,
          Email: this.viewModel.email,
          Sex: this.sexValue
        }
        if (identifying === 'avator') {
          par.Avator = this.info.avator
        }
        if (identifying === 'email') {
          par.Email = this.info.email
        }
        // if (identifying === 'address') {
        //   par.Address = this.viewModel.address
        // }
        if (identifying === 'sex') {
          par.Sex = this.sexValue
        }
        var response = await this.$api.httpPost('/Api/User/Update', par)
        if (response.status === 1) {
          this.$api.toastSuccess('修改成功')
          var tiem = setTimeout(() => {
            // 头像修改成功触发会员中心头像修改
            this.$bus.$emit('strikeView')
            // this.init()
            clearTimeout(tiem)
          }, 1000)
          this.isShow = true
          this.infoStatus.avator = false
          this.infoStatus.email = false
          this.infoStatus.sex = false
        } else {
          this.$api.toastWarn('修改失败')
        }
      },
      onCancel (e) {
      },
      onConfirm (e) {
        this.viewModel.address = e.cityCode
        this.addressValue = e.label
      },
      watchRoute () {
        this.async = false
        this.init()
        this.async = true
      }
    },
    watch: {
      '$route': 'watchRoute'
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  // @import "~_style_all/theme.scss";
  .mobile-x-user-view {
    .iconfont {
      position: static;
    }
    .update_email,
    .update_address,
    .upadte_sex {
      .email_box,
      .address_box,
      .sex_box {
        padding: 0 5px;
        .uni-list-cell-pd:nth-child(2)::after {
          left: 0px;
        }
      }
      .email_box {
        position: relative;
        padding: 5px 15px;
      }
      .email_box::after {
        position: absolute;
        z-index: 3;
        right: 0;
        bottom: 0;
        left: 0px;
        height: 1px;
        content: "";
        -webkit-transform: scaleY(0.5);
        -ms-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #e5e5e5;
      }
    }
  }
  .zk-user-view {
    font-size: $gl-size-base;
  }
  .mobile-x-user-view {
    font-size: $gl-size-base;
  }
  .mobile_user {
    padding-left: 15px;
    border-top: 1px solid $gl-border4;
    border-bottom: 1px solid $gl-border4;
  }
  .interlayer_box {
    height: 15px;
    background-color: $gl-border5;
  }
  .user-view_a {
    display: flex;
    align-items: center;
    padding: 12px 15px 12px 0px;
    border-bottom: 1px solid $gl-border4;
  }
  .user-view_a:last-of-type {
    border-bottom: none;
  }
  .user_text {
    color: $gl-text2;
  }
  .tuclass {
    width: 35px;
    height: 35px;
    border-radius: 100%;
  }
  .user_conter {
    flex: 1;
  }
  .iconfont {
    font-size: 12px;
    color: #c8c8cd;
    margin-left: 3px;
  }
  .update_box {
    width: 100vw;
    height: 100vh;
    background-color: $gl-light;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99999;
    .avator_top {
      margin-top: 46px;
      .xbuttom_update-buttom {
        width: 100vw;
        margin-top: 40px;
        .xbuttom_updates {
          width: 80%;
          margin: 0 auto;
          border: 1px solid #ff999a;
          background-color: #ff999a;
          color: $gl-light;
          text-align: center;
          font-size: 14px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .avatar_app {
      margin-top: 0px;
    }
    .update_avator {
      height: 300px;
      .avator_box {
        height: 300px;
        position: relative;
        .avator_info {
          border: 1px solid #e5e5e5;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 155px;
          height: 155px;
          border-radius: 178px;
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 155px;
    height: 155px;
    border-radius: 155px;
    display: block;
  }
  .weui_top {
    margin-top: 20px !important;
  }
  .weui_margin {
    margin: 0px;
    font-size: 14px;
    color: $gl-black;
  }
  .weui_span {
    font-size: 12px;
  }
  .email_btn {
    margin-top: 40px;
    display: flex;
  }
  .botton_color {
    flex: 1;
    background-color: $gl-themeColor;
    color: $gl-light;
    font-size: 18px;
    margin: 0px 10px;
  }
  .xbuttom {
    width: 100vw;
    height: 46px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99999;
    background-color: $gl-brand;
    .title_head {
      font-size: 14px;
      font-weight: bold;
      color: $gl-light;
      line-height: 46px;
    }
    .xbuttom-return {
      width: 30px;
      height: 30px;
      background-color: $gl-themeColor;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
    }
    .xbuttom_update {
      display: inline-block;
      width: 55px;
      height: 28px;
      text-align: center;
      line-height: 26px;
      font-weight: bold;
      color: $gl-light;
      font-size: 12px;
      border: 1px solid #ff999a;
      border-radius: 3px;
      background-color: #ff999a;
      position: absolute;
      top: 9px;
      right: 15px;
    }
  }
</style>
