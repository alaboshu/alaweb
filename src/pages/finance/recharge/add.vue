<template>
  <div class="pages-finance-recharge-add">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <!-- <zk-grid></zk-grid> -->
    <div class="mode-payment">
      <ul>
        <li :class="{'active':isonLine}" @click="isonLine=true">线上支付</li>
        <li :class="{'active':!isonLine}" @click="isonLine=false">线下支付</li>
      </ul>
    </div>
    <x-group v-if="isonLine">
      <x-cell title="账户类型" is-link @click.native="bankTypePickerShow = true" :value="bank.name"></x-cell>
      <x-picker :visible.sync="bankTypePickerShow" :columns="bankType" value-key="name" @confirm="confirmPerson" />
      <x-input label="充值金额" placeholder="请输入充值金额" type="number" required/>
      <x-input label="备注" placeholder="" required/>
      <div class="recharge-add_btn">
        <button class="" type="button">提交</button>
      </div>
    </x-group>
    <x-group v-if="!isonLine">
      <x-cell title="账户类型" is-link @click.native="bankTypePickerShow = true" :value="bank.name"></x-cell>
      <x-picker :visible.sync="bankTypePickerShow" :columns="bankType" value-key="name" @confirm="confirmPerson" />
      <x-input label="充值金额" placeholder="请输入充值金额" type="number" required/>
      <x-cell title="银行类型" is-link @click.native="bankTypePickerShow = true" :value="bank.name"></x-cell>
      <x-picker :visible.sync="bankTypePickerShow" :columns="bankType" value-key="name" @confirm="confirmPerson" />
      <x-input label="银行卡号" placeholder="请输入银行卡号" type="number" :maxlength="19" required/>
      <x-input label="持卡人姓名" placeholder="请输入持卡人姓名" required/>
      <x-input label="备注" placeholder="" required/>
      <div class="recharge-add_btn">
        <button class="" type="button">提交</button>
      </div>
    </x-group>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '充值'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        isonLine: true,
        bank: [{ name: 'Apple', age: 1 }],
        bankTypePickerShow: false,
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-recharge-add {
    width: 100%;
    .mode-payment {
      ul {
        display: flex;
        li {
          flex: 1;
          height: 3rem;
          text-align: center;
          line-height: 3rem;
          font-weight: bold;
        }
        li.active {
          border-bottom: 2px solid @brand;
        }
      }
    }
    .recharge-add_btn {
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

