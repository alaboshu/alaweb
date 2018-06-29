<template>
  <div class="weui-grids">
    <slot />
  </div>
</template>



<script>
  export default {
    name: 'x-grid',
    props: {
      type: {
        default: 'default'
      },
      disabled: Boolean,
      mini: Boolean,
      plain: Boolean,
      text: String,
      showLoading: Boolean,
      link: [String, Object],
      gradients: {
        type: Array,
        validator: function (val) {
          return val.length === 2
        }
      },
      className: String
    },
    methods: {
      onClick () {
        this.$emit('click')
      }
    },
    computed: {
      noBorder () {
        return Array.isArray(this.gradients)
      },
      buttonStyle () {
        if (this.gradients) {
          return {
            background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
            color: '#FFFFFF'
          }
        }
      }
    }
  }
</script>


<style lang="less">
</style>
