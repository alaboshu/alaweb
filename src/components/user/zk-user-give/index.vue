<template>
  <view class="zk-user-give">
    <view class="give-list_box">
      <ul class="give-ul">
        <li class="give-li">
          <view class="give-li_top">
            <view class="give-li_left">手机号</view>
            <view class="give-li_right"><input placeholder="请输入手机号" type="number" v-model="from.mobile" class="give-li_input" @blur="onInput" /></view>
          </view>
        </li>
        <li class="give-li">
          <view class="give-li_top">
            <view class="give-li_left">标准商家</view>
            <view class="give-li_right"><input placeholder="0" type="number" v-model="from.grade1" class="give-li_input" /></view>
          </view>
        </li>
        <li class="give-li">
          <view class="give-li_top">
            <view class="give-li_left">众享商家</view>
            <view class="give-li_right"><input placeholder="0" type="number" v-model="from.grade2" class="give-li_input" /></view>
          </view>
        </li>
        <li class="give-li">
          <view class="give-li_top">
            <view class="give-li_left">至尊商家</view>
            <view class="give-li_right"><input placeholder="0" type="number" v-model="from.grade3" class="give-li_input" /></view>
          </view>
        </li>
        <li class="give-li">
          <view class="give-li_top">
            <view class="give-li_left">准营销中心</view>
            <view class="give-li_right"><input placeholder="0" type="number" v-model="from.grade4" class="give-li_input" /></view>
          </view>
        </li>
        <li class="give-li">
          <view class="give-li_top border_none">
            <view class="give-li_left">营销中心</view>
            <view class="give-li_right"><input placeholder="0" type="number" v-model="from.grade5" class="give-li_input" /></view>
          </view>
        </li>
      </ul>
    </view>
    <view class="give-text" v-if="async">{{widgetModel}}</view>
    <view class="give-buttom" @click="freePort">赠送端口<view class="invisible" v-if="invisibleBool"></view>
    </view>
    <view class="give-buttom give-buttom_top" @click="$api.to('/pages/default',true)">返回首页</view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        from: {
          mobile: '',
          grade1: '',
          grade2: '',
          grade3: '',
          grade4: '',
          grade5: '',
          loginUserId: null
        },
        async: false,
        invisibleBool: false
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
        this.from = {
          mobile: '',
          grade1: '',
          grade2: '',
          grade3: '',
          grade4: '',
          grade5: '',
          loginUserId: this.$user.loginUser().id
        }
        this.loginUserId = this.$user.loginUser().id
      },
      async freePort () {
        this.invisibleBool = true
        if (this.from.grade1 === '') {
          this.from.grade1 = 0
        }
        if (this.from.grade2 === '') {
          this.from.grade2 = 0
        }
        if (this.from.grade3 === '') {
          this.from.grade3 = 0
        }
        if (this.from.grade4 === '') {
          this.from.grade4 = 0
        }
        if (this.from.grade5 === '') {
          this.from.grade5 = 0
        }
        var respone = await this.$api.httpPost('/Api/UserRights/AddPorts', this.from)
        if (respone.status !== 1) {
          this.$api.toastWarn(respone.message)
        } else {
          this.$api.toastSuccess(respone.message)
          var this_ = this
          setTimeout(function () {
            this_.init()
          }, 2000)
        }
        this.invisibleBool = false
      },
      async onInput () {
        if (this.from.mobile === '') {
          this.$api.toastWarn('手机号为空')
          return
        }
        var para = {
          mobile: this.from.mobile
        }
        var repones = await this.$api.httpGet('/Api/UserRights/GetUserIntro', para)
        if (repones.status !== 1) {
          this.$api.toastWarn(repones.message)
          this.async = false
          return
        }
        this.widgetModel = repones.result
        this.async = true
      }
    }
  }
</script>
