<template>
  <div>
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search" />
          <input class="weui-search-bar__input" :placeholder="placeholder" :autofocus="autofocus" v-model="currentValue" ref="input">
          <div class="weui-icon-clear" @click="clear" />
        </div>
        <label class="weui-search-bar__label" @click="textClick" v-show="!isActive">
          <i class="weui-icon-search" />
          <span v-text="placeholder" />
        </label>
      </div>
      <div class="weui-search-bar__cancel-btn" @click="cancel" v-show="isActive" v-text="cancelText" />
    </div>

    <slot>
      <div class="weui-cells searchbar-result" v-show="show || currentValue">
        <x-cell v-for="(item, index) in result" :key="index" :title="typeof item === 'object' ? item[resultTextKey] : item" @click="$emit('click-result', item)" />
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'x-search',
    props: {
      value: String,
      autofocus: Boolean,
      show: Boolean,
      placeholder: {
        type: String,
        default: '搜索'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      resultTextKey: String,
      result: Array
    },
    data () {
      return {
        isActive: false,
        currentValue: this.value
      }
    },
    mounted () {
      if (this.autofocus) {
        this.isActive = true
      }
    },

    methods: {
      textClick () {
        // focus the input
        this.$refs.input.focus()
        this.isActive = true
      },

      // 清除输入
      clear () {
        this.currentValue = ''
      },

      // 取消搜索
      cancel () {
        this.clear()
        this.isActive = false
      }
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },

      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
<style lang="less" scoped>
  .weui-search-bar__label {
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
  }

  .weui-search-bar__cancel-btn {
    display: block;
  }

  .searchbar-result {
    display: block;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
    margin-top: 0;
    font-size: 14px;
  }
</style>
