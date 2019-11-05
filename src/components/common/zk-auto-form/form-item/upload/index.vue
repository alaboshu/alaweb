<template>
  <view>
    <!-- <page-head :title="title"></page-head> -->
    <view class="uni-common-mt">
      <form>
        <view class="uni-list list-pd">
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">点击可预览选好的图片</view>
                <!-- <view class="uni-uploader-info">{{imageList.length}}/9</view> -->
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block v-for="(image,index) in imageList" :key="index">
                    <view class="uni-uploader__file">
                      <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" />
                    </view>
                  </block>
                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseImage"></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>
<script>
  import config from '@/service/config'
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
        defaultInfo: []
      }
    },
    props: {
      value: {},
      imgLength: {
        default: 1
      },
      list: {},
      defaultValue: {
        default: []
      }
    },
    onUnload () {
      this.imageList = []
      this.sourceTypeIndex = 2
      this.sourceType = ['拍照', '相册', '拍照或相册']
      this.sizeTypeIndex = 2
      this.sizeType = ['压缩', '原图', '压缩或原图']
      this.countIndex = 8
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.defaultInfo = this.$api.config().apiBaseUrl + this.defaultValue
        // this.imageList.concat(this.defaultInfo)
        this.imageList.push(this.defaultInfo)
      },
      sourceTypeChange: function (e) {
        this.sourceTypeIndex = e.target.value
      },
      sizeTypeChange: function (e) {
        this.sizeTypeIndex = e.target.value
      },
      countChange: function (e) {
        this.countIndex = e.target.value
      },
      chooseImage: async function () {
        if (this.imageList.length === this.imgLength) {
          await this.isFullImg()
        }
      },
      chooseImageOpen () {
        var vueThis = this
        uni.chooseImage({
          sourceType: sourceType[this.sourceTypeIndex],
          sizeType: sizeType[this.sizeTypeIndex],
          count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
          success: (res) => {
            this.imageList = this.imageList.concat(res.tempFilePaths)
            uni.uploadFile({
              url: config.apiBaseUrl + '/api/common/upload',
              filePath: res.tempFilePaths[0],
              fileType: 'image',
              name: 'data',
              success (res) {
                vueThis.imgList.push(JSON.parse(res.data).result.path)
                vueThis.$emit('input', vueThis.imgList[0])
              }
            })
          }
        })
      },
      isFullImg: function () {
        return new ((res) => {
          uni.showModal({
            content: '已经有' + this.imgLength + '张图片了,是否清空现有图片？',
            success: (e) => {
              if (e.confirm) {
                this.imageList = []
                // res(true)
                this.chooseImageOpen()
              } else {
                // res(false)
              }
            },
            fail: () => {
              // res(false)
            }
          })
        })()
      },
      previewImage: function (e) {
        var current = e.target.dataset.src
        uni.previewImage({
          current: current,
          urls: this.imageList
        })
      }
    }
  }
</script>

<style>
  .uni-list::before,
  .uni-list::after {
    height: 0;
  }
  .uni-uploader__input-box,
  .uni-uploader__file,
  .uni-uploader__img {
    border: 0.5px solid #d9d9d9;
    width: 70px !important;
    height: 70px !important;
  }
  .uni-uploader__input-box::after {
    height: 1px;
  }
  .uni-uploader__input-box::before {
    width: 1px;
  }
  .uni-uploader-title {
    font-size: 14px;
  }
</style>
