<template>
  <div class="page">
    <div class="page button js_show">
      <div class="page__hd">
        <h1 class="page__title">Button</h1>
        <p class="page__desc">按钮</p>
      </div>
      <div class="page__bd page__bd_spacing">
        <x-grid>阿斯顿发送到</x-grid>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pickerShow: false,
        pickerItems: [
          {
            values: [
              {
                name: 'Apple',
                price: 1.3
              },
              {
                name: 'Banana',
                price: 2.0
              },
              {
                name: 'Orange',
                price: 10
              },
              {
                name: 'Pear',
                price: 0.5
              }
            ]
          }
        ]
      }
    },
    mounted () {

    }
  }
</script>

<style scoped lang='less'>
</style>
