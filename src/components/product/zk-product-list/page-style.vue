<template>
  <view>
    <common-item :viewModel="viewModel" :widget="widget"></common-item>
  </view>
</template>

<script>
  import commonItem from './common-style'
  export default {
    props: {
      widget: {},
      viewModel: {}
    },
    components: {
      commonItem
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // 监听触底事件
        this.$bus.$off('pagesTouch').$on('pagesTouch', (res) => {
          this.pagesReachBottom()
        })
      },
      pagesReachBottom () {
        console.info('已经触底了')
      }
    }
  }
</script>
