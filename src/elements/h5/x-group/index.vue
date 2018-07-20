<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{ color: titleColor }" v-html="title" />
    <div class="weui-cells" :style="'margin-top:'+mTop+'px'">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-group',
    props: {
      title: String,
      titleColor: String,
      mTop: {
        type: Number,
        default: 10
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
</style>
