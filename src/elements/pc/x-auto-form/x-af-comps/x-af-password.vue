<template>
  <el-form-item :label="item.name" :required="item.required" :prop="item.field">
    <el-input type="password" v-model="$parent.model[item.field]" :placeholder="item.placeHolder" :maxlength="item.maxlength" :minlength="item.minlength" />
  </el-form-item>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>
