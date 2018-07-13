<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{ color: titleColor }" v-html="title">带说明的列表项</div>
    <div class="weui-cells weui-cells_after-title">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-group',
    props: {
      title: String,
      titleColor: String
    }
  }
</script>
<style>
</style>
