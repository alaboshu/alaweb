import manager from './manager'
import context from './context'
import scrollUtils from '../../utils/scroll'
import { off, on } from '../../utils/event'

export default {
  props: {
    // whether to show popup
    visible: Boolean,
    // whether to show mask
    mask: Boolean,
    // mask custom style
    maskStyle: Object,
    // mask custom class name
    maskClass: String,
    // whether to close popup when click mask
    closeOnClickMask: Boolean,
    // z-index
    zIndex: [String, Number],
    // prevent body scroll
    getContainer: Function,
    lockOnScroll: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    visible (val) {
      this[val ? 'open' : 'close']()
    },

    getContainer () {
      this.move()
    },

    mask () {
      this.renderMask()
    }
  },

  created () {
    this._popupId = 'popup-' + context.plusKey('idSeed')
    this.pos = {
      x: 0,
      y: 0
    }
  },

  mounted () {
    if (this.getContainer) {
      this.move()
    }
    if (this.visible) {
      this.open()
    }
  },

  methods: {
    move () {
      /* istanbul ignore else */
      if (this.getContainer) {
        this.getContainer().appendChild(this.$el)
      } else if (this.$parent) {
        this.$parent.$el.appendChild(this.$el)
      }
    },

    onTouchstart (e) {
      this.pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    },

    onTouchmove (e) {
      const { pos } = this
      const dx = e.touches[0].clientX - pos.x
      const dy = e.touches[0].clientY - pos.y
      const direction = dy > 0 ? '10' : '01'
      const el = scrollUtils.getScrollEventTarget(e.target, this.$el)
      const {scrollHeight, offsetHeight, scrollTop} = el
      const isVertical = Math.abs(dx) < Math.abs(dy)

      let status = '11'

      /* istanbul ignore next */
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01'
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10'
      }

      if (
        status !== '11' &&
        isVertical &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    },

    open () {
      /* istanbul ignore next */
      if (this.$isServer) {
        return
      }

      // 如果属性中传入了`zIndex`，则覆盖`context`中对应的`zIndex`
      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex
      }

      if (this.lockOnScroll) {
        document.body.classList.add('wv-overflow-hidden')
        on(document, 'touchstart', this.onTouchstart)
        on(document, 'touchmove', this.onTouchmove)
      }

      this.renderMask()
      this.$emit('update:visible', true)
    },

    close () {
      if (this.lockOnScroll) {
        document.body.classList.remove('wv-overflow-hidden')
        off(document, 'touchstart', this.onTouchstart)
        off(document, 'touchmove', this.onTouchmove)
      }

      manager.close(this._popupId)
      this.$emit('update:visible', false)
    },

    renderMask () {
      if (this.mask) {
        manager.open(this, {
          zIndex: context.plusKey('zIndex'),
          className: this.maskClass,
          customStyle: this.maskStyle
        })
      } else {
        manager.close(this._popupId)
      }
      this.$el.style.zIndex = context.plusKey('zIndex')
    }
  },

  beforeDestroy () {
    this.close()
  }
}
