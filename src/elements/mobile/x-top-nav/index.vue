<template>
  <div class="mobile-x-top-nav" element-path="mobile/x-top-nav">
    <div class="zkui-yqp-top-placeholder  "></div>
    <div class="top-left">
      <div class="logo">
        <img :src="Ilogo" alt="">
      </div>
      <p>{{Ititle}}</p>
    </div>
    <div class="top-right">
      <ul class="right-box flex">
        <li>
          <router-link to="/product/search">
            <x-icon name="zk-topsearch" size="1px"></x-icon>
            关注
          </router-link>
        </li>
        <li class="right-box-record ">
          <a-link to="/user/index">
            会员中心
          </a-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-top-nav',
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
    },
    methods: {
      async init () {
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zkui-yqp-top-placeholder {
    height: 2.5px;
  }
  .zkui-yqp-top {
    width: 100%;
    height: 2.5px;
    background: #000000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .top-left {
      width: 60%;
      height: 100%;
      padding-left: 12px;
      position: relative;
      .logo {
        position: absolute;
        top: 50%;
        left: 0.5px;
        transform: translateY(-50%);
        width: 2px;
        height: 2px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        width: 100%;
        height: 100%;
        line-height: 2.5px;
        // color: @gray-500;
      }
    }
    .top-right {
      width: 40%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          height: 100%;
          flex: 1;
          a {
            height: 100%;
            display: block;
            text-align: center;
            line-height: 2.5px;
            // color: @gray-500;
            svg {
              margin-right: 10px;
            }
          }
        }
        li.right-box-record {
          position: relative;
        }
        li.right-box-record::after {
          content: '';
          position: absolute;
          display: block;
          width: 0.5px;
          height: 1.5px;
          background: @white;
          top: 0.5px;
          left: 0;
        }
      }
    }
  }
</style>
