<template>
  <div class="zk-list" :style="styles" component-path="core/zk-list" v-if="asyncflag">
    <x-list :elementData="viewModel" v-if="asyncflag"></x-list>
  </div>
</template>

<script>
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
        if (this.widget !== undefined) {
          console.info('widget', this.widget)
          if (this.widget.value !== undefined) {
            this.viewModel = this.widget.value
          } else {
            const parameter = {
              dataId: this.widget.dataId
            }
            var result = await this.$api.get(this.widget.apiUrl, parameter)
            this.viewModel = result.apiDataList
          }
        } else {
          console.error('错误:请传入widget数据!!')
        }
        this.asyncflag = true
        console.info('zk-list数据', this.viewModel)
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
  .zk-list {
    font-size: @font-size-base;
    .zk-not-data {
      margin: 0 auto;
      padding-top: 150 * @rem;
      text-align: center;
      svg {
        width: 50 * @rem;
        height: 50 * @rem;
      }
      p {
        font-size: @h4-font-size;
      }
    }
    .weui-panel:after {
      border: none !important;
    }
    .mescroll-upwarp {
      display: none !important;
    }
    .weui-media-box__bd {
      padding-left: 0.1rem;
      .weui-media-box__title {
        color: @brand;
      }
    }
  }
</style>

