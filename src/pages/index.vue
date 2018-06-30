<template>
  <div class="page page-with-padding">
    <div class="buttons-big">
      <x-button type="primary">页面主要操作 Normal</x-button>
      <x-button type="primary" is-loading>页面主要操作 Loading</x-button>
      <x-button type="primary" disabled>页面主要操作 Disabled</x-button>
      <x-button type="default">页面次要操作 Normal</x-button>
      <x-button type="default" is-loading>页面次要操作 Loading</x-button>
      <x-button type="default" disabled>页面次要操作 Disabled</x-button>
      <x-button type="warn">警告类操作 Normal</x-button>
      <x-button type="warn" is-loading>警告类操作 Loading</x-button>
      <x-button type="warn" disabled>警告类操作 Disabled</x-button>
    </div>

    <div class="buttons-plain">
      <x-button type="default" :plain="true">按钮</x-button>
      <x-button type="default" :plain="true" disabled>按钮</x-button>
      <x-button type="primary" :plain="true">按钮</x-button>
      <x-button type="primary" :plain="true" disabled>按钮</x-button>
    </div>

    <div class="buttons-mini">
      <x-button type="primary" :mini="true">按钮</x-button>
      <x-button type="default" :mini="true">按钮</x-button>
      <x-button type="warn" :mini="true">按钮</x-button>
    </div>
  </div>
</template>

<style scoped>
  .buttons-big {
    display: block;
    margin: 10px auto;
  }
  .buttons-plain {
    display: block;
    width: 60%;
    margin: 10px auto;
  }
  .buttons-mini {
    display: block;
    width: 60%;
    margin: 10px auto;
  }
</style>
