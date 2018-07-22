<template>
  <el-form-item :label="item.name" :required="item.required" :prop="item.field">
    <el-input-number v-model="$parent.model[item.field]" :precision="2" :max="item.max" :min="item.min" />
  </el-form-item>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>
