
<template>
  <div class="diy-widget-wrap" :id="widget.widgetTheme" :style="widget.style && widget.style.css" :class="widget.borderClass+ ' '+ widget.blockList" @click.stop="handleCheck(widget)">
    <template v-if="widget.status !== 'small'">
      <div v-if="widget.border&&widget.border.name!=''">
        <div class="border-header" v-if="widget.border">
          <x-icon class="border-header-icon" v-if="widget.border.icon" :icon="widget.border.icon" :color="widget.border.fontColor" :size="14"></x-icon>
          <view class="border-header-title" :style="'color:'+widget.border.fontColor+'!important;'" v-if="widget.border.title">{{widget.border.title}}</view>
          <view class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</view>
          <view class="border-header-tools"></view>
        </div>
        <div class="border-body">
          <component :is="widget.name" :widget="widget" :title="widget.title" ref="moduleId" />
        </div>
      </div>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" ref="moduleId" />
    </template>
    <div v-else class="diy-widget-small">{{widget.title}}</div>
    <div class="diy-dottedbox" />
    <div class="redact-buttom" @click="editWidget(widget)">设置数据源</div>
    <div class="diy-masker" v-if="showChecked" />
    <div class="diy-widget-actions">
      <span class="diy-widget-actions-span" @click="testClick()">{{widget.title}}({{widget.name}})</span>
      <span class="diy-widget-actions-span" @click="switchWidget(widget)">切换</span>
      <span class="diy-widget-actions-span" @click="editWidget(widget)">编辑</span>
      <span class="diy-widget-actions-span" @click="removeWidget(widget,removeIndex)">删除</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showChecked: false,
        checkedWidgetIndex: -1
      }
    },
    props: {
      widget: {},
      removeIndex: {},
      testType: {}
    },
    mounted () {
      this.$nextTick(() => {
        this.$bus.$off('layoutItemCheck').$on('layoutItemCheck', (index) => {
          if (index === this.removeIndex) {
            this.showChecked = true
          } else {
            this.showChecked = false
          }
        })
      })
    },
    methods: {
      handleCheck (widget) {
        if (this.$refs.moduleId && this.$refs.moduleId.$el) {
          if (widget.style) {
            widget.style.styleId = this.$refs.moduleId.$el.id
          } else {
            widget.style = {
              styleId: this.$refs.moduleId.$el.id
            }
          }
        }
        let value = {
          widget: widget,
          index: this.removeIndex
        }
        this.$emit('handleCheck', value)
      },
      switchWidget (widget) {
        if (widget.status !== 'small') {
          this.$set(widget, 'status', 'small')
        } else {
          this.$set(widget, 'status', 'normal')
        }
      },
      removeWidget (widget, removeIndex) {
        let removeData = {
          widget: widget,
          removeIndex: removeIndex
        }
        this.$emit('removeWidget', removeData)
      },
      editWidget (widget) {
        this.$emit('editWidget', widget)
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .diy-new-block {
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #999;
  }

  .diy-widget-wrap {
    position: relative;
  }
  .diy-widget-wrap .checked {
    outline: 1px solid #ffcc66;
    background: #ffcc66;
  }
  .redact-buttom {
    font-size: 14px;
    background: #716aca;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    border-radius: 4px;
    padding: 8px 14px;
    cursor: pointer;
    display: none;
  }
  .diy-widget-wrap:hover .diy-dottedbox {
    display: block;
  }
  .diy-widget-wrap:hover .diy-widget-actions {
    display: block;
  }
  .diy-widget-wrap:hover .redact-buttom {
    display: block;
  }
  .diy-widget-small {
    line-height: 32px;
    background: #666;
    color: #fff;
    text-align: center;
  }
  .diy-masker {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(117, 177, 255, 0.3);
  }
  .diy-dottedbox {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1.5px dashed red;
  }
  .diy-widget-actions {
    display: none;
    background: #666;
    line-height: 16px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
  }
  .diy-widget-actions-span {
    display: inline-block;
    font-size: 10px;
    color: #fff;
    padding: 2px 5px;
    cursor: pointer;
  }
</style>
