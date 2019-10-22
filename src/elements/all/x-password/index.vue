<template>
  <view class="x-password">
    <div class="x-input_label" v-if="label" :style="{color:colorIndex?'red':''}">{{label}}</div>
    <input class="uni-input" v-model="viewModel" type="password" />
    <!-- <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view> -->
  </view>
</template>

<script>
  import './var.scss'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
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
      init () {
        if (this.dataModel === null) {
          this.viewModel = ''
        } else {
          this.viewModel = this.dataModel
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          var rep = /^[0-9]*$/
          if (rep.test(val) === true) {
            if (this.viewModel.lenght === 6) {

            }
          }
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>
