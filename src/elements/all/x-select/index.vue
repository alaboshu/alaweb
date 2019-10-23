<template>
  <view v-if="async" class="x-select" id="x-select">
    <view class="list-cell-left-A">{{label}}</view>
    <view class="list-cell-right">
      <picker :value="index" :range="keyValues" range-key="value" @change="changeValue">
        <view class="uni-input" :style="'width:'+ (windowData.windowWidth-150) +'px; height: 35'+'px'">{{viewText}}</view>
      </picker>
    </view>
  </view>
</template>
<script>
  import type from '@/service/api/type.api.js'
  import './var.scss'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      type: {},
      apiUrl: {}, // Api网址，优先从Api中获取数据
      dataModel: {},
      label: {}
    },
    data () {
      return {
        index: 1,
        keyValues: null,
        viewModel: null,
        viewText: '',
        windowData: null,
        async: false

      }
    },
    mounted () {
      this.init().then(() => {
        // 获取屏幕宽度
        this.windowData = uni.getSystemInfoSync()
        this.async = true
      })
    },
    methods: {
      async init () {
        if (this.keyValues === null) {
          this.keyValues = await type.getKeyValues(this.type, this.apiUrl)
        }
        if (!this.dataModel && this.dataModel !== '00000000-0000-0000-0000-000000000000' && this.dataModel !== '000000000000000000000000') {
          if (this.keyValues.length > 0) {
            this.viewModel = this.keyValues[0].key
          }
        } else {
          this.viewModel = this.dataModel
        }
        for (let i in this.keyValues) {
          if (this.keyValues[i].key !== this.viewModel) {
            this.viewText = this.keyValues[0].value
            this.viewModel = this.keyValues[0].key
          }
        }
      },
      changeValue (ev) {
        for (let i in this.keyValues) {
          if (Number(i) === Number(ev.detail.value)) {
            this.viewModel = this.keyValues[i].key
          }
        }
      },
      // 通过key来获取名字
      fromName () {
        for (let i in this.keyValues) {
          if (this.keyValues[i].key === this.viewModel) {
            this.viewText = this.keyValues[i].value
          }
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.fromName()
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>
