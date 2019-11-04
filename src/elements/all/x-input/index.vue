<template>
  <view class="x-input">
    <view class="uni-form-item " v-if="!password">
      <div class="x-input_label" v-if="label">{{label}}</div>
      <input :type="type" @focus="inputFocus" class="uni-input" :value="inputValue" :placeholder="placeholder" :readonly="readonly" :required="required" :disabled="disabled" :autofocus="autofocus" @input="clearInput" />
      <view class="uni-icon uni-icon-clear" v-if="clearable&&showClearIcon" @click="clearIcon" style="display: none;"></view>
    </view>
    <view class="uni-form-item " v-if="password">
      <div class="x-input_label" v-if="label" :style="{color:colorIndex?'red':''}">{{label}}</div>
      <input class="uni-input" @focus="inputFocus" :value="inputModel" :placeholder="placeholder" :readonly="readonly" :password="showPassword" :required="required" :disabled="disabled" :autofocus="autofocus" @input="clearInput" />
      <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
    </view>
  </view>
</template>
<script>
  import './var.scss'
  export default {
    props: {
      type: {
        default: 'text'
      },
      label: {
        default: ''
      },
      placeholder: {
        default: '请输入'
      },
      readonly: {
        default: false
      },
      password: {
        default: false
      },
      required: {
        default: false
      },
      disabled: {
        default: false
      },
      autofocus: {
        default: false
      },
      clearable: {
        default: false
      },
      value: {},
      defaultValue: {
        default: ''
      },
      usercode: {
        default: null
      },
      widget: {

      }
    },
    data () {
      return {
        title: 'input',
        inputModel: this.value,
        inputValue: this.value,
        focus: false,
        showClearIcon: false,
        inputClearValue: '',
        changeValue: '',
        showPassword: true,
        colorIndex: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.usercode && this.widget.field === 'parentUserName') {
          this.inputValue = this.usercode
        }
      },
      onKeyInput: function (event) {
        this.inputValue = event.target.value
      },
      replaceInput: function (event) {
        var value = event.target.value
        if (value === '11') {
          this.changeValue = '2'
        }
      },
      hideKeyboard: function (event) {
        if (event.target.value === '123') {
          uni.hideKeyboard()
        }
      },
      clearInput: function (event) {
        this.inputModel = event.target.value
        if (this.clearable === true) {
          this.inputClearValue = event.target.value
          if (event.target.value.length > 0) {
            this.showClearIcon = true
            this.colorIndex = false
          } else {
            this.showClearIcon = false
            this.colorIndex = true
          }
        }
      },
      clearIcon: function () {
        if (this.clearable) {
          this.inputModel = ''
          this.showClearIcon = false
        }
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      },
      inputFocus (event) {
        if (event.target.value.length > 0) {
          this.colorIndex = false
        } else {
          this.colorIndex = true
        }
      }
    },
    watch: {
      inputModel (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "@/assets/style/variable.scss";

  .x-input {
    .uni-icon {
      color: $gl-text3;
      font-size: 20px;
    }
    .uni-active {
      color: $gl-themeColor;
    }
    .uni-input {
      border: none;
      outline: none;
    }
  }
</style>
