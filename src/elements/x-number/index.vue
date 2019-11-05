<template>
  <view class="number-numbox">
    <view class="uni-numbox-minus" :class="{'uni-numbox-disabled': disableSubtract}" @click="_calcValue('subtract')">-</view>
    <input class="uni-numbox-value" type="number" :disabled="disabled" :value="inputValue">
    <view class="uni-numbox-plus" :class="{'uni-numbox-disabled': disableAdd}" @click="_calcValue('add')">+</view>
  </view>
</template>
<script>
  export default {
    name: 'number-box',
    props: {
      value: {
        type: Number,
        default: 0
      },
      min: {
        type: Number,
        default: -Infinity
      },
      max: {
        type: Number,
        default: Infinity
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiplication: {
        type: Number
      }
    },
    data () {
      return {
        inputValue: this.value,
        isAdd: true,
        isSubtract: true,
        disableSubtract: false,
        disableAdd: false
        // max: 24
      }
    },
    watch: {
      value (val) {
        this.inputValue = val
      },
      inputValue (val) {
        this.$emit('change', val)
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {

      },
      _calcValue (type) {
        if (type === 'subtract') {
          if (!this.$api.isEmpty(this.multiplication)) {
            var nums = this.inputValue - this.multiplication
            if (nums < this.min) {
              this.$api.toastWarn('不能小于购买最小数量')
            } else {
              this.inputValue -= this.multiplication
            }
          } else {
            this.inputValue -= 1
          }
        } else if (type === 'add') {
          if (!this.$api.isEmpty(this.multiplication)) {
            if (this.max === 'Infinity' || this.max === 0) {
              this.inputValue += this.multiplication
            } else {
              var num = this.inputValue + this.multiplication
              if (num > this.max) {
                this.$api.toastWarn('超出购买最大数量')
              } else {
                this.inputValue += this.multiplication
              }
            }
          } else {
            this.inputValue += 1
          }
        }
      }
      // _getDecimalScale () {
      //   let scale = 1
      //   // 浮点型
      //   if (~~this.step !== this.step) {
      //     scale = Math.pow(10, (this.step + '').split('.')[1].length)
      //   }
      //   return scale
      // },
      // _onBlur (event) {
      //   let value = event.detail.value
      //   if (!value) {
      //     this.inputValue = 0
      //     return
      //   }
      //   value = +value
      //   if (value > this.max) {
      //     value = this.max
      //   } else if (value < this.min) {
      //     value = this.min
      //   }
      //   this.inputValue = value
      // },
      // onChang (val) {
      //   this.inputValue = Number(val.detail.value.replace(/\D/g, ''))
      // }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .number-numbox {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 70upx;
    position: relative;
    border: 1px solid #e5e5e5;
    .uni-numbox::after {
      content: "";
      position: absolute;
      transform-origin: center;
      box-sizing: border-box;
      pointer-events: none;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      border: 1px solid #c8c7cc;
      transform: scale(0.5);
    }

    .uni-numbox-minus,
    .uni-numbox-plus {
      margin: 0;
      background-color: #f9f9f9;
      width: 80upx;
      height: 100%;
      line-height: 65upx;
      text-align: center;
      color: #555555;
      position: relative;
      font-size: 18px;
    }

    .uni-numbox-minus {
      border: none;
      border-top-left-radius: 6upx;
      border-bottom-left-radius: 6upx;
    }

    .uni-numbox-plus {
      border: none;
      border-top-right-radius: 6upx;
      border-bottom-right-radius: 6upx;
    }

    .uni-numbox-value {
      position: relative;
      background-color: #ffffff;
      width: 80upx;
      height: 100%;
      text-align: center;
    }

    .uni-numbox-value::after {
      content: "";
      position: absolute;
      transform-origin: center;
      box-sizing: border-box;
      pointer-events: none;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      border-style: solid;
      border-color: #cccccc;
      border-left-width: 1px;
      border-right-width: 1px;
      border-top-width: 0;
      border-bottom-width: 0;
      transform: scale(0.5);
    }

    .uni-numbox-disabled {
      color: #c0c0c0;
    }
  }
</style>
