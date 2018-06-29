<template>
  <div>
    <div @click="visible = true">
      <slot></slot>
    </div>
    <transition
      enter-active-class="weui-animate-fade-in"
      leave-active-class="weui-animate-fade-out"
    >
      <div class="weui-mask" v-show="visible"/>
    </transition>
    <transition
      enter-active-class="weui-animate-slide-up"
      leave-active-class="weui-animate-slide-down"
    >
      <div class="weui-picker" v-show="visible">
        <div class="weui-picker__hd">
          <div
            class="weui-picker__action"
            @click="onCancel">取消</div>
          <div
            class="weui-picker__action"
            @click="onConfirm">确定</div>
        </div>
        <div class="weui-picker__bd" :style="pickerBodyStyle">
          <wv-picker-column
            v-for="(column, index) in [range]"
            :key="index"
            :options="column || []"
            :divider="column.divider"
            :content="column.content"
            :default-index="column.defaultIndex"
            :visible-item-count="visibleItemCount"
            @change="columnValueChange(index)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WvPickerColumn from './picker-column.vue'

// height of th option item
const ITEM_HEIGHT = 34

export default {
  name: 'wv-picker',
  components: {
    WvPickerColumn
  },
  props: {
    range: {
      type: Array,
      required: true
    },
    visibleItemCount: {
      type: Number,
      default: 7,
      validator: (value) => {
        return [3, 5, 7].indexOf(value) > -1
      }
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      children: [],
      currentSlots: [],
      currentValue: this.value
    }
  },
  computed: {
    columnCount () {
      return this.range.filter(column => !column.divider).length
    },
    pickerBodyStyle () {
      return {
        height: this.visibleItemCount * ITEM_HEIGHT + 'px'
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.currentColumns = this.range
    },
    columnValueChange (columnIndex) {
      this.currentValue = this.getValues()
      this.$emit('change', this, this.getValues(), columnIndex)
    },
    getColumn (columnIndex) {
      let children = this.children
      return children.find((child, index) => {
        return (child.$options.name === 'wv-picker-column' && !child.divider && index === columnIndex)
      })
    },
    getColumnValue (columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentValue
    },
    setColumnValue (columnIndex, value) {
      const column = this.getColumn(columnIndex)
      column && column.setValue(value)
    },
    getColumnValues (columnIndex) {
      return (this.currentColumns[columnIndex] || {}).values
    },
    setColumnValues (columnIndex, values) {
      const column = this.currentColumns[columnIndex]
      if (column) {
        column.values = values
      }
    },
    getValues () {
      return this.children.map(child => child.currentValue)
    },
    setValues (values) {
      if (this.columnCount !== values.length) {
        throw new Error('Length values is not equal to range count.')
      }
      values.forEach((value, index) => {
        this.setColumnValue(index, value)
      })
    },
    getColumnIndex (columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex
    },
    setColumnIndex (columnIndex, index) {
      const column = this.getColumn(columnIndex)
      column && column.setIndex(index)
    },
    getIndexes () {
      return this.children.map(child => child.currentIndex)
    },
    setIndexes (indexes) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex)
      })
    },
    onCancel () {
      this.visible = false
      this.$emit('cancel', this)
      this.$emit('update:visible', false)
    },
    onConfirm () {
      this.visible = false
      this.$emit('confirm', this)
      this.$emit('update:visible', false)
    }
  },
  watch: {
    value (val) {
      this.setValues(val)
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
  .weui-picker {
    transform: none;
  }
</style>
