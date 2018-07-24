<template>
  <div class="pages-finance-bankcard-list">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <!-- <zk-grid></zk-grid> -->
    <div class="bankcard-list-box">
      <ul class="bankcard-list">
        <li class="list_item">
          <div class="item-hd">
            <div class="item-hd_name">yangyu</div>
            <div class="item-hd_card">111111111111111</div>
          </div>
          <div class="item-ft">
            <div class="item-ft_bank">
              中国银行
            </div>
            <div class="item-ft_btn">
              <a href="/baidu.com" class="btn_delete">
                <x-icon src="zk-remove" size="18"></x-icon>删除
              </a>
              <a href="/baidu.com" class="btn_edit">
                <x-icon src="zk-editor" size="18"></x-icon>编辑
              </a>
            </div>
          </div>
          <x-divider></x-divider>
        </li>
        <li class="list_item">
          <div class="item-hd">
            <div class="item-hd_name">yangyu</div>
            <div class="item-hd_card">111111111111111</div>
          </div>
          <div class="item-ft">
            <div class="item-ft_bank">
              中国银行
            </div>
            <div class="item-ft_btn">
              <a href="/baidu.com" class="btn_delete">
                <x-icon src="zk-remove" size="18"></x-icon>删除
              </a>
              <a href="/baidu.com" class="btn_edit">
                <x-icon src="zk-editor" size="18"></x-icon>编辑
              </a>
            </div>
          </div>
          <x-divider></x-divider>
        </li>
      </ul>
    </div>
    <div class="bankcard-add">
      <a href="" class="add-btn">
        添加银行卡
      </a>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '我的银行卡'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-bankcard-list {
    width: 100%;
    .bankcard-list-box {
      .bankcard-list {
        .list_item {
          .item-hd,
          .item-ft {
            padding: 0.2rem 1.25rem 0.2rem 1.25rem;
            border: 1px solid #e5e5e5;
            display: flex;
            .item-hd_card,
            .item-ft_btn {
              flex: 1;
              text-align: right;
            }
          }
          .item-ft {
            .item-ft_btn {
              display: flex;
              flex-direction: row-reverse;
              a {
                margin-left: 10px;
                color: #586c94;
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
    .bankcard-add {
      position: fixed;
      left: 0;
      bottom: 46px;
      width: 100%;
      .add-btn {
        display: block;
        width: 100%;
        height: 35px;
        background: @brand;
        line-height: 35px;
        text-align: center;
        color: @light;
      }
    }
  }
</style>

