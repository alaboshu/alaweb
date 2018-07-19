<template>
  <div class="zk-cell" :style="styles" component-path="core/zk-cell">
    <div>
      <div class="weui-cell" :class="{'weui-cell_access': item.Url!==''}" @click="onClick(item.Url)" v-for="(item,index) in viewModel" :key="index">
        <div class="weui-cell_hd" v-if="item.Image!=''">
          <img :src="item.Image" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;" />
        </div>
        <div class="weui-cell__bd">
          <slot name="bd">
            <p v-html="item.Name" />
          </slot>
        </div>
        <div class="weui-cell__ft">
          <slot name="ft"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RouterLink from '@/mixins/router-link'
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    mixins: [RouterLink],
    props: {
      dataId: {
        type: String
      },
      widgetId: {
        type: String
      },
      pageValues: {}
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
      onClick (url) {
        if (url !== '') {
          this.$router.push(url)
        }
      },
      async  init () {
        if (this.pageValues !== undefined) {
          this.viewModel = this.pageValues
        } else {
          const parameter = {
            dataId: this.dataId,
            defaultId: '5b406cddfef00000a0000006'
          }
          this.viewModel = await this.$api.get(THEME_GETVALUE_GET, parameter)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-cell {
    font-size: @font-size-base;
  }
</style>

