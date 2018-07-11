<template>
  <div class="weui-form-preview">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label" v-html="title"/>
      <em class="weui-form-preview__value" v-html="value"/>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="(item, key, index) in dataItems" :key="key">
        <label class="weui-form-preview__label">{{ item.label }}</label>
        <span class="weui-form-preview__value">{{ item.value }}</span>
      </div>
    </div>
    <!-- <div class="weui-form-preview__ft">
      <div
        class="weui-form-preview__btn"
        v-for="(button, index) in buttons"
        :key="index"
        :class="button.type === 'primary' ? 'weui-form-preview__btn_primary' : 'weui-form-preview__btn_default'"
        v-text="button.text"
        @click="button.action"
      />
    </div>-->
  </div> 
</template>

<script>
export default {
  name: 'x-form-preview',

  props: {
    title: String,
    value: String,
    dataItems: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="less">
</style>
