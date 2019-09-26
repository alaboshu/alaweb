<template>
  <view class="zk-qiniuniu-btn-a" v-if="widget">
    <view class="zk-qiniuniu-btn">
      <view class="container_box" @click="onBusiness">
        开通
      </view>
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
        gradeId: null
      }
    },
    props: {
      widget: {},
      index: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var loginUser = this.$user.loginUser()
        if (this.$user.isLogin()) {
          this.gradeId = loginUser.gradeId
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      onBusiness () {
        this.$api.to('/pages/index?path=user_open&gradeId=' + this.widget.gradeId)
      }
    },
    watch: {
      widget (val) {
        this.widgetModel = val
      }
    }
  }
</script>
