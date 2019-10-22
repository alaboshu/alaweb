<template>
  <view class="x-select">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          当前选择
        </view>
        <view class="uni-list-cell-db">
          <picker :value="index" range-key="name" :mode="isMode?'multiSelector':'selector'" @columnchange="eventHandle" :range="viewModel">
            <view class="uni-input">{{array[index].name}}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import type from '@/service/api/type.api.js'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      type: {},
      apiUrl: {}, // Api网址，优先从Api中获取数据
      dataModel: {},
      // 是否启动多级联动， 默认为不启动
      isMode: {
        default: false
      }
    },
    data () {
      return {
        index: 1,
        keyValues: null,
        viewModel: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.keyValues === null) {
          this.keyValues = await type.getKeyValues(this.type, this.apiUrl)
        }
        console.info('this.keyValues', this.keyValues)
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
      },
      eventHandle (ev) {
        for (let i in this.array[ev.detail.column]) {
          if (Number(i) === Number(ev.detail.value)) {
            if (this.array.length > ev.detail.column) {
              if (this.array[ev.detail.column][i].array) {
                this.array.splice(ev.detail.column + 1, 1, this.array[ev.detail.column][i].array)
              } else {
                this.array.splice(ev.detail.column + 1, 1, '')
              }
            }
          }
        }
        // console.info('会不会触发啊', ev.detail.value, ev.detail)
      }
    }
  }
</script>
