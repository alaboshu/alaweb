<template>
  <div class="zk-pc-backtop" element-path="pc/p-backtop">
    <ul class="zk-pc-backtop-list">
      <li class="zk-pc-backtop-li">
        <img src="https://i8.mifile.cn/b2c-mimall-media/55cad219421bee03a801775e7309b920.png" class="zk-pc-backtop-img">
        <p>个人中心</p>
      </li>
      <li class="zk-pc-backtop-li">
        <img src="https://i8.mifile.cn/b2c-mimall-media/4f036ae4d45002b2a6fb6756cedebf02.png" class="zk-pc-backtop-img">
        <p>联系客服</p>
      </li>
      <li class="zk-pc-backtop-li">
        <img src="https://i8.mifile.cn/b2c-mimall-media/d7db56d1d850113f016c95e289e36efa.png" class="zk-pc-backtop-img">
        <p>购物车</p>
      </li>
      <li class="zk-pc-backtop-li last">
        <img src="https://i1.mifile.cn/f/i/2018/home/totop.png" class="zk-pc-backtop-img">
        <p>返回顶部</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'p-backtop',
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

<style lang="less">
  @import '~_style/index.less';
  .pc-p-backtop {
  }
  .zk-pc-backtop {
    position: absolute;
    right: 0;
    bottom: 50px;
  }
  .zk-pc-backtop-li {
    width: 82px;
    height: 68px;
    background: #f8f7f7;
    margin-bottom: 1px;
    font-size: 12px;
    text-align: center;
  }

  .zk-pc-backtop-img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
  .last {
    margin-top: 16px;
  }
</style>
