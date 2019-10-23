<template>
  <div :class="'border-header-'+ type" v-if="widget.border">
    <view class="border-header-title" v-if="widget.border.title">{{widget.border.title}}</view>
    <view class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</view>
    <x-icon class="border-header-icon" v-if="widget.border.icon" :icon="widget.border" :color="widget.border.icon.color"></x-icon>
  </div>
</template>

<script>
  import '@/assets/style/h5/index.scss'
  export default {
    props: {
      widget: {},
      type: {
        default: 1
      } // 样式风格两种默认为第一种
    }
  }
</script>


<style lang="scss">
  @import "@/assets/style/h5/index.scss";
  .border-header-1,
  .border-header-2 {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    text-align: left;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    .border-header-icon {
      vertical-align: middle;
      padding: 0 5px 0 0px;
    }
    .border-header-title {
      font-size: $gl-size-sm;
      letter-spacing: 2px;
      margin-right: 5px;
    }
    .border-header-desc {
      font-size: $gl-h7-size;
      color: $gl-text5;
    }
    .border-header-tools {
      font-size: $gl-h7-size;
    }
  }
  .border-header-2 {
    justify-content: center;
    .border-header-title {
      font-size: 18px;
      font-weight: 700;
    }
    .border-header-icon {
      i {
        font-size: 30px;
      }
    }
  }
</style>
