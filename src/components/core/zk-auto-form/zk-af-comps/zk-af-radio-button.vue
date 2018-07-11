<template>
  <el-form-item :label="item.name" :required="item.required" :prop="item.field">
    <el-radio v-model="$parent.model[item.field]" :label="item.key" :disabled="item.disabled">{{item.value}}</el-radio>
  </el-form-item>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    data () {
      return {
        options: []
      }
    }
  }
</script>
