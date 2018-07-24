<template>
  <div
    class="wv-swipe"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend">
    <div
      :style="wrapperStyle"
      class="wv-swipe__wrapper"
      @transitionend="$emit('change', activeIndicator)"
    >
      <slot/>
    </div>
    <div class="wv-swipe__indicators" v-if="showIndicators && count > 1">
      <i
        v-for="index in count"
        :key="index"
        :class="{ 'wv-swipe__indicator--active': index - 1 === activeIndicator }"
      />
    </div>
  </div>
</template>

<script>
import { getTouch } from '@/utils'

export default {
  name: 'wv-swipe',
  props: {
    height: Number,
    autoplay: Number,
    defaultIndex: {
      type: Number,
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    },
    prevent: Boolean,
    noDragWhenSingle: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      width: 0,
      offset: 0,
      startX: 0,
      startY: 0,
      active: 0,
      deltaX: 0,
      swipes: [],
      direction: '',
      currentDuration: 0
    }
  },

  mounted () {
    this.initialize()
  },

  destroyed () {
    clearTimeout(this.timer)
  },

  watch: {
    swipes () {
      this.initialize()
    },

    defaultIndex () {
      this.initialize()
    }
  },

  computed: {
    count () {
      return this.swipes.length
    },

    wrapperStyle () {
      let ret = {
        paddingLeft: this.count > 1 ? this.width + 'px' : 0,
        width: this.count > 1 ? (this.count + 2) * this.width + 'px' : '100%',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate3d(${this.offset}px, 0, 0)`
      }

      if (this.height) {
        ret.height = this.height + 'px'
      }

      return ret
    },

    activeIndicator () {
      return (this.active + this.count) % this.count
    }
  },

  methods: {
    initialize () {
      clearTimeout(this.timer)
      this.width = this.$el.getBoundingClientRect().width
      this.active = this.defaultIndex
      this.currentDuration = 0
      this.offset = this.count > 1 ? -this.width * (this.active + 1) : 0
      this.swipes.forEach(swipe => {
        swipe.offset = 0
      })
      this.autoPlay()
    },

    onTouchstart (event) {
      if (this.count === 1 && this.noDragWhenSingle) {
        return
      }

      clearTimeout(this.timer)
      const touch = getTouch(event)

      this.deltaX = 0
      this.direction = ''
      this.currentDuration = 0
      this.startX = touch.clientX
      this.startY = touch.clientY

      if (this.active <= -1) {
        this.move(this.count)
      }
      if (this.active >= this.count) {
        this.move(-this.count)
      }
    },

    onTouchmove (event) {
      if (this.prevent) {
        event.preventDefault()
      }

      const touch = getTouch(event)

      this.deltaX = touch.clientX - this.startX
      const deltaY = touch.clientY - this.startY

      if (this.count === 1) {
        if (this.noDragWhenSingle) return

        this.offset = this.range(this.deltaX, [-20, 20])
      } else if (this.count > 1 && Math.abs(this.deltaX) > Math.abs(deltaY)) {
        this.move(0, this.range(this.deltaX, [-this.width, this.width]))
      }
    },

    onTouchend () {
      if (this.count === 1) {
        if (this.noDragWhenSingle) return

        this.offset = 0
        this.currentDuration = this.duration
      } else {
        if (this.deltaX) {
          this.move(Math.abs(this.deltaX) > 50 ? (this.deltaX > 0 ? -1 : 1) : 0)
          this.currentDuration = this.duration
        }
        this.autoPlay()
      }
    },

    move (move = 0, offset = 0) {
      const {active, count, swipes, deltaX, width} = this

      if (move) {
        if (active === -1) {
          swipes[count - 1].offset = 0
        }
        swipes[0].offset = active === count - 1 && move > 0 ? count * width : 0

        this.active += move
      } else {
        if (active === 0) {
          swipes[count - 1].offset = deltaX > 0 ? -count * width : 0
        } else if (active === count - 1) {
          swipes[0].offset = deltaX < 0 ? count * width : 0
        }
      }
      this.offset = offset - (this.active + 1) * this.width
    },

    autoPlay () {
      const {autoplay} = this
      if (autoplay && this.count > 1) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.currentDuration = 0

          if (this.active >= this.count) {
            this.move(-this.count)
          }

          setTimeout(() => {
            this.currentDuration = this.duration
            this.move(1)
            this.autoPlay()
          }, 30)
        }, autoplay)
      }
    },

    range (num, arr) {
      return Math.min(Math.max(num, arr[0]), arr[1])
    }
  }
}
</script>

<style lang="less">
  .wv-swipe {
    overflow: hidden;
    position: relative;
    user-select: none;

    &__wrapper {
      height: 100%;
      overflow: hidden;
    }

    &__indicators {
      left: 50%;
      bottom: 10px;
      position: absolute;
      height: 6px;
      transform: translate3d(-50%, 0, 0);

      > i {
        border-radius: 100%;
        vertical-align: top;
        display: inline-block;
        background-color: gray;
        width: 6px;
        height: 6px;

        &:not(:last-child) {
          margin-right: 6px;
        }
      }

      .wv-swipe__indicator {
        &--active {
          background-color: white;
        }
      }
    }
  }
</style>
