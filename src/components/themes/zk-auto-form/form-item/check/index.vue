<template>
  <checkbox-group @change="checkboxChange">
    <label v-for="(check,checkIndex) in list.options.options" :key="checkIndex">
      <checkbox :value="check.value" :checked="check.value===list.options.defaultValue[0]" />{{check.value}}
    </label>
  </checkbox-group>
</template>
<script>
  export default {
    data () {
      return {
        checkModel: ''
      }
    },
    props: {
      value: {},
      list: {}
    },
    mounted () {
      this.checkModel = this.value
    },
    methods: {
      checkboxChange (val) {
        this.checkModel = val.detail.value
      }
    },
    watch: {
      checkModel (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
