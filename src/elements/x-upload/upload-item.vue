<template>
  <view class="zk-update-image">
    <view class="zk-update-list" v-if="count == 1 && viewModel">
      <img :src="$api.baseUrl() + viewModel" alt="" class="update_image">
    </view>
    <view v-else-if="count > 1 && viewModel">
      <view class="zk-update-list" v-for="(item, index) in viewModel" :key="index">
        <img :src="$api.baseUrl() + item" alt="" class="update_image">
      </view>
    </view>

    <view class="zk-update" @click="updateImageCount" v-if="count== 1 && !viewModel">
      <uni-icon type="plusempty" size="60" color="#A3A3A3" class="uni_icon-list"></uni-icon>
    </view>
  </view>
</template>


<script>
  var sourceType = [
    ['camera'],
    ['album'],
    ['camera', 'album']
  ]
  var sizeType = [
    ['compressed'],
    ['original'],
    ['compressed', 'original']
  ]
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {
        default: null
      },
      count: {
        type: Number,
        default: 1
      } // 选择上传图片的数量，默认选择一张
    },
    data () {
      return {
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],
        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图'],
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        } else if (this.count > 1) {
          this.viewModel = []
        }
      },
      updateImage () {
        var vueThis = this
        uni.chooseImage({
          sourceType: sourceType[this.sourceTypeIndex],
          sizeType: sizeType[this.sizeTypeIndex],
          count: this.count,
          success: (res) => {
            uni.uploadFile({
              url: this.$base.clientUploadApi(),
              filePath: res.tempFilePaths[0],
              fileType: 'image',
              name: 'data',
              success (res) {
                if (vueThis.count === 1) {
                  vueThis.viewModel = JSON.parse(res.data).result.path
                } else {
                  vueThis.viewModel.push(JSON.parse(res.data).result.path)
                }
              }
            })
          }
        })
      },
      updateImageCount () {
        if (this.count > 1 && this.count === this.viewModel.length) {
          return uni.showToast({
            icon: 'none',
            title: `最多上传${this.count}张图片`
          })
        }
        this.updateImage()
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>


<style lang="scss">
  .zk-update-image {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .zk-update-list {
      width: 73px;
      height: 73px;
      border-radius: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      .update_image {
        width: 100%;
        height: 100%;
      }
    }
    .zk-update {
      width: 73px;
      height: 73px;
      border-radius: 2px;
      background: #ededed;
      position: relative;
      .uni_icon-list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
