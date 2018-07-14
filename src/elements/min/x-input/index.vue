<template>
  <div class="weui-cell weui-cell_input">
    <div class="weui-cell__hd">
      <div class="weui-label" v-if="title">{{title}}</div>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input" :type="type" v-model="qwe" :number="type === 'number'" :placeholder="placeholder" :value="currentValue" :maxlength="maxlength" :minlength="minlength" :readonly="readonly" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: { // 类型
        type: String,
        default: 'text'
      },
      title: String,
      placeholder: String,
      value: String,
      readonly: Boolean,
      disabled: Boolean,
      maxlength: Number,
      minlength: Number
    },
    data () {
      return {
        currentValue: this.value
      }
    }
  }
</script>

<style scoped>
  .weui-form-preview {
    margin-bottom: 25px;
  }
</style>
