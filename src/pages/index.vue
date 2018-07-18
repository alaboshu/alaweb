<template>
  <div class="containera">
    <span>{{ tempComponent}}</span>
    <a href="/pages/user/standard">标准页面</a>
    <!-- <x-group></x-group>
    <div @click="ceshi()">被测试的志伟</div> -->
    <!-- <button @click="openTop()">top</button>
    <button @click="openCenter()">center</button>
    <button @click="openBottom()">bottom</button>
    <button @click="openLoading()">loading</button> -->
    <!-- <zk-swiper></zk-swiper> -->

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
    <zk-foot></zk-foot> -->
    <!-- <zk-input></zk-input>
    <zk-label></zk-label> -->
    <!-- <div @click=" showSuccess ()">
      <x-number v-model="num"></x-number>
    </div> -->
    <!-- <zk-product-class></zk-product-class> -->
    <!-- <x-verifiy-phone v-model="data" :mobile="mobile"></x-verifiy-phone> -->
    <!-- <zk-groupbuy></zk-groupbuy>
    <x-group title="qaaz">
      <x-cell title="qwe" value="123"></x-cell>
    </x-group>
    <x-input title="最大长度10" :maxlength=10></x-input> -->
  </div>
</template>

<script>
  // import Toast from ''
  // import Toast from '@/elements/common/x-toast/toast'
  import { Toast } from 'mint-ui'
  export default {
    config: {
      'navigationBarBackgroundColor': '#ffffff',
      'navigationBarTextStyle': 'black',
      'navigationBarTitleText': '首页',
      'backgroundColor': '#eeeeee',
      'backgroundTextStyle': true
    },
    data () {
      return {
        clientType: '',
        tempComponent: '',
        num: 2,
        mobile: '13763166594',
        data: '555555'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      ceshi () {
        Toast({
          message: '操作成功',
          iconClass: 'icon icon-success',
          duration: 5000
        })
        // this.messageSuccess('志伟')
      },
      async  init () {
        // this.tempComponent = window.top.localStorage.getItem('tempComponent')
        // console.info('缓存', this.tempComponent)
      },
      openTop () {
        this.$toast.top('top')
      },
      openCenter () {
        this.$toast.center('center')
      },
      openBottom () {
        this.$toast.bottom('bottom')
      },
      openLoading () {
        this.$loading('loading...')
        let self = this
        setTimeout(function () {
          self.closeLoading()
        }, 2000)
      },
      closeLoading () {
        this.$loading.close()
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    height: 100%;
  }
</style>
