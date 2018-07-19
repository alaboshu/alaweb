<template>
  <div class="weui-form-preview">
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
      elementData: {},
      buttons: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="less">
</style>
