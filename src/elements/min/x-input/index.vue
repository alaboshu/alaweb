<template>
  <div class="weui-cell weui-cell_input">
    <div class="weui-cell__hd">
      <div class="weui-label" v-if="title">{{title}}</div>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input" ref="input" :type="type" :auto-complete="autoComplete" :autofocus="autofocus" :placeholder="placeholder" :value="currentValue" :readonly="readonly" :number="type === 'number'" :maxlength="maxlength" :minlength="minlength" @focus="onFocus" @blur="onBlur" @change="onChange" @input="handleInput">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      title: String,
      labelWidth: {
        type: Number,
        default: 105
      },
      placeholder: String,
      value: String,
      name: String,
      autoComplete: {
        type: String,
        default: 'off'
      },
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      required: {
        type: Boolean,
        default: false
      },
      pattern: String,
      validateMode: {
        type: Object,
        default: () => {
          return {
            onFocus: true,
            onBlur: true,
            onChange: true,
            onInput: true
          }
        }
      }
    },
    data () {
      return {
        active: false,
        valid: true,
        currentValue: this.value
      }
    },
    methods: {
      handleInput (event) {
        // 当有最大长度属性时，限制过长的输入
        console.log('event', event)
        console.log('event.target.value', event.target.value)
        console.log('event.target.value', event.target.value)
        if (this.maxlength && event.target.value.length >= this.maxlength) {
          this.currentValue = ''
          this.currentValue = event.target.value.substr(0, this.maxlength)
        } else {
          this.currentValue = event.target.value
        }

        if (typeof this.validateMode === 'undefined' || this.validateMode.onInput !== false) {
          this.validate()
        }
      },

      focus () {
        this.$refs.input.focus()
      },

      onFocus () {
        this.active = true
        this.$emit('focus')

        if (typeof this.validateMode === 'undefined' || this.validateMode.onFocus !== false) {
          this.validate()
        }
      },

      onBlur () {
        this.active = false
        this.$emit('blur')

        if (typeof this.validateMode === 'undefined' || this.validateMode.onBlur !== false) {
          this.validate()
        }
      },

      onChange () {
        this.$emit('change', this.currentValue)

        if (typeof this.validateMode === 'undefined' || this.validateMode.onChange !== false) {
          this.validate()
        }
      },

      validate () {
        if (this.pattern) {
          const reg = new RegExp(this.pattern)
          if (!reg.test(this.currentValue)) {
            this.valid = false
            return
          }
        }

        if (this.required && this.currentValue === '') {
          this.valid = false
          return
        }

        if (this.minlength && this.currentValue.length < this.minlength) {
          this.valid = false
          return
        }

        this.valid = true
      }
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style scoped>
  .weui-form-preview {
  	margin-bottom: 25px;
  }
</style>
