<template>
  <div class="mobile-x-top-nav" element-path="mobile/x-top-nav">
    <!-- <x-row>
      <x-col :col=1>
        <img :src="viewModel.apiImagesUrl+'/'+viewModel.mobileLogo" alt="">
      </x-col>
      <x-col :col=12>

        <span>{{viewModel.webSiteName}}</span>
      </x-col>

      <x-col :col=12>
        <a to="/user/index"> 会员中心</a>
      </x-col>
    </x-row> -->
    <div class="x-top-nav_placeholder"></div>
    <div class="x-top-nav">
      <div class="top-nav-left">
        <div class="top-nav-logo">
          <img :src="viewModel.apiImagesUrl+'/'+viewModel.mobileLogo" alt="">
        </div>
        <p>{{viewModel.webSiteName}}</p>
      </div>
      <div class="top-nav-right">
        <div class="nav-right-search">
          <a href="">
            <x-icon src="zk-search" size="18"></x-icon>
            关注
          </a>
        </div>
        <div class="nav-right-record ">
          <a href="">
            我的记录
          </a>
        </div>
      </div>
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
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
          console.log('x-top-nav', this.viewModel)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .mobile-x-top-nav {
    .x-top-nav_placeholder {
      width: 100%;
      height: 35px;
    }
    .x-top-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 35px;
      background: #000;
      display: flex;
      .top-nav-left {
        width: 60%;
        height: 100%;
        padding-left: 3rem;
        position: relative;
        .top-nav-logo {
          position: absolute;
          top: 50%;
          left: 0.5rem;
          transform: translateY(-50%);
          width: 2rem;
          height: 2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          width: 100%;
          height: 100%;
          line-height: 35px;
          color: #adb5bd;
        }
      }
      .top-nav-right {
        width: 40%;
        height: 100%;
        display: flex;
        .nav-right-search,
        .nav-right-record {
          flex: 1;
          height: 100%;
          position: relative;
          a {
            display: block;
            height: 100%;
            text-align: center;
            line-height: 35px;
            color: #adb5bd;
            img {
              vertical-align: middle;
            }
          }
        }
        .nav-right-record:after {
          content: '';
          position: absolute;
          display: block;
          width: 0.5px;
          height: 1.5rem;
          background: #fff;
          top: 0.5rem;
          left: 0;
        }
      }
    }
  }
</style>
