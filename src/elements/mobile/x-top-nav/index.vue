<template>
  <div class="mobile-x-top-nav" element-path="mobile/x-top-nav">
    <x-row>
      <x-col col="12">
        <img :src="viewModel.apiImagesUrl+'/'+viewModel.mobileLogo" alt="">
        <span>{{viewModel.webSiteName}}</span>
      </x-col>
      <x-col col="12">
        <a to="/user/index"> 会员中心</a>
      </x-col>
    </x-row>
  </div>
</template>

<script>
  export default {
    name: 'x-top-nav',
    props: {
      elementData: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info('系统数据', this.elementData)
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
</style>
