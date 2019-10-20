<template>
  <div>
    <div class="box" v-if="list.type==='textbox'">
      <x-input v-model="formItemModel" :label="list.name" :placeholder="list.helpblock" :disabled="list.options.disabled" :clearable="true"></x-input>
    </div>
    <div class="box" v-if="list.type==='json'">
      <x-city-picker v-model="formItemModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="box" v-if="list.type==='region'">
      <x-city-picker v-model="formItemModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="box" v-if="list.type==='imgupload'">
      <upload v-model="formItemModel" :defaultValue="list.value" :size="list.options.size" :imgLength="list.options.length" :list="list"></upload>
    </div>
    <div class="box" v-if="list.type==='checkbox'">
      <check v-model="formItemModel" :list="list"></check>
    </div>
    <div class="box" v-if="list.type==='password'">
      <x-input v-model="formItemModel" :label="list.name" :password="true" :placeHolder="list.helpblock" :disabled="list.options.disabled"></x-input>
    </div>
    <div class="box" v-if="list.type==='passwordInput'">
      <x-input v-model="formItemModel" :label="list.name" :password="true" :placeHolder="list.helpblock" :disabled="list.options.disabled"></x-input>
    </div>
    <div class="box" v-if="list.type==='select'">
      <form-picker v-model="formItemModel" ref="mpvuePicker" :list="list" :widget="widget"></form-picker>
    </div>
    <div class="box" v-if="list.type==='phoneInput'">
      <x-input v-model="formItemModel" :label="list.name" type="number" :placeHolder="list.options.placeholder" :disabled="list.options.disabled" :readonly="list.options.readonly"></x-input>
    </div>
    <div class="box" v-if="list.type==='radioButton'">
      <form-picker v-model="formItemModel" ref="mpvuePicker" :list="list" :widget="widget"></form-picker>
    </div>
    <div class="box" v-if="list.type==='verification'">
      <verification ref="verification" v-model="formItemModel" :formModel="formModel" :config="config" :widget="widget"></verification>
    </div>
    <div class="box" v-if="list.type==='textarea'">
      <view class="uni-textarea">
        <textarea v-model="formItemModel" auto-height :disabled="list.options.disabled" class="textarea" :placeholder="list.options.placeholder" />
        </view>
      </div>
      <div class="box" v-if="list.type==='number'">
      <x-input v-model="formItemModel" :label="list.name"  type="number" :placeholder="list.helpblock" :disabled="list.options.disabled" :clearable="true"></x-input>
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
    props: {
      list: {},
      config: {},
      formModel: {},
      widget: {},
      value: {},
      model: {}
    },
    data () {
      return {
        formItemModel: this.value
      }
    },
    mounted () {
    },
    watch: {
      formItemModel (val) {
        if (this.$api.client() === 'AppPlus') {
          var model = {
            val: val,
            model: this.model
          }
          this.$emit('inputModel', model)
          if (this.list.type === 'phoneInput') {
            this.$api.vuexSet('phoneVerification', val)
            // this.$store.state.phoneVerification = val
          }
        } else {
          this.$emit('input', val)
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
