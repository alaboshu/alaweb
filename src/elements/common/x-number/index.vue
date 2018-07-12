<template>
  <div class="wv-number-spinner" v-on="listeners">
    <button class="spinner-btn btn-minus" @click="decrease" :disabled="disabled || readonly || !decreasable" />
    <input ref="input" type="number" :value="currentValue" :min="min" :max="max" :step="step" :disabled="disabled || (!decreasable && !increasable)" :readonly="readonly" @change="onChange" @paste="onPaste" @keypress="onKeypress" v-bind="$attrs" :style="inputStyle">
    <button class="spinner-btn btn-plus" @click="increase" :disabled="disabled || readonly || !increasable" />
  </div>
</template>
<script>
  const isNaN = Number.isNaN || window.isNaN

  export default {
    name: 'x-number-spinner',

    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      inputWidth: {
        type: String,
        default: '3em'
      },
      readonly: Boolean,
      disabled: Boolean,
      align: {
        type: String,
        default: 'center'
      },
      fillable: {
        type: Boolean,
        default: true
      },
      value: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    inheritAttrs: false,

    model: {
      event: 'change'
    },

    computed: {
      increasable () {
        const num = this.currentValue

        return isNaN(num) || num < this.max
      },

      decreasable () {
        const num = this.currentValue

        return isNaN(num) || num > this.min
      },

      inputStyle () {
        return {
          width: this.inputWidth,
          textAlign: this.align
        }
      },

      listeners () {
        const listeners = { ...this.$listeners }
        delete listeners.change
        return listeners
      }
    },

    created () {
      if (this.min < this.max) {
        this.currentValue = Math.min(this.max, Math.max(this.min, this.value))
      }
    },

    methods: {
      decrease () {
        if (this.decreasable) {
          let { currentValue } = this
          if (isNaN(currentValue)) {
            currentValue = 0
          }
          this.setValue(Math.min(this.max, Math.max(this.min, currentValue - this.step)))
        }
      },

      increase () {
        if (this.increasable) {
          let { currentValue } = this
          if (isNaN(currentValue)) {
            currentValue = 0
          }
          this.setValue(Math.min(this.max, Math.max(this.min, currentValue + this.step)))
        }
      },

      onChange (event) {
        this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)))
      },

      onPaste (event) {
        if (!this.fillable || !/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(event.clipboardData.getData('text'))) {
          event.preventDefault()
        }
      },

      onKeypress (event) {
        if (!this.fillable) {
          event.preventDefault()
        }
      },

      setValue (val) {
        const oldValue = this.currentValue

        this.currentValue = val
        this.$emit('change', val, oldValue)
        this.$refs.input.value = val
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      },

      value (val) {
        if (typeof val === 'number') {
          if (val <= this.min) {
            this.currentValue = this.min
          } else if (val >= this.max) {
            this.currentValue = this.max
          } else {
            this.currentValue = val
          }
        } else if (val === '') {
          this.currentValue = ''
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .wv-number-spinner {
    display: flex;
    font-size: 13px;
    height: 1.5em;
    width: auto;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 3px;
    justify-content: space-between;

    &:focus {
      border: 1px solid red;
    }

    input {
      border: none;
      outline: none;
      padding: 0 0.5em;
      font-size: 1em;
      line-height: 1.5;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
      }

      &:focus {
        border-color: #0074d9;
        outline: none;
      }

      &[readonly] {
        background: #f8f8f8;
      }

      &:disabled {
        background-color: #f8f8f8;
        opacity: 0.65;
      }
    }

    .spinner-btn {
      background-color: transparent;
      width: 1.5em;
      position: relative;
      border: none;
      border-radius: 0;
      outline: none;

      &:focus {
        outline: none;
      }

      &::before,
      &::after {
        background-color: #333;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: background-color 0.15s;
      }

      &::before {
        height: 0.0625rem;
        width: 50%;
      }

      &::after {
        height: 50%;
        width: 0.0625rem;
      }

      &:disabled {
        &::before,
        &::after {
          background-color: #ddd;
        }
      }
    }

    .btn-minus {
      border-right: 1px solid #ddd;
    }

    .btn-plus {
      border-left: 1px solid #ddd;
    }

    .btn-minus::after {
      display: none;
    }
  }
</style>
