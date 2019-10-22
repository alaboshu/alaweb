<template>
  <div>
    <div class="box" v-if="column.type==='textbox'" x-verify="已验证">
      <x-input v-model="viewModel" :label="column.name" :value="viewModel" :placeholder="column.placeHolder" :clearable="true"></x-input>
    </div>
    <div class="box" v-if="column.type==='password'">
      <x-input v-model="viewModel" :label="column.name" :password="true" :placeHolder="column.placeHolder"></x-input>
    </div>
    <div class="box" v-if="column.type==='passwordnumber'">
      <x-input v-model="viewModel" :label="column.name" :password="true" :placeHolder="column.placeHolder"></x-input>
    </div>
    <div class="box" v-if="column.type==='json'">
      <x-city-picker v-model="viewModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="box" v-if="column.type==='region'">
      <x-city-picker v-model="viewModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="box" v-if="column.type==='imgupload'">
      <upload v-model="viewModel" :defaultValue="column.value" :size="column.options.size" :imgLength="column.options.length" :column="column"></upload>
    </div>
    <div class="box" v-if="column.type==='checkbox'">
      <check v-model="viewModel" :column="column"></check>
    </div>

    <div class="box" v-if="column.type==='passwordInput'">
      <x-input v-model="viewModel" :label="column.name" :password="true" :placeHolder="column.placeHolder"></x-input>
    </div>
    <div class="box" v-if="column.type==='select'">
      <form-picker v-model="viewModel" ref="mpvuePicker" :column="column" ></form-picker>
    </div>
    <div class="box" v-if="column.type==='phoneInput'">
      <x-input v-model="viewModel" :label="column.name" type="number" :placeHolder="column.options.placeholder"></x-input>
    </div>
    <div class="box" v-if="column.type==='radioButton'">
      <form-picker v-model="viewModel" ref="mpvuePicker" :column="column" ></form-picker>
    </div>
    <div class="box" v-if="column.type==='verification'">
      <verification ref="verification" v-model="viewModel" ></verification>
    </div>
    <div class="box" v-if="column.type==='textarea'">
      <view class="uni-textarea">
        <textarea v-model="viewModel" auto-height class="textarea" :placeholder="column.options.placeholder" />
        </view>
      </div>
      <div class="box" v-if="column.type==='number'">
      <x-input v-model="viewModel" :label="column.name"  type="number" :placeholder="column.placeHolder"  :clearable="true"></x-input>
    </div>
  </div>
</template>
<script>
  import upload from './form-item/upload'
  import check from './form-item/check'
  import formPicker from './form-item/picker'
  import verification from './form-item/verification'
  export default {
    components: {
      upload,
      verification,
      check,
      formPicker
    },
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      column: {},
      widget: {},
      value: {},
      dataModel: {}
    },
    data () {
      return {
        viewModel: this.value
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
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
<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
  .textarea {
    height: 80px !important;
  }
</style>
