<template>
  <selectPicker v-if="async" ref="mpvuePicker" v-model="pickerValue" :deepLength="list.options.deepLength" :pickerValueArray="pickerModel" :title="list.name" :pickerValueDefault="pickerDefault"></selectPicker>
</template>

<script>
  import selectPicker from './select-picker'
  export default {
    data () {
      return {
        async: false,
        listData: null,
        pickerValue: [],
        pickerModel: [],
        pickerDefault: [0]
      }
    },
    components: {
      selectPicker
    },
    props: {
      list: {},
      value: {},
      widget: {}
    },
    watch: {
      pickerValue (val) {
        this.$emit('input', val[0])
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // var para = {
        //   loginUserId: this.$user.loginUser().id
        // }
        let par = {}
        if (this.widget.route.path.indexOf('admin') !== -1) {
          par.isTenant = true
        }
        var response = await this.$api.httpGet(this.list.dataSource, par)
        // var response = await this.$api.httpGet('Api/Type/GetKeyValue?type=BankType')
        if (response.status === 1) {
          this.listData = response.result

          var _this = this
          this.listData.forEach((list, listIndex) => {
            let arr = {
              label: list.value,
              value: list.key
            }
            if (list.key === _this.value) {
              _this.pickerDefault.push(listIndex)
            }

            _this.pickerModel.push(arr)
          })

          this.$emit('input', _this.pickerModel[0].value)
          this.async = true
        }
      }
    }
  }
</script>

<style>
</style>
