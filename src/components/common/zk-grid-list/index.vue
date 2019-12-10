<template>
  <view class="zk-grid-list" v-if="gridModel">
    <gridItem1 :widget="widget" :gridModel="gridModel"></gridItem1>
  </view>
</template>

<script>
  import gridItem1 from './styles/grid-item-1'
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
      gridItem1
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
