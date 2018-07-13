<template>
  <div class="weui-cell" :class="{'weui-cell_access': isLink}" @click="onClick">
    <div class="weui-cell_hd" v-if="icon">
      <img :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;" />
    </div>
    <div class="weui-cell__bd">
      <slot name="bd">
        <p v-html="title" />
      </slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">{{ value }}</slot>
    </div>
  </div>
</template>

<script>
  import RouterLink from '@/mixins/router-link'
  export default {
    name: 'x-cell',

    mixins: [RouterLink],

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      isLink: Boolean,
      icon: {
        type: String
      }
    },

    methods: {
      onClick () {
        this.$emit('click')
        this.routerLink()
      }
    }
  }
</script>

<style scoped lang="less">
</style>
