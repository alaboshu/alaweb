<template>
  <!-- <view class="zk-user-index">{{widgetModel}}</view> -->
  <view class="zk-user-index" :style="'height:'+ksheight+'px;'">
    <view class="user_box">
      <view class="head_rigth">
        <x-a class="navi_margin" path="/pages/user?path=user_password_index">
          <i class="icon iconfont zk-setting head_icon"></i>
        </x-a>
      </view>
      <view class="user_head">
        <view class="head_portrait">
          <view class="portx">
            <x-a path="/pages/user?path=user_info">
              <img class="portrait_image" :src="vimodel.avator">
            </x-a>
          </view>
          <view class="setup">
            <view class="setup_p">{{vimodel.userName}}</view>
            <view class="qinzh">
              <view class="gtox">
                <x-icon :src="vimodel.gradeIcon" :size="18"></x-icon>
              </view>
              <view class="gra_text text_gra">{{vimodel.gradeName}}</view>
              <x-icon src="zk-right" :size="12" :color="'#fff'"></x-icon>
            </view>
          </view>
        </view>
      </view>
      <view class="list_a">
        <navigator class="nav">
          <p class="shuzi nav_p">66</p>
          <p class="nav_p">累计收益</p>
        </navigator>
        <navigator class="nav">
          <p class="shuzi nav_p">66</p>
          <p class="nav_p">即将到账</p>
        </navigator>
        <navigator class="nav">
          <p class="shuzi nav_p">100.08</p>
          <p class="nav_p">我的余额</p>
        </navigator>
      </view>
      <view class="advertising">
        <!-- <navigator> -->
        <!-- <img class="adv_imgae" src="../../../static/img/login2.png" alt> -->
        <!-- </navigator> -->
      </view>
    </view>
    <view class="conter_list">
      <view class="ordl" v-for="(item,index) in listzu" :key="index">
        <view class="ordl_text">
          <view class="textwez">{{item.text}}</view>
          <!-- <navigator class="to_view">查看全部订单
            <i class="icon iconfont zk-right rijian"></i>
          </navigator>-->
        </view>
        <view class="orld_a">
          <x-a class="navinnder" v-for="(items,indexs) in item.lsit" :key="indexs" @click="onsucess(items.url,items.panduan)">
            <p>
              <x-icon :src="items.icon" :size="28" :color="'#909399'"></x-icon>
            </p>
            <p class="or_p">{{items.name}}</p>
          </x-a>
          <!-- <x-a  class="navinnder" v-for="(items,indexs) in item.lsit" :key="indexs" v-if="items.name=='退出登录'" @click="loginOut">
            <p>
              <x-icon src="zk-orderlist" :size="26" :color="'#909399'"></x-icon>
            </p>
            <p class="or_p">退出登录</p>
          </x-a >-->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import { USER_VIEW_GET } from '@/service/all/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        ksheight: '',
        vimodel: '',
        vigridget: '',
        listzu: [
          {
            text: '用户中心',
            lsit: [
              { icon: '../../../static/img/zk-certificationhui.png', name: '商家认证', url: '/pages/user?path=user_identity_index' },
              { icon: '../../../static/img/zk-merchants.png', name: '服务商家', url: '' },
              { icon: '../../../static/img/zk-purse.png', name: '收益', url: '/pages/user?path=share_index' },
              { icon: '../../../static/img/zk-trophy.png', name: '龙虎榜', url: '' }
            ]
          },
          {
            text: '服务中心',
            lsit: [
              { icon: '../../../static/img/zk-mall.png', name: '商城', url: '/pages/index?path=product_list' },
              { icon: '../../../static/img/zk-Smartobject.png', name: '商学院', url: '' },
              { icon: '../../../static/img/zk-topromote.png', name: '推广素材', url: '' },
              { icon: '../../../static/img/zk-certification.png', name: '一键吸粉', url: '/pages/user?path=order_index', panduan: true },
              { icon: '../../../static/img/zk-Smartobject2.png', name: '二维码', url: '/pages/user?path=user_qrcode' },
              { icon: '../../../static/img/zk-toolfill.png', name: '工具中心', url: '', panduan: true },
              { icon: '../../../static/img/zk-Smartobject4.png', name: '连锁管理', url: '', panduan: true },
              { icon: '../../../static/img/zk-news.png', name: '头条', url: '/pages/index?path=articles_topline_index' },
              { icon: '../../../static/img/zk-thephone.png', name: '帮助中心', url: '' },
              { icon: '../../../static/img/zk-thelock.png', name: '安全', url: '/pages/user?path=user_password_safe' },
              { icon: '../../../static/img/zk-orderfinished.png', name: '成功案列', url: '/pages/index?path=articles_show' },
              { icon: '../../../static/img/zk-team.png', name: '团队介绍', url: '' }
            ]
          }
        ]
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
          this.widgetModel = await this.$api.themeWidget(this.widget)
        // 用户信息
        var usermodel = await this.$api.httpGet(USER_VIEW_GET)
        this.vimodel = usermodel.result
        var than_ = this
        uni.getSystemInfo({
          success: function (res) {
            than_.ksheight = res.windowHeight + 50
          }
        })
      },
      loginOut () {
        this.$api.localRemove(this.$user.userKey())
        this.$api.toastSuccess('退出登录成功')
        window.location = '/pages/user/login'
      },
      onsucess (url, panduan) {
        if (panduan === undefined) {
          window.location.href = url
        } else {
          this.$api.toast('正在开发中')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-user-index {
    background-color: $gl-light-grey;
    overflow: auto;
    .user_box {
      width: 100vw;
      height: 208px;
      background-color: $gl-brand;
      position: relative;
    }
    .head_portrait {
      display: flex;
      padding: 0px 25px;
    }
    .portrait_image {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    .setup {
      color: $gl-light;
      height: 45px;
      margin-left: 10px;
    }
    .setup_p {
      font-size: 15px;
    }
    .qinzh {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50px;
      padding: 0px 5px;
      font-size: 12px;
      display: flex;
      align-items: center;
      min-width: 60px;
    }
    .level {
      font-size: 15px;
    }
    .head_icon {
      font-size: 17px;
      color: $gl-light;
    }
    .head_rigth {
      padding-right: 15px;
      overflow: hidden;
    }
    .navi_margin {
      float: right;
      margin-left: 10px;
    }
    .list_a {
      display: flex;
      align-items: center;
      margin: 15px 0px;
    }
    .shuzi {
      font-size: 16px;
    }
    .nav {
      flex: 1;
      text-align: center;
      color: $gl-light;
    }
    .nav_p {
      line-height: 23px;
    }
    .conter_list {
      padding: 0px 10px;
      padding-bottom: 15px;
    }
    .ordl {
      border-radius: 8px;
      margin-top: 15px;
      background-color: $gl-light;
    }
    .ordl_text {
      display: flex;
      align-items: center;
      padding: 5px 15px;
      border-bottom: 1px solid $gl-border1;
    }
    .textwez {
      font-size: 12px;
      color: $gl-black;
      flex: 1;
    }
    .to_view {
      font-size: 12px;
      color: $gl-text3;
    }
    .orld_a {
      width: 100%;
      padding: 10px 0px;
    }
    .rijian {
      font-size: 12px;
      color: $gl-text3;
    }
    .navinnder {
      display: inline-block;
      text-align: center;
      width: 25%;
      padding: 10px 0px;
    }
    .or_p {
      color: $gl-text3;
    }
    .advertising {
      width: 100%;
      // margin-top: -10px;
      position: absolute;
      bottom: -22px;
    }
    .advertising_box {
      background-color: #5f5a6c;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .spell_list {
      font-size: 14px;
      color: #ffe2c0;
    }
    .adv_imgae {
      width: 100%;
      height: 70px;
    }
    .gtox {
      padding-top: 4px;
    }
    .text_gra {
      flex: 1;
    }
  }
</style>
