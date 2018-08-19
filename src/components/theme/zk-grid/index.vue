<template>
  <x-component x-class="zk-grid" :widget="widgetModel" v-if="widgetModel">
    <x-grid :elementData="widgetModel.value" :col="col"></x-grid>
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
      widget: {},
      col: {
        default: 4
      }
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