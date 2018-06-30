<template>

  <div class="wv-switch" :class="{ 'wv-switch-on': currentValue, 'wv-switch-disabled': disabled }" @click="onClick" v-else>
    <div class="background" />
    <div class="thumb" :style="thumbStyle" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend" @touchcancel="onTouchend" />
  </div>
</template>

<script>
  import { getTouch } from '@/utils'
  const THUMB_STROKE = 20 // 开关的行程
  export default {
    name: 'x-switch',
    props: {
      title: String,
      disabled: Boolean,
      isInCell: {
        type: Boolean,
        default: true
      },
      value: Boolean
    },
    data () {
      return {
        currentValue: this.value,
        startX: 0,
        offset: 0,
        startOffset: 0,
        transition: ''
      }
    },
    computed: {
      thumbStyle () {
        return {
          transition: this.transition,
          transform: `translate3d(${this.offset}px, 0, 0)`
        }
      }
    },
    mounted () {
      this.offset = 0
    },

    methods: {
      onClick (event) {
        event.preventDefault()
        if (this.disabled) return

        this.currentValue = !this.currentValue
      },

      onTouchstart (event) {
        if (this.disabled) return

        const touch = getTouch(event)

        this.startX = touch.clientX
        this.startOffset = this.offset
        this.transition = ''
      },

      onTouchmove (event) {
        if (this.disabled) return

        const touch = getTouch(event)
        const deltaX = touch.clientX - this.startX

        const targetOffset = this.startOffset + deltaX

        if (targetOffset >= 0 && targetOffset <= THUMB_STROKE) {
          this.offset = targetOffset
        } else if (targetOffset < 0) {
          this.offset = 0
        } else if (targetOffset > THUMB_STROKE) {
          this.offset = THUMB_STROKE
        }
      },

      onTouchend (event) {
        if (this.disabled) return

        const touch = getTouch(event)

        let deltaX = touch.clientX - this.startX

        this.transition = '-webkit-transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)'
        if (this.currentValue) {
          if (deltaX < THUMB_STROKE / -2) {
            this.currentValue = false
          } else {
            this.offset = THUMB_STROKE
          }
        } else {
          if (deltaX > THUMB_STROKE / 2) {
            this.currentValue = true
          } else {
            this.offset = 0
          }
        }
      }
    },

    watch: {
      value (val) {
        this.currentValue = val
      },

      currentValue (val) {
        this.$emit('input', val)
        this.$emit('change', val)

        this.offset = val ? THUMB_STROKE : 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .wv-switch {
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #dfdfdf;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #dfdfdf;
    transition: background-color 0.1s, border 0.1s;

    input {
      display: none;
    }

    .background {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 3px;
      border-radius: 15px;
      background-color: #fdfdfd;
      transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    }

    .thumb {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    &.wv-switch-on {
      border-color: #04be02;
      background-color: #04be02;

      .background {
        transform: scale(0);
      }

      .thumb {
        transform: translateX(20px);
      }
    }
  }

  .wv-switch-disabled {
    &.wv-switch-on {
      border-color: #dedede;
      background-color: #dedede;
    }
    .background {
      background-color: #dedede;
    }

    .thumb {
      background-color: lightgray;
    }
  }

  // 兼容IE Edge的版本
  .wv-switch-cp__input {
    position: absolute;
    left: -9999px;
  }

  .wv-switch-cp__box {
    display: block;
  }
</style>

