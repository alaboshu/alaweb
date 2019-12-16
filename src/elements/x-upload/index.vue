<template>
  <view class="x-upload-image">
    <view class="x-upload-image-title">
      <view>{{label}}</view>
      <view>{{uploadNum}}/{{countImage}}</view>
    </view>
    <upload-item v-model="viewModel" :count="count" ref="updateImage"></upload-item>
  </view>
</template>

<script>
  import uploadItem from './upload-item'
  export default {
    components: {
      uploadItem
    },
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    data () {
      return {
        viewModel: null,
        countImage: null,
        uploadNum: 0 // 已上传图片数量
      }
    },
    props: {
      dataModel: {},
      label: {},
      count: {
        type: Number,
        default: 1
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
        this.$nextTick(() => {
          this.countImage = this.$refs.updateImage.count
        })
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          if (this.countImage === 1) {
            if (this.viewModel) {
              this.uploadNum = 1
            }
          } else {
            this.uploadNum = this.viewModel.length
          }
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>
