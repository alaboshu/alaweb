<template>
  <div id="app" class="zk-lucky-wheel">
    <lucky-wheel></lucky-wheel>
  </div>
</template>

<script>
  import LuckyWheel from './components/luckywheel'

  export default {
    name: 'app',
    components: {
      LuckyWheel
    }
  }
</script>

<style>
  body {
    min-width: 320px;
    font-family: "PingFang SC", "STHeitiSC-Light", "Helvetica-Light", arial,
      sans-serif, "Droid Sans Fallback";
    font-size: 16px;
    /* height: 100%; */
    background: #fff;
  }
  div {
    box-sizing: border-box;
  }
  html {
    font-size: 14px;
  }
  @media screen and (min-width: 321px) and (max-width: 375px) {
    html {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 376px) and (max-width: 414px) {
    html {
      font-size: 18px;
    }
  }
  @media screen and (min-width: 415px) and (max-width: 639px) {
    html {
      font-size: 20px;
    }
  }
  @media screen and (min-width: 640px) and (max-width: 719px) {
    html {
      font-size: 24px;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 749px) {
    html {
      font-size: 28px;
    }
  }
  @media screen and (min-width: 750px) and (max-width: 799px) {
    html {
      font-size: 30px;
    }
  }
  @media screen and (min-width: 800px) {
    html {
      font-size: 48px;
    }
  }
</style>
