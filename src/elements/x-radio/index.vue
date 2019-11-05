<template>
  <view class="x-radio">
    <view class="x-raio-left">
    </view>
    <radio-group>
      <view class="x-radio-right">
        <label class="" v-for="(item, index) in items" :key="item.value">
          <radio :value="item.value" :checked="index === current" />
          <view>{{item.name}}</view>
        </label>
      </view>
    </radio-group>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        items: [{
          value: 'USA',
          name: '美国'
        }, {
          value: 'USA',
          name: '美国'
        }, {
          value: 'USA',
          name: '美国'
        }, {
          value: 'USA',
          name: '美国'
        }],
        current: 0
      }
    }
  }
</script>
