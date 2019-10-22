<template>
  <el-select filterable :multiple="multiple" v-model="viewModel" class="x-select" placeholder="请选择" v-if="keyValues">
    <el-option v-for="item in keyValues" :key="item.key" :value="item.key" :label="item.value"></el-option>
  </el-select>
</template>

<script>
  import type from '@/service/api/type.api.js'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      type: {},
      multiple: {
        default: false
      },
      apiUrl: {}, // Api网址，优先从Api中获取数据
      dataModel: {}
    },
    data () {
      return {
        keyValues: null,
        viewModel: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.keyValues === null) {
          this.keyValues = await type.getKeyValues(this.type, this.apiUrl)
        }
        if (this.dataModel === '00000000-0000-0000-0000-000000000000' || this.dataModel === '000000000000000000000000') {
          if (this.viewModel.length > 0) {
            this.viewModel = this.viewModel[0].key
          }
        } else {
          this.viewModel = this.dataModel
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>




