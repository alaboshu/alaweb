<template>
  <div class="pages-finance-withdraw-add">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-group>
      <x-cell title="银行卡" is-link @click.native="bankTypePickerShow = true" :value="bank.name"></x-cell>
      <x-picker :visible.sync="bankTypePickerShow" :columns="bankType" value-key="name" @confirm="confirmPerson" />
      <x-cell title="提现账户" is-link @click.native="withdrawTypePickerShow = true" :value="withdrawAccount.name"></x-cell>
      <x-picker :visible.sync="withdrawTypePickerShow" :columns="withdrawType" value-key="name" @confirm="confirmPersonA" />
      <x-input label="提现金额" placeholder="请输入提现金额" type="number" required/>
      <x-input label="支付密码" placeholder="请输入支付密码" type="number" required/>
      <x-input label="提现留言" placeholder="" type="number" required/>
    </x-group>
    <div class="withdraw-add_btn">
      <button class="" type="button">提交</button>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '提现申请'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        bank: [{ name: 'Apple', age: 1 }],
        withdrawAccount: [{ name: 'Apple', age: 1 }],
        bankTypePickerShow: false,
        withdrawTypePickerShow: false,
        bankType: [
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
        ],
        withdrawType: [
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
        this.bank = picker.getValues()[0]
        console.log('this.bank', this.bank)
      },
      confirmPersonA (picker) {
        this.withdrawAccount = picker.getValues()[0]
        console.log('this.bank', this.withdrawAccount)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-withdraw-add {
    width: 100%;
    .withdraw-add_btn {
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

