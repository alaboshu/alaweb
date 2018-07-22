<template>
  <div class="zk-auto-form">
    <x-auto-form :viewApi="viewApi" :postApi="postApi" @postSuccess="postSuccess" @postFailed="postFailed" />
  </div>
</template>

<script>
  import { editSetting } from './property'

  export default {
    name: editSetting.key,
    props: {
      viewApi: {
        type: String,
        required: true
      },
      postApi: {
        type: String,
        required: true
      }
    },
    methods: {
      postSuccess (data) {
        this.$emit('postSuccess', data)
      },
      postFailed () {
        this.$emit('postFailed')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
</style>

