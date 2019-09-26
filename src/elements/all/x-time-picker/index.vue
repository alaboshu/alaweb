<template>
  <view class="uni-list-cell">
    <view class="uni-list-cell-left">
      当前选择
    </view>
    <view class="uni-list-cell-db">
      <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
        <view class="uni-input">{{date}}</view>
      </picker>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    },
    props: {
      value: {}
    },
    computed: {
      startDate () {
        return this.getDate('start')
      },
      endDate () {
        return this.getDate('end')
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.data = this.getDate({
          format: true
        })
      },
      bindDateChange: function (e) {
        this.date = e.target.value
        this.$emit('input', e.target.value)
      },
      getDate (type) {
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (type === 'start') {
          year = year - 60
        } else if (type === 'end') {
          year = year + 2
        }
        month = month > 9 ? month : '0' + month
        day = day > 9 ? day : '0' + day
        return `${year}-${month}-${day}`
      }
    }
  }
</script>
<style lang="scss" scoped>
  .uni-list-cell {
    display: flex;
    justify-content: center;
    .uni-input {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
