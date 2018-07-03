<template>
  <div class="weui-grids">
    <a :href="item.url" class="weui-grid" v-for="(item,index) in viewModel.result" :key="index">
      <div class="weui-grid__icon">
        <x-icon :src="item.imageUrl"></x-icon>
      </div>
      <p class="weui-grid__label">{{item.name}}</p>
    </a>
  </div>
</template>
<script>
  import api from '@/service/api/api'
  import { DIY_GETLINK } from '@/service/api/apiUrl'
  export default {
    name: 'zk-grid',
    data () {
      return {
        viewModel: ''
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
        this.viewModel = await api.get(DIY_GETLINK, para)
      }
    }
  }
</script>

<style scoped lang="less">
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
