<template>
  <x-component x-class="zk-image-list" :widget="widgetModel" v-if="widgetModel">
    <x-image-list :elementData="widgetModel.value"></x-image-list>
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
        this.widgetModel = await this.$themeApi.widgetInfo(this.widget, editSetting.Config)
      }
    }
  }
</script>

