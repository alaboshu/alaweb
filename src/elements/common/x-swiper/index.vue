<template>
  <div>
    <x-swipe class="demo-swipe" :height="180" :autoplay="4000">
      <x-swipe-item style="background-color: #f44336"/>
      <x-swipe-item style="background-color: #ffc107"/>
      <x-swipe-item style="background-color: #f44336;">
        <div class="tips">只有一张 :)</div>
      </x-swipe-item>
    </x-swipe>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped lang="less">

    .tips {
      display: flex;
      height: 100%;
      color: white;
      justify-content: center;
      align-items: center;
      img{
        width:100%;
        height:100%;
      }
    }
</style>
