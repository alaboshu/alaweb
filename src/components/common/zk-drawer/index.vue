<template>
  <view class="zk-drawer uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}">
    <view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
    <view class="uni-drawer-content">
      <slot></slot>
      <scroll-view class="scoly" scroll-y>
        <view class="zk-drawer-top">
          <img :src="avator">
          <p>
            <x-icon src="zk-huiyuan" color="orange" :size="12"></x-icon>
            <span style="margin-left:10px">{{gradeName}}</span>
          </p>
        </view>
        <ul class="zk-drawer-content">
          <li v-for="(item,index) in list" :key="index">
            <img :src="item.image" :alt="item.title">
            <x-a :path="item.src">{{item.title}}</x-a>
          </li>
        </ul>
      </scroll-view>
      <view class="zk-drawer-bottom">
        <view v-for="(item,tIndex) in bottomList" :key="tIndex" class="bottom-content">
          <view class="bootom-icon">
            <x-a :path="item.src">
              <img :src="item.image">
            </x-a>
          </view>
          <x-a :path="item.src">{{item.title}}</x-a>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        avator: '',
        gradeName: '',
        rightMode: false,
        catchtouchmove: false,
        list: [
          {
            'title': '商家权益',
            'image': '../../../static/img/indeImg/shops.png',
            'src': '/pages/user?path=markets_userrights'
          },
          {
            'title': '我的商家',
            'image': '../../../static/img/indeImg/MineShop.png',
            'src': '/pages/user?path=user_grade'
          },
          {
            'title': '我的收益',
            'image': '../../../static/img/indeImg/MyMoney.png',
            'src': '/pages/user?path=share_earn'
          },
          // {
          //   'title': '充值',
          //   'image': '../../../static/img/indeImg/MyMoney.png'
          //   // 'src': '/pages/user?path=finance_recharge_add'
          // },
          {
            'title': '成功案例',
            'image': '../../../static/img/indeImg/success.png',
            'src': '/pages/index?path=markets_cases'
          },
          {
            'title': '团队介绍',
            'image': '../../../static/img/indeImg/teams (3).png',
            'src': '/pages/index?path=markets_team'
          },
          {
            'title': '关于我们',
            'image': '../../../static/img/indeImg/our (2).png',
            'src': '/pages/index?path=articles_about_index'
          }
        ],
        bottomList: [
          {
            'title': '反馈',
            'src': '/pages/feedback',
            'image': '../../../static/img/indeImg/chong.png'
          },
          {
            'title': '帮助',
            // 'src': '/pages/index?path=articles_help_index',
            'image': '../../../static/img/indeImg/help.png'
          },
          {
            'title': '退出',
            'src': '/pages/user?path=user_logout',
            'image': '../../../static/img/indeImg/back.png'
          }
        ]
      }
    },
    props: {
      widget: {},
      visible: {
        type: Boolean,
        default: false
      },
      mode: String,
      mask: {
        type: [Boolean, String],
        default: true
      }
    },
    computed: {
      showMask () {
        return String(this.mask) === 'true'
      }
    },
    created () {
      this.rightMode = this.mode === 'right'
      this.catchtouchmove = true
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var userInfo = this.$user.loginUser()
        if (userInfo !== undefined && userInfo !== null) {
          this.avator = userInfo.avator
          this.gradeName = userInfo.gradeName
        }
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./style.scss";
</style>
