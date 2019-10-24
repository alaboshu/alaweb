<template>
  <view class="x-form-label" id="x-form-label">
    <view class="list-cell-left-A">{{label}}</view>
    <view class="list-cell-right">
      {{viewModel}}
    </view>
  </view>
</template>
<script>
  import './var.scss'
  export default {
    model: {
      prop: 'dataModel'
    },
    props: {
      dataModel: {},
      label: {}
    },
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.viewModel = this.dataModel
      }
    }
  }
</script>
