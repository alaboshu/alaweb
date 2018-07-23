<template>
  <div class="common-x-preview  weui-form-preview">
    <div class="weui-form-preview__hd" v-for="(item, index) in elementData" :key="index" v-if="index==0">
      <label class="weui-form-preview__label">{{ item.name }}</label>
      <em class="weui-form-preview__value">{{ item.value }}</em>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="(item, index) in elementData" :key="index" v-if="index>0">
        <label class="weui-form-preview__label">{{ item.name }}</label>
        <span class="weui-form-preview__value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-preview',
    props: {
      elementData: {}
    },
    data () {
      return {
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      }
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less';
  .common-x-preview {
  	font-size: @font-size-base;
  }
</style>