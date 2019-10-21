<template>
  <div>
    <zk-head title="会员注册" :showHead="true"></zk-head>
    <zk-auto-form :widget="widget"></zk-auto-form>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        widget: {
          key: 'UserLevelRegForm'
        }
      }
    },
    mounted () {
      this.$api.share('阿拉博数', 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png', '盛吉信高丽参精美铁盒装100g', 'https://m.qiniuniu99.com/pages/index?path=product_show&id=8916')
      this.init()
    },
    methods: {
      goDefault () {
        uni.switchTab({
          url: '/pages/default'
        })
      },
      goUrl () {
        this.$api.to('/pages/index?path=product_show&id=8916')
      },
      callPhone () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      },
      init () {
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
