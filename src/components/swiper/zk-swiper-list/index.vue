<template>
  <view v-if="swiperModel">
    <swiper-item-1 v-if="swiperModel.swiperType == 1" :swiperModel="swiperModel.swiperList"></swiper-item-1>
    <swiper-item-2 v-if="swiperModel.swiperType == 2" :swiperModel="swiperModel.swiperList"></swiper-item-2>
  </view>
</template>

<script>
  import styleMix from './styles/style-mix'
  export default {
    mixins: [styleMix],
    props: {
      widget: {}
    },
    data () {
      return {
        swiperModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('this.vew', this.widget)
        if (this.widget && this.widget.value) {
          this.swiperModel = this.widget.value.swiperForm
        }
      }
    }
  }
</script>
