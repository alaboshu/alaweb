<template>
  <router-link class="weui-grid" :to="to">
    <div class="weui-grid__icon" v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <p class="weui-grid__label" v-if="$slots.label">
      <slot name="label" />
    </p>
    <slot/>
  </router-link>
</template>
<script>

  export default {
    name: 'x-grid-item',
    props: {
      to: String
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .weui-grid {
    text-decoration: none;
    color: #000;
  }
  .weui-cell:visited {
    color: #000;
  }
</style>
