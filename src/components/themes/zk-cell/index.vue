<template>
  <view v-if="async">
    <view v-if="isGroupLink">
      <view class="zk-cell_box" v-for="(group,groupIndex) in widget.value" :key="groupIndex">
        <x-cell :elementData="group"></x-cell>
      </view>
    </view>
    <view v-else>
      <view v-for="(group,groupIndex) in widget.value" :key="groupIndex">
        <x-cell :elementData="group"></x-cell>
      </view>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        isLogin: false,
        widgetModel: '',
        async: false,
        isGroupLink: false, // 分组链接
        tuchulist: [
          { name: '退出登陆', image: 'zk-orderlist' }
        ]
      }
    },
    props: {
      widget: {}
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
                  this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widget.apiUrl === '/api/theme/getlinkgroup') {
          this.isGroupLink = true
        }
        this.async = true
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  @import "./style.scss";
</style>
