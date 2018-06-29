<template>
  <div class="page">
    <x-header title="头部"></x-header>
    <div class="page button js_show">
      <div class="page__hd">
        <h1 class="page__title">Button</h1>
        <p class="page__desc">按钮</p>
      </div>
      <div class="page__bd page__bd_spacing">

        <x-grid>
          <x-grid-item to="/baidu">
            <img src="" alt="" slot="icon">
            <span slot="label">x-grid-item</span>
          </x-grid-item>
          <x-grid-item to="/baidu">
            <img src="" alt="" slot="icon">
            <span slot="label">x-grid-item</span>
          </x-grid-item>
          <x-grid-item to="/baidu">
            <img src="" alt="" slot="icon">
            <span slot="label">x-grid-item</span>
          </x-grid-item>
          <x-grid-item to="/baidu">
            <img src="" alt="" slot="icon">
            <span slot="label">x-grid-item</span>
          </x-grid-item>
        </x-grid>
        <x-group title="Group+Cell">
          <x-cell title="cell标题" value="cell说明文字" to="/baidu"></x-cell>
        </x-group>
      </div>
    </div>
    <x-tabbar>
      <x-tabbar-item to="/baidu" isOn>
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" src="" slot="icon">
        </span>
        x-tabbar-item
      </x-tabbar-item>
      <x-tabbar-item to="/baidu">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" src="" slot="icon">
        </span>
        x-tabbar-item
      </x-tabbar-item>
      <x-tabbar-item to="/baidu">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" src="" slot="icon">
        </span>
        x-tabbar-item
      </x-tabbar-item>
      <x-tabbar-item to="/baidu">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img class="weui-tabbar__icon" src="" slot="icon">
        </span>
        x-tabbar-item
      </x-tabbar-item>
    </x-tabbar>
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
