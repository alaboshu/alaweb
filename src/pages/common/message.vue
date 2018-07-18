<template>
  <section class="zkui-message">
    <zk-head title='操作反馈'></zk-head>
    <div class="page msg_success js_show">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i :class="iconClass"></i>
        </div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">{{title}}</h2>
          <p class="weui-msg__desc">{{message}} </p>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <a href="javascript:history.back();" class="weui-btn weui-btn_warn" v-if="type==='success'">后退</a>
            <a href="/default" class="weui-btn weui-btn_default">返回首页</a>
          </p>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        message: '',
        type: 'success',
        iconClass: 'weui-icon-success weui-icon_msg'
      }
    },
    mounted () {
      this.setData()
    },
    methods: {
      setData () {
        this.message = this.$route.params.message
        this.type = this.$route.params.type
        if (this.type === 'warn') {
          this.iconClass = 'weui-icon-warn weui-icon_msg'
          this.title = '操作失败'
        }
      }
    }
  }
</script>
