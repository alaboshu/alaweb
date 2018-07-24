<template>
  <div class="zk-keyword" :style="styles" component-path="core/zk-keyword" v-if="asyncflag">
    <!-- {{viewModel}} -->
    <ul class="zk-keyword_box">
      <li class="zk-keyword_item" v-for="(item,index) in viewModel" :class="{'active':(index%2===0)}" :key="index">
        <a href="">
          {{item.Name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: {
      widget: {}
    },
    data () {
      return {
        viewModel: '',
        asyncflag: false,
        styles: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.widget !== undefined && this.widget.value !== undefined) {
          this.viewModel = this.widget.value
        } else {
          const parameter = {
            dataId: this.widget && this.widget.dataId,
            defaultId: '5b406cddfef00000a0000001'
          }
          this.viewModel = await this.$api.get(THEME_GETVALUE_GET, parameter)
        }
        this.asyncflag = true
        console.info('zk-keyword数据', this.viewModel)
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
  .zk-keyword {
    font-size: @font-size-base;
    .zk-keyword_box {
      margin-top: 20px;
      padding: 0 10px;
      .zk-keyword_item {
        margin: 0 5px;
        padding: 0 10px;
        float: left;
        height: 30px;
        line-height: 30px;
        background: #efeff4;
        border-radius: 10px;
        margin-bottom: 10px;
        a {
          color: @metal;
        }
      }
      .active {
        background: @brand;
        a {
          color: @light;
        }
      }
    }
    .zk-keyword_box:after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>

