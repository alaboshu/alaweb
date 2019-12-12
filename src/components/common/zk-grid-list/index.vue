<template>
  <view class="zk-grid-list" v-if="gridModel">
    <gridItem1 v-if="gridModel.gridType == 1" :gridModel="gridModel" :gridList="gridList"></gridItem1>
    <gridItem2 v-if="gridModel.gridType == 2" :gridModel="gridModel" :gridList="gridList"></gridItem2>
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
        gridModel: null,
        gridList: null
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
        if (this.gridModelgridList) {
          var data = []
          this.gridModelgridList.forEach(element => {
            if (element.isEnable) {
              data.push(element)
            }
          })
          this.gridList = data
        }
      }
    }
  }
</script>
