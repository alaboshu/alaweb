<template>
  <view class="upload" v-if="viewModel">
    <view class="upload_img" v-for="(item, index) in viewModel.images" :key="index">
      <view class="upload_all" @click="listIndex = index">
        <img :src="apiBaseUrl+item" alt="">
        <view class="upload_delete" @click="deleteL(index)" v-if="index === listIndex&&inshow">删除</view>
      </view>
    </view>
    <view class="upload_add" @click="upload" v-if="inshow">
      <x-icon src="zk-add" class="zkAdd" name="zk-add"></x-icon>
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
    props: { viewModel: {}, inshow: {} },
    data () {
      return {
        title: 'choose/previewImage',
        imageList: [],
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],
        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图'],
        countIndex: 8,
        count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        imgList: [],
        apiBaseUrl: this.$api.baseUrl(),
        listIndex: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      },
      upload () {
        if (this.inshow) {
          var vueThis = this
          if (this.viewModel.images.length >= 5) {
            uni.showToast({
              icon: 'none',
              title: '最大上传五张'
            })
            return false
          }
          uni.chooseImage({
            sourceType: sourceType[this.sourceTypeIndex],
            sizeType: sizeType[this.sizeTypeIndex],
            count: 1,
            success: (res) => {
              this.imageList = this.imageList.concat(res.tempFilePaths)
              uni.uploadFile({
                url: this.apiBaseUrl + '/api/common/upload',
                filePath: res.tempFilePaths[0],
                fileType: 'image',
                name: 'data',
                success (res) {
                  vueThis.viewModel.images.push(JSON.parse(res.data).result.path)
                }
              })
            }
          })
        }
      },
      deleteL (index) {
        this.viewModel.images.splice(index, 1)
      }
    }
  }
</script>



<style lang="scss">
  .upload {
    display: flex;
    flex-wrap: wrap;
    .upload_img,
    .upload_add {
      position: relative;
      margin-right: 10px;
      margin-bottom: 5px;
      width: 60px;
      height: 60px;
      border-radius: 3px;
      border: 1px solid #e5e5e5;
      .zkAdd {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -15px;
        color: #e5e5e5;
      }
    }
    .upload_img {
      border: none;
      position: relative;
      .upload_all {
        display: flex;
        img {
          border-radius: 3px;
          width: 60px;
          height: 60px;
        }
      }
      .upload_delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 15px;
        background: #c81432;
        line-height: 15px;
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
