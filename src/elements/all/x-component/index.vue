<template>
  <div :style="styles" :component-path="widgetModel.path" :data-id="widgetModel.dataId" :widget-id="widgetModel.widgetId">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'x-component',
    props: {
      widget: {}
    },
    data () {
      return {
        widgetModel: '',
        styles: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widget !== undefined) {
          this.widgetModel = this.widget
          // console.info('x-component', this.widgetModel)
        }
      }
    }
  }
</script>


