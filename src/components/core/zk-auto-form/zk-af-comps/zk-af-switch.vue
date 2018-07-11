<template>
  <el-form-item :label="item.name" :required="item.required" :prop="item.field">
    <el-switch v-model="$parent.model[item.field]" :disabled="item.disabled" />
  </el-form-item>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>
