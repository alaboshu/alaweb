<template>
  <scroll-view style="height:1000px" :scroll-y="scrollY" @scrolltolower="scrolltolower" :scroll-top="500">
    <slot :data="viewModel"></slot>
    <view class="x-sroll-loading" v-if="!moreItem">没有更多数据了……</view>
  </scroll-view>
</template>
<script>
  export default {
    data () {
      return {
        moreItem: true,
        viewModel: [],
        newViewModel: [],
        scrollY: false
      }
    },
    props: {
      widget: {},
      scrollHeight: {}
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$bus.$off('scrollYTrue').$on('scrollYTrue', (type) => {
          if (type) {
            this.scrollY = true
          } else {
            this.scrollY = false
          }
        })
      })
    },
    methods: {
      async init () {
        var widgetModel = await this.$api.isApiReqGet(this.widget)
        if (widgetModel.productItems === 0) {
          this.moreItem = false
        } else {
          if (this.viewModel.length === 0) {
            this.viewModel = widgetModel.productItems
          } else {
            this.viewModel = [...this.viewModel, ...widgetModel.productItems]
          }
          this.newViewModel = widgetModel.productItems
          if (this.newViewModel.length < 20) {
            this.moreItem = false
          }
        }
      },
      scrolltolower () {
        if (this.moreItem) {
          if (this.widget.value.loading) {
            if (this.widget.value.pageIndex === undefined) {
              this.widget.value.pageIndex = 1
            } else {
              this.widget.value.pageIndex += 1
            }
            this.init()
          }
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  .x-sroll-loading {
    padding: 10px 0;
    color: #666;
    text-align: center;
  }
</style>

