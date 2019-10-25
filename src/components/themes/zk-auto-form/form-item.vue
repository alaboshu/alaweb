<template>
  <div v-if="async">
    <div class="boxItem" v-if="column.type==='textbox'" x-verify="已验证">
      <x-input v-model="viewModel" :label="column.name" :value="viewModel" :placeholder="column.placeHolder" :clearable="true"></x-input>
    </div>
    <div class="boxItem" v-if="column.type==='label'" x-verify="已验证">
      <x-form-label v-model="viewModel" :label="column.name"></x-form-label>
    </div>
    <div class="boxItem" v-if="column.type==='dropdownlist'" x-verify="已验证">
      <x-select v-model="viewModel" :label="column.name" :placeholder="column.placeHolder" :apiUrl="column.dataSource"></x-select>
    </div>
    <div class="boxItem" v-if="column.type==='decimal'" x-verify="已验证">
      <x-input v-model="viewModel" :label="column.name" :value="viewModel" :placeholder="column.placeHolder" :clearable="true"></x-input>
    </div>
    <!-- <div class="boxItem" v-if="column.type==='radiobutton'" x-verify="已验证">
      <x-radio v-model="viewModel" :label="column.name" :placeholder="column.placeHolder" :apiUrl="column.dataSource"></x-radio>
    </div> -->
    <div class="boxItem" v-if="column.type==='password'" x-verify="已验证">
      <x-password v-model="viewModel" :label="column.name" :placeHolder="column.placeHolder"></x-password>
    </div>
    <div class="boxItem" v-if="column.type==='passwordnumber'" x-verify="已验证">
      <x-password v-model="viewModel" :label="column.name" :isNum="true" :placeHolder="column.placeHolder"></x-password>
    </div>
    <div class="boxItem" v-if="column.type==='phoneverifiy'" x-verify="已验证">
      <x-phone-verifiy ref="verification" v-model="viewModel"></x-phone-verifiy>
    </div>

    <div class="boxItem" v-if="column.type==='json'">
      <x-city-picker v-model="viewModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="boxItem" v-if="column.type==='region'">
      <x-city-picker v-model="viewModel" ref="cityPicker" title="cityPicker"></x-city-picker>
    </div>
    <div class="boxItem" v-if="column.type==='imgupload'">
      <upload v-model="viewModel" :defaultValue="column.value" :size="column.options.size" :imgLength="column.options.length" :column="column"></upload>
    </div>
    <div class="boxItem" v-if="column.type==='checkbox'">
      <check v-model="viewModel" :column="column"></check>
    </div>

    <div class="boxItem" v-if="column.type==='passwordInput'">
      <x-input v-model="viewModel" :label="column.name" :password="true" :placeHolder="column.placeHolder"></x-input>
    </div>
    <div class="boxItem" v-if="column.type==='select'">
      <form-picker v-model="viewModel" ref="mpvuePicker" :column="column"></form-picker>
    </div>
    <div class="boxItem" v-if="column.type==='phoneInput'">
      <x-input v-model="viewModel" :label="column.name" type="number" :placeHolder="column.options.placeholder"></x-input>
    </div>
    <div class="boxItem" v-if="column.type==='radioButton'">
      <form-picker v-model="viewModel" ref="mpvuePicker" :column="column"></form-picker>
    </div>

    <div class="boxItem" v-if="column.type==='phone'">
      <x-input v-model="viewModel" :label="column.name" :value="viewModel" :placeholder="column.placeHolder" :clearable="true"></x-input>
    </div>
    <div class="boxItem" v-if="column.type==='textarea'">
      <view class="uni-textarea">
        <textarea v-model="viewModel" auto-height class="textarea" :placeholder="column.placeHolder" />
        </view>
    </div>
  </div>
</template>
<script>
  import upload from './form-item/upload'
  import check from './form-item/check'
  import formPicker from './form-item/picker'
  export default {
    components: {
      upload,
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
        viewModel: this.value,
        async: false
      }
    },
    mounted () {
      this.init().then(() => {
        this.async = true
      })
    },
    methods: {
      async init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
      },
      // 处理验证码，将当前表单的手机号传入到手机验证码中
      watcthPhoneVerfity () {
        console.info('this.$refs.verification', this.$refs.verification)
        this.$nextTick(() => {
          if (this.$refs.verification) {
            console.info('x-item', this.viewModel, this.column)
          }
        })
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.watcthPhoneVerfity()
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
