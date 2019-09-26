<template>
  <zk-list ref="zkList"></zk-list>
</template>


<script>

  export default {
    onReachBottom: function () {
      this.$refs.zkList.$emit('onBottom', true)
    }
  }
</script>

