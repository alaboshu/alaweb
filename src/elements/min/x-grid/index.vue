<template>
  <div class="weui-grids">
      <div class="weui-grids">
        <block v-for="(item,index) in grids" :key="index">
          <a url="" class="weui-grid" hover-class="weui-grid_active" :style="'width:'+100/gWidth+'%'">
            <image class="weui-grid__icon" :src="item.src" />
            <div class="weui-grid__label">{{item.name}}</div>
          </a>
        </block>
      </div>
  </div>
</template>
<script>
  import api from '@/service/api/api'
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  export default {
    name: 'zk-grid',
    props: {
      gWidth: {
        type: Number,
        default: 4
      }
    },

    data () {
      return {
        viewModel: '',
        grids: [
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Button' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Cell' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Toast' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Dialog' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Progress' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Msg' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'Article' },
          { src: 'http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png', name: 'ActionSheet' }
        ]
      }
    },
    mounted () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        var para = {
          diyKey: 'grid_index'
        }
        this.viewModel = await api.get(THEME_GETLINK_GET, para)
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请尽可能的使用变量
  .weui-grid {
    text-decoration: none;
    color: @brand;
    width: 25%;
    padding: 10px 10px;
    .weui-grid__icon {
      margin: 0 auto;
    }
  }
  .weui-cell:visited {
    color: #000;
  }
  .weui-grid__label {
    text-decoration: none;
    color: #000;
  }
</style>
