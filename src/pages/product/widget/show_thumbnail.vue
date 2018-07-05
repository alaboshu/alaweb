<template>
  <div class="zkweb-show_thumbnail">
    <x-swiper :height="bodyWidth"></x-swiper>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        bodyWidth: document.body.clientWidth
      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>
