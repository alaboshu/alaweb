<template>
  <div class="page">
    <x-swipe class="demo-swipe" :height="130" :autoplay="4000">
      <x-swipe-item style="background-color: #f44336"/>
      <x-swipe-item style="background-color: #ffc107"/>
      <x-swipe-item style="background-color: #03a9f4"/>
    </x-swipe>
    <x-swipe class="demo-swipe" :height="130" :show-indicators="false">
      <x-swipe-item style="background-color: #f44336;">
        <div class="tips">只有一张 :)</div>
      </x-swipe-item>
    </x-swipe>
  </div>
</template>

<style scoped lang="scss">
  .demo-swipe {
    margin-bottom: 50px;

    .tips {
      display: flex;
      height: 100%;
      color: white;
      justify-content: center;
      align-items: center;
    }
  }
</style>
