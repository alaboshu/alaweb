<template>
  <div class="h5-x-cell  weui-form-preview" element-path="h5/x-cell">
    <div class="weui-cell" :class="{'weui-cell_access': item.Url!==''}" @click="onClick(item.Url)" v-for="(item,index) in elementData" :key="index">
      <div class="weui-cell_hd" v-if="item.Image!=''">
        <x-icon :src="item.Image" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></x-icon>
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
</template>

<script>
  export default {
    name: 'x-cell',
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

        } else {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~_style/index.less';
  .h5-x-cell {
    font-size: @font-size-base;
  }
</style>
