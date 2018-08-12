<template>
  <x-component class="zk-swiper" :widget="widgetModel" v-if="widgetModel">
    <x-swiper :elementData="widgetModel.value"></x-swiper>
  </x-component>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$themeApi.widgetInfo(this.widget, editSetting.configs)
      }
    }
  }
</script>

