<template>
  <a class="weui-cell" :href="url">
    <div class="weui-cell__hd" v-if="icon">
      <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"/>
    </div>
    <div class="weui-cell__bd" v-if="title">{{title}}</div>
    <div class="weui-cell__ft" v-if="value">{{value}}</div>
  </a>
</template>

<script>
  export default {
    name: 'x-cell',

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      url: {
        type: String,
        default: ' javascript:'
      },
      icon: {
        type: String
      }
    }
  }
</script>

<style lang="less">
  .a {
    display: block;
  }
</style>
