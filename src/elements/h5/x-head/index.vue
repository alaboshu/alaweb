<template>
  <header class="wv-header" :class="{ 'is-fixed': fixed }" @click.stop="$emit('headerClick')" :style="{ 'background-color': backgroundColor }">
    <div class="wv-header-btn left">
      <slot name="left" />
    </div>
    <div class="wv-header-title" v-text="title" />
    <div class="wv-header-btn right">
      <slot name="right" />
    </div>
  </header>
</template>

<script>

  export default {
    name: 'wv-header',

    props: {
      title: String,
      fixed: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String,
        default: '#21292c'
      }
    }
  }
</script>

<style scoped lang="less">
  .wv-header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    line-height: 1;
    padding: 0 10px;
    margin: 0;
    color: white;
    position: relative;
    white-space: nowrap;
    z-index: 500;

    .left {
      display: block;
      overflow: hidden;
      float: left;
      font-size: 35px;
      line-height: 35px;
      font-weight: 100;
      position: absolute;
    }

    .wv-header-title {
      font-size: 18px;
      font-weight: 0;
      text-align: center;
      flex: 1;
    }

    &.is-fixed {
      position: fixed;
      left: 0;
      top: 0;
    }
  }
</style>
