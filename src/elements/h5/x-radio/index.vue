<template>
  <div>
    <div v-if="title" class="weui-cells__title" v-html="title" />
    <div class="weui-cells weui-cells_radio">
      <label v-for="option in options" :key="option.label || option" class="weui-cell weui-check__label" :class="{ 'weui-check__label-disabled': option.disabled }">
        <div class="weui-cell__bd">
          <p v-text="option.label || option" />
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
          <span class="weui-icon-checked" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-radio',

    props: {
      title: String,
      align: {
        type: String,
        default: 'left'
      },
      options: {
        type: Array,
        required: true
      },
      value: {}
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style lang="less">
  .weui-check__label-disabled {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
