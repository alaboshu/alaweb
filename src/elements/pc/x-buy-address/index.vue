<template>
  <div class="pc-x-buy-address" element-path="pc/x-buy-address">
    <zk-dialog ref="ref_buyaddress" title="收货地址" width="70%">
      <div slot="body" class="content-body">收货地址</div>
      <el-button type="primary " slot="footer " @click="click ">保存</el-button>
    </zk-dialog>
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
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
      this.$nextTick(function () {
        this.$on('child', function (dialogCloseVisible) {
          // console.info('zk-test父组件点击')
          this.$refs.ref_buyaddress.$emit('child', this.dialogCloseVisible)
        })
      })
    },
    methods: {
      async init () {
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      },
      async click () {
        console.info('地址点击')
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .pc-x-buy-address {
  	font-size: @font-size-base;
  }
</style>
