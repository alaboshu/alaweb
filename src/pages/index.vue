<template>
  <div class="container">
    <x-picker :range="array">
      <button type="primary">x-picker</button>
    </x-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        array: ['美国', '中国', '巴西', '日本']
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>
