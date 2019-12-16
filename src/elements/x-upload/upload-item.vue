<template>
  <view class="zk-update-image">
    <view v-if="count == 1 && viewModel" class="zk-update-list" @click="showImage=viewModel, isShowImage=true">
      <img :src="$api.baseUrl() + viewModel" alt="" class="update_image" />
    </view>
    <view v-show="count > 1 && viewModel" class="zk-update-list" @click="showImage=item, isShowImage=true" v-for="(item, index) in viewModel" :key="index">
      <img :src="$api.baseUrl() + item" alt="" class="update_image" />
    </view>
    <view class="show-delete" v-if="isShowImage" @click.stop="isShowImage = false">
      <img :src="$api.baseUrl() + showImage" class="show-image" alt="" srcset="">
      <x-icon name="icon-remove" size="18" color="#fff" class="uni_icon" @click.native="deleteImage"></x-icon>
    </view>
    <view class="zk-update" @click="updateImageCount">
      <x-icon name="icon-add" size="20" color="#A3A3A3" class="uni_icon-list"></x-icon>
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
        viewModel: null,
        isShowImage: false, // 是否查看图片
        showImage: null
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
              url: vueThis.$api.baseUrl() + '/api/StorageFile/upload',
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
      },
      // 删除图片
      deleteImage () {
        if (this.count > 1) {
          var imageIndex = this.viewModel.findIndex(r => r === this.showImage)
          this.viewModel.splice(imageIndex, 1)
        } else {
          this.viewModel = ''
        }
        this.showImage = ''
        this.isShowImage = false
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .zk-update-list {
      width: 73px;
      height: 73px;
      border-radius: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      .update_image {
        width: 100%;
        height: 100%;
      }
    }
    .show-delete {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 1);
      .uni_icon {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        height: 73px;
      }
      .show-image {
        position: absolute;
        top: 50%;
        transform: translate(0, -100%);
        width: 100%;
        height: 50%;
        margin-top: 40%;
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
