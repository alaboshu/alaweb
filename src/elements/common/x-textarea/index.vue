<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <textarea @change="$emit('change', currentValue)" @focus="onFocus" @blur="onBlur" class="weui-textarea" ref="rextarea" :placeholder="placeholder" :rows="rows" :disabled="disabled" :readonly="readonly" v-model="currentValue" />
      <div class="weui-textarea-counter" v-if="showCounter">
        {{ length }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-textarea',

    props: {
      placeholder: String,
      showCounter: {
        type: Boolean,
        default: true
      },
      rows: {
        type: [Number, String],
        default: 3
      },
      maxLength: {
        type: [Number, String],
        default: 100
      },
      disabled: Boolean,
      readonly: Boolean,
      value: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    computed: {
      length () {
        return this.currentValue ? this.currentValue.length : 0
      }
    },

    mounted () {
      if (this.maxLength && this.length > this.maxLength) {
        this.currentValue = this.value.slice(0, this.maxLength)
      } else {
        this.currentValue = this.value
      }
    },

    methods: {
      onFocus () {
        this.$emit('focus')
      },

      onBlur () {
        this.$emit('blur')
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },

      value (val) {
        // 有最大字数限制时对超出限制部分进行截取
        if (this.maxLength && val.length > this.maxLength) {
          val = val.slice(0, this.maxLength)
        }

        this.currentValue = val
      }
    }
  }
</script>

<style scoped lang="less">
</style>
