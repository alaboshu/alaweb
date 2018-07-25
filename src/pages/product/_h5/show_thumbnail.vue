<template>
  <div class="">
    <x-swipe class="demo-swipe" :height="height" :autoplay="4000">
      <!-- <x-swipe-item v-for="(item,index) in elementData" :key="index">
        <div class="tips">
          <img :src="item.Image" alt="">
        </div>
      </x-swipe-item> -->
      <x-swipe-item style="background-color: #f44336" />
      <x-swipe-item style="background-color: #ffc107" />
      <x-swipe-item style="background-color: #03a9f4" />
    </x-swipe>
  </div>
</template>
<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 180
      },
      elementData: {
        type: Array
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
  .tips {
    display: flex;
    height: 100%;
    color: white;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
