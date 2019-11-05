<template>
  <view>
    <radio value="r1" :checked="radioCheck" @click="radioClick()" />选中
  </view>
</template>
<script>
  export default {
    data () {
      return {
        defaultValue: null,
        radioCheck: false
      }
    },
    props: {
      value: {},
      list: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet(this.list.dataSource)
        this.defaultValue = this.value
        this.$emit('input', this.defaultValue)
      },
      radioClick () {
        this.radioCheck = !this.radioCheck
        if (this.radioClick === true) {
          this.defaultValue = this.value
        } else {
          this.defaultValue = null
        }
        this.$emit('input', this.defaultValue)
      }
    }
  }
</script>

