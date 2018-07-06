<template>
  <div class="zkweb-product-show">
    <show-thumbnail></show-thumbnail>
    <show-title></show-title>
    <show-parameter></show-parameter>
    <show-Intro></show-Intro>
    <show-recommend></show-recommend>
    <!-- <show-bar></show-bar> -->
  </div>
</template>

<script>
  import ShowThumbnail from './widget/show_thumbnail'
  import ShowTitle from './widget/show_title'
  import ShowParameter from './widget/show_parameter'
  import ShowIntro from './widget/show_intro'
  import ShowRecommend from './widget/show_recommend'
  import ShowBar from './widget/show_bar'
  export default {
    components: {
      ShowThumbnail,
      ShowTitle,
      ShowParameter,
      ShowIntro,
      ShowRecommend,
      ShowBar
    }
  }
</script>
<style lang="less">
</style>

