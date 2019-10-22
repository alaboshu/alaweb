<template>
  <!-- <view class="x-select" v-if="viewModel"> -->
  <!-- <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          当前选择
        </view>
        <view class="uni-list-cell-db">
          <picker :value="index" range-key="name" mode="selector" :range="viewModel">
            <view class="uni-input">{{viewModel[index].name}}</view>
          </picker>
        </view>
      </view>
    </view> -->
  <!-- </view> -->
  <view class="x-select">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">当前选择</view>
        <view class="uni-list-cell-db">
          <picker :value="index" :range="keyValues" range-key="name" @change="changeValue">
            <view class="uni-input">{{viewModel}}</view>
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
      dataModel: {}
    },
    data () {
      return {
        index: 1,
        keyValues: null,
        viewModel: null
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
        if (this.dataModel && this.dataModel !== '00000000-0000-0000-0000-000000000000' && this.dataModel !== '000000000000000000000000') {
          if (this.viewModel.length > 0) {
            this.viewModel = this.viewModel[0].key
          }
        } else {
          this.viewModel = this.dataModel
        }
      },
      changeValue (ev) {
        for (let i in this.keyValues) {
          if (Number(i) === Number(ev.detail.value)) {
          }
        }
      }
    },
    watch: {
      viewText: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>
