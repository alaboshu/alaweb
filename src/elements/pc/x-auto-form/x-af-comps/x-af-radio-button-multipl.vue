<template>
  <el-form-item :label="item.name" :required="item.required" :prop="item.field">
    <el-radio-group v-model="$parent.model[item.field]">
      <el-radio v-for="option of options" :key="option.key" :label="option.key" :disabled="option.disabled">
        {{option.value}}
      </el-radio>
    </el-radio-group>
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
    },
    mounted () {
      this.fetchOptions()
    },
    methods: {
      async fetchOptions () {
        const { dataSource } = this.item
        if (!dataSource) return
        const data = await this.$api.get(dataSource)
        if (data.status !== 1) return
        this.options = data.result
      }
    }
  }
</script>
