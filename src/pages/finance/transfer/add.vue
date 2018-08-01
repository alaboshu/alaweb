<template>
  <div class="pages-finance-transfer-add">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-group>
      <x-cell title="转账类型" is-link @click.native="transferTypePickerShow = true" :value="transfer .name"></x-cell>
      <!-- <x-picker :visible.sync="transferTypePickerShow" :columns="transferType" value-key="name" @confirm="confirmPerson" /> -->
      <x-input label="对方用户" placeholder="请输入对方用户" required/>
      <x-input label="转出金额" placeholder="请输入转出金额" type="number" required/>
      <x-input label="转出支付密码" placeholder="请输入支付密码" type="password" required/>
      <x-input label="备注" placeholder="请输入备注" required/>
    </x-group>
    <div class="transfer-add_btn">
      <button class="" type="button">提交</button>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '转账'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        transfer: [{ name: 'Apple', age: 1 }],
        transferTypePickerShow: false,
        transferType: [
          {
            values: [
              {
                name: 'Apple',
                price: 1.3
              },
              {
                name: 'Banana',
                price: 2.0
              },
              {
                name: 'Orange',
                price: 10
              },
              {
                name: 'Pear',
                price: 0.5
              }
            ]
          }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      },
      confirmPerson (picker) {
        this.transfer = picker.getValues()[0]
        console.log('this.transfer ', this.transfer)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-transfer-add {
    width: 100%;
    .transfer-add_btn {
      padding: 2rem 0.6rem;
      button {
        background: @brand;
        color: #fff;
        text-align: center;
        height: 3rem;
        width: 100%;
        line-height: 3rem;
        font-size: @h4-font-size;
        border-radius: 4 * @rem;
      }
    }
  }
</style>

