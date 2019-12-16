<template>
  <view class="x-password">
    <div class="x-input_label" v-if="label" :style="{color:colorIndex?'red':''}">{{label}}</div>
    <input class="uni-input" v-model="viewModel" :type="showPassword?'password':'test'" :placeholder="placeHolder" :maxlength="isNumber()" @input="changeInput" />
    <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="showPassword = !showPassword"></view>
  </view>
</template>

<script>
  import './var.scss'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {},
      label: {},
      isNum: {
        default: false
      }, // 默认为false ，为true时只能输入数字密码
      placeHolder: {}
    },
    data () {
      return {
        viewModel: null,
        showPassword: true, // 是否显示密码，点击后显示密码
        colorIndex: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
      },
      isNumber (type = false) {
        if (this.isNum) {
          var rep = /^[0-9]*$/
          if (rep.test(this.viewModel) === true) {
            if (type) {
              if (this.viewModel.length >= 6) {
                this.viewModel = this.viewModel.substr(0, 6)
              }
            } else {
              return 6
            }
          }
        }
      },
      changeInput (ev) {
        if (this.isNum) {
          var rep = /^[0-9]*$/
          if (rep.test(this.viewModel) !== true) {
            this.viewModel = this.viewModel.slice(0, this.viewModel.length - 1)
          }
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.isNumber(true)
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "@/assets/style/variable.scss";
  .x-password {
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
