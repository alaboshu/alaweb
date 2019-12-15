<template>
  <view class="x-region">
    <view class="x-region-form">
      <view class="test">选择地址:</view>
      <view class="form-item" @click="$refs.cityPicker.show()">
        <text v-if="!widgetModel">请选择地址</text>
        <text v-else>{{widgetModel.label}}</text>
      </view>
    </view>
    <cityPicker ref="cityPicker" v-model="viewModel" @onConfirm="onConfirm" :model="410702"></cityPicker>
  </view>
</template>


<script>
  import cityPicker from './city-picker'
  export default {
    components: {
      cityPicker
    },
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {}
    },
    data () {
      return {
        viewModel: '410702',
        widgetModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.viewModel = this.dataModel
      },
      onConfirm (e) {
        this.widgetModel = e
        this.viewModel = e.cityCode
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }

  }
</script>


<style lang="scss" scoped>
  .x-region {
    width: 100%;
    .x-region-form {
      width: 100%;
      height: 40px;
      display: flex;
      .test {
        width: 80px;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
      }
      .form-item {
        flex-grow: 2;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        .cont {
          width: 100%;
          height: 100%;
          line-height: 40px;
        }
      }
    }
  }
</style>
