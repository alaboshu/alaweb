<template>
  <div class="zk-swiper" :style="styles" :component-path="widgetModel.path" v-if="widgetModel" :data-id="widgetModel.dataId" :widget-id="widgetModel.widgetId">
    <x-swiper :elementData="widgetModel.value"></x-swiper>
  </div>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        widgetModel: '',
        styles: {}
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

