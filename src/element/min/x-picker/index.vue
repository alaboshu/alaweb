<template>
  <picker :mode="mode" :range="range" :rangeKey="rangeKey" :value="value" :disabled="disabled" @change="handleChange" @cancel="handleCancel">
    <slot></slot>
  </picker>
</template>

<script>
  export default {
    props: {
      mode: {
        type: String,
        default: 'selector'
      },
      range: {
        type: Array,
        default: () => []
      },
      rangeKey: String,
      value: {
        tyep: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleChange (e) {
        this.$emit('change', e)
      },
      handleCancel (e) {
        this.$emit('cancel', e)
      }
    }
  }
</script>
