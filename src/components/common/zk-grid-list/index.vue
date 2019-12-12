<template>
  <view class="zk-grid-list" v-if="gridModel">
    <gridItem1 v-if="gridModel.gridType == 1" :widget="widget" :gridModel="gridModel"></gridItem1>
    <gridItem2 v-if="gridModel.gridType == 2" :gridModel="gridModel" :widget="widget"></gridItem2>
  </view>
</template>

<script>
  import gridItem1 from './styles/grid-item-1'
  import gridItem2 from './styles/grid-item-2'
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        gridModel: null
      }
    },
    components: {
      gridItem1,
      gridItem2
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.widget && this.widget.value) {
          this.gridModel = this.widget.value.gridForm
        }
      }
    }
  }
</script>
