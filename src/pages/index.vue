<template>
  <div class="container">

    <zk-swiper></zk-swiper>
    
    <!-- <x-header title="志伟">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-back" @click="$router.push('/baidu.com')">
          123
        </i>
      </div>
    </x-header> -->
    <!-- <zk-grid></zk-grid>
    <zk-swiper></zk-swiper>
    <zk-image></zk-image>
    <zk-product-item></zk-product-item>
    <zk-footer></zk-footer> -->
    <!-- <zk-input></zk-input>
    <zk-label></zk-label> -->
    <!-- <div @click=" showSuccess ()">
      <x-number v-model="num"></x-number>
    </div> -->
    <!-- <zk-product-class></zk-product-class> -->
    <!-- <x-verifiy-phone v-model="data" :mobile="mobile"></x-verifiy-phone> -->
    <zk-groupbuy></zk-groupbuy>
    <x-group title="qaaz">
      <x-cell title="qwe" value="123"></x-cell>
    </x-group>
    <x-input title="最大长度10" :maxlength=10></x-input>
  </div>
</template>

<script>
  // import Toast from ''
  // import Toast from '@/elements/common/x-toast/toast'
  export default {
    config: {
      'navigationBarBackgroundColor': '#ffffff',
      'navigationBarTextStyle': 'black',
      'navigationBarTitleText': '微信接口功能演示',
      'backgroundColor': '#eeeeee',
      'backgroundTextStyle': true
    },
    data () {
      return {
        clientType: '',
        num: 2,
        mobile: '13763166594',
        data: '555555'
      }
    },
    mounted () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        // var data = await api.get('api/user/info?id=1')
        // console.info('data', data)
      },
      showSuccess () {
        // Toast.success('操作成功')
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    height: 100%;
  }
</style>
