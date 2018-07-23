<template>
  <div class="wv-navbar" :style="style">
    <slot />
    <div class="wv-navbar-underline" v-if="animate" :style="lineStyle" />
  </div>
</template>

<script>
  export default {
    name: 'x-navbar',

    props: {
      fixed: Boolean,
      color: {
        type: String,
        default: '#333'
      },
      backgroundColor: {
        type: String,
        default: '#fff'
      },
      activeColor: {
        type: String,
        default: '#2196f3'
      },
      disabledColor: {
        type: String,
        default: '#cfcfcf'
      },
      lineWidth: {
        type: Number,
        default: 2
      },
      animate: {
        type: Boolean,
        default: true
      },
      value: {}
    },

    data () {
      return {
        childrenCount: 0,
        currentIndex: 0
      }
    },

    computed: {
      style () {
        let ret = {
          position: this.fixed ? 'fixed' : 'absolute',
          backgroundColor: this.backgroundColor
        }
        if (this.fixed) {
          ret.top = 0
          ret.left = 0
          ret.right = 0
        }
        return ret
      },

      lineStyle () {
        const itemWidthPercentage = 1 / this.childrenCount * 100
        return {
          backgroundColor: this.activeColor,
          left: itemWidthPercentage * this.currentIndex + '%',
          width: itemWidthPercentage + '%',
          height: this.lineWidth + 'px'
        }
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.childrenCount = this.$children.length
        this.updateCurrentIndex()
      })
    },

    methods: {
      updateCurrentIndex () {
        this.$children.forEach((child, index) => {
          if (child.id === this.value) {
            this.currentIndex = index
          }
        })
      }
    },

    watch: {
      value (val) {
        this.$emit('change', val)
        this.updateCurrentIndex()
      }
    }
  }
</script>

<style scoped lang="less">
  .wv-navbar {
    display: flex;
    width: 100%;
    z-index: 5000;
    background-color: #fff;
    position: relative;

    .wv-navbar-underline {
      display: block;
      position: absolute;
      bottom: 0;
      z-index: 100;
      transition: all 400ms cubic-bezier(0.3, 0, 0.79, 1.28);
    }
  }
</style>
