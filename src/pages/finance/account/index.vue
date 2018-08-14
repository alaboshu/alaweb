<template>
  <div class="pages-finance-account-index">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-group>
      <x-cell title="我的资产"></x-cell>
      <div class="my-property_box">
        <ul>
          <li class="property_item">
            <span>0.00</span>
            <p>活积分</p>
          </li>
          <li class="property_item">
            <span>0.00</span>
            <p>活积分</p>
          </li>
          <li class="property_item">
            <span>0.00</span>
            <p>活积分</p>
          </li>
          <li class="property_item">
            <span>0.00</span>
            <p>活积分</p>
          </li>
        </ul>
      </div>
    </x-group>
    <x-group>
      <x-cell title="服务"></x-cell>
      <x-grid :elementData="viewModel" v-if="asyncFlag"></x-grid>
    </x-group>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET, THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '钱包'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        const para = {
          dataId: this.dataId,
          defaultId: '5b406cddfef00000a0000001'
        }
        this.viewModel = await this.$api.get(THEME_GETVALUE_GET, para)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-account-index {
    width: 100%;
    .my-property_box {
      ul {
        display: flex;
        .property_item {
          flex: 1;
          padding: 0.5rem 0;
          text-align: center;
          border-right: 1px solid #e5e5e5;
          span {
            color: @theme-color;
          }
          p {
            text-align: center;
            font-size: @h5-font-size;
          }
        }
      }
    }
  }
</style>

