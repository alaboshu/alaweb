<template>
  <x-component x-class="zk-product-item" :widget="widgetModel" v-if="widgetModel">
    <x-product-item :elementData="widgetModel.value"></x-product-item>
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

