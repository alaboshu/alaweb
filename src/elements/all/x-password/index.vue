<template>
  <view class="x-password">
    <div class="x-input_label" v-if="label" :style="{color:colorIndex?'red':''}">{{label}}</div>
    <input class="uni-input" v-model="viewModel" type="text" @input="inputChange" :maxlength="isNumber()" />
    <!-- <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view> -->
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
      // 判断是否只使用数字密码，默认为false
      isNum: {
        default: false
      }
    },
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        },
        inputChange() { }
      },
      isNumber () {
        if (this.isNum === true) {
          var rep = /^[0-9]*$/
          if (rep.test(this.viewModel) === true) {
            return 6
          }
        }
        return 100
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          if (this.isNum === true) {
            var rep = /^[0-9]*$/
            if (rep.test(val) === true) {
              if (this.viewModel.length >= 6) {
                this.viewModel = this.viewModel.substring(0, 6)
              }
            } else {
              console.info('只能输入数字')
              this.viewModel = ''
              return
            }
          }
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>
