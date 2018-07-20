<template>
  <div class="wv-navbar__item" @click="onClick" :class="{ 'wv-navbar__item_on': !$parent.animate && $parent.value === id, disabled: disabled,'wv-navbar__item_active':this.isSelected  }">
    <slot/>
  </div>
</template>
<script>
  export default {
    name: 'x-navbar-item',

    props: {
      id: Number,
      disabled: Boolean
    },
    computed: {
      isSelected () {
        return this.id === this.$parent.value
      },

      style () {
        return {
          borderWidth: this.$parent.lineWidth + 'px',
          borderColor: this.$parent.activeColor,
          color: this.isSelected ? this.$parent.activeColor : this.$parent.color
        }
      }
    },

    methods: {
      onClick () {
        if (this.disabled) return
        this.$parent.$emit('input', this.id)
      }
    }
  }
</script>

<style scoped lang="less">
 @import '~_style/index.less';
  .wv-navbar__item {
    position: relative;
    display: block;
    flex: 1;
    font-size: 15px;
    padding: 6px 0;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &.wv-navbar__item_on {
      border-bottom: 3px solid red;
    }
&.wv-navbar__item_active{
    background:#fff;
    color:@brand;
}
    &.disabled {
      color: #888 !important;
    }
  }
</style>
