<template>
  <div class="border-header" v-if="widget.border">
    <x-icon class="border-header-icon" v-if="widget.border.icon" :icon="widget.border" :color="widget.border.icon.color"></x-icon>
    <view class="border-header-title" v-if="widget.border.title">{{widget.border.title}}</view>
    <view class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</view>
  </div>
</template>

<script>
  export default {
    props: {
      widget: {}
    }
  }
</script>


<style lang="scss">
  .border-header {
    .border-header-title {
      color: #202020;
      font-size: 14px;
      font-weight: 700;
      padding-left: 10px;
    }
  }
</style>
