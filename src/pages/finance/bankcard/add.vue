<template>
  <div class="pages-finance-bankcard-add">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-group>
      <x-input label="持卡人姓名" placeholder="请输入持卡人姓名" v-model="myBankcard.name" required/>
      <x-cell title="选择银行" is-link @click.native="fruitPickerShow = true" :value="fruit.name"></x-cell>
      <!-- <x-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="name" @confirm="confirmPerson" /> -->
      <x-input label="银行卡号" placeholder="请输入银行卡号" type="number" :maxlength="19" v-model="myBankcard.number" required/>
      <x-textarea placeholder="请输入详细地址" :maxLength="20"></x-textarea>
    </x-group>
    <div class="sumbit-btn">
      <a href="">
        提交
      </a>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '操作银行卡'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        fruitPickerShow: false,
        fruit: [{ name: 'Apple', age: 1 }],
        myBankcard: {
          name: '',
          number: '',
          bank: [],
          address: ''
        },
        fruitColumns: [
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
        this.fruit = picker.getValues()[0]
        console.log('this.fruit', this.fruit)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-bankcard-add {
    width: 100%;
    .sumbit-btn {
      padding: 2rem 2rem;
      a {
        display: block;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        color: @light;
        font-size: @h4-font-size;
        text-align: center;
        background: @brand;
      }
    }
  }
</style>

