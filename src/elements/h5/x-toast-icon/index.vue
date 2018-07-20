<template>
  <i :class="classObject" />
</template>

<script>

  export default {
    name: 'x-toast-icon',

    props: {
      type: {
        type: String,
        required: true
      },
      large: Boolean
    },

    computed: {
      classObject () {
        let classType = `weui-icon-${this.type}`

        return {
          [classType]: true,
          'weui-icon_msg': this.large
        }
      }
    }
  }
</script>

<style scoped lang="less">
</style>
