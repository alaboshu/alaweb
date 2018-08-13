<template>
  <div class="weui-grids">
    <a :href="item.Url" class="weui-grid" v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/col+'%'">
      <div class="weui-grid__icon">
        <x-icon :src="item.image"></x-icon>
      </div>
      <p class="weui-grid__label">{{item.name}}</p>
    </a>
  </div>
</template>
<script>
  export default {
    name: 'zk-grid',
    props: {
      col: {
        type: Number,
        default: 4
      },
      elementData: {
        type: Array
      }
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.viewModel = this.elementData
      // console.info('x-grid', this.viewModel)
    },
    methods: {
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
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
