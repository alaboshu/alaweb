<template>
  <view class="upload">
    <view class="upload_img" v-for="(item, index) in widgetModel.images" :key="index">
      <view class="upload_all" @click="listIndex = index">
        <img :src="apiBaseUrl+item" alt="">
        <view class="upload_delete" @click="deleteL(index)" v-if="index === listIndex">删除</view>
      </view>
    </view>
    <view class="upload_add" @click="upload">
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
    props: { widgetModel: {} },
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
        if (this.widgetModel.images == null) {
          this.widgetModel.images = []
        }
      },
      upload () {
        var vueThis = this
        if (this.widgetModel.images == null) {
          this.widgetModel.images = []
        }
        uni.chooseImage({
          sourceType: sourceType[this.sourceTypeIndex],
          sizeType: sizeType[this.sizeTypeIndex],
          count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
          success: (res) => {
            this.imageList = this.imageList.concat(res.tempFilePaths)
            uni.uploadFile({
              url: this.apiBaseUrl + '/api/common/upload',
              filePath: res.tempFilePaths[0],
              fileType: 'image',
              name: 'data',
              success (res) {
                vueThis.widgetModel.images.push(JSON.parse(res.data).result.path)
              }
            })
          }
        })
      },
      deleteL (index) {
        this.widgetModel.images.splice(index, 1)
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
      margin: 0 5px;
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
        background: red;
        line-height: 15px;
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
