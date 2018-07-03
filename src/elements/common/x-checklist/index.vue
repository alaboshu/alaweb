<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title" />
    <div class="weui-cells weui-cells_checkbox">
      <label v-for="option in options" :key="option.label || option" class="weui-cell weui-check__label" :class="{ 'weui-check__label-disabled': option.disabled }">
        <div class="weui-cell__hd" v-if="align === 'left'">
          <input type="checkbox" class="weui-check" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
          <i class="weui-icon-checked" />
        </div>
        <div class="weui-cell__bd">
          <p v-text="option.label || option" />
        </div>
        <div class="weui-cell__hd" v-if="align === 'right'">
          <input type="checkbox" class="weui-check" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
          <i class="weui-icon-checked" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-checklist',

    props: {
      max: {
        type: Number,
        validator: (val) => {
          return val >= 0
        }
      },
      title: String,
      align: {
        type: String,
        default: 'left',
        validator: (val) => {
          return val === 'left' || val === 'right'
        }
      },
      options: {
        type: Array,
        required: true
      },
      value: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      currentValue: {
        get () {
          return this.value
        },

        set (val) {
          if (this.max && val.length > this.max) {
            val = val.slice(0, this.max)
          }

          this.$emit('input', val)
        }
      }
    },

    created () {
      this.currentValue = this.value
    },

    watch: {
      value (val, oldValue) {
        if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
          this.$emit('change', val)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .weui-check__label-disabled {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
