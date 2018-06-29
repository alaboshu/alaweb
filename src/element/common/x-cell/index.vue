<template>
  <router-link :to="to" class="weui-cell" :class="{'weui-cell_access': isLink}">
    <div class="weui-cell_hd">
      <slot name="icon" />
    </div>
    <div class="weui-cell__bd">
      <slot name="bd">
        <p v-html="title" />
      </slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">{{ value }}</slot>
    </div>
  </router-link>
</template>
<script>
  export default {
    name: 'x-group',
    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      to: String,
      isLink: Boolean
    },
  }
</script>
<style scoped lang="less">
  .weui-cell {
    height: 25px;
    text-decoration: none;
    .weui-cell__bd {
      p {
        color: #2c3e50;
      }
    }
  }
  .weui-cell:visited {
    color: #2c3e50;
  }
</style>
