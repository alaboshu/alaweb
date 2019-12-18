<template>
  <view class="zk-usr-avator">
    <view class="modify">
      <view class="zk-user-mone" @click="isShowModify = !isShowModify">
        <x-icon name=" icon-classify" color="#fff" size="20"></x-icon>
      </view>
      <view class="show-modify" @click.stop="isShowModify = false" v-if="isShowModify">
        <view class="ul">
          <view class="list" @click="selectImage('album')">从手机相册选择</view>
          <view class="list" @click="selectImage('camera')">拍照</view>
          <view class="list" @click="saveImage">保存到手机</view>
          <view class="buttom" @click="isShowModify = false">取消</view>
        </view>
      </view>
    </view>
    <view class="avator">
      <img :src="avatorImage" class="image" alt="">
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        isShowModify: false,
        avatorImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2394972844,3024358326&fm=26&gp=0.jpg'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var userData = this.$user.loginUser()
        if (userData.avator) {
          this.avatorImage = userData.avator
        }
        console.info('userData', userData.avator)
      },
      // 保存到手机
      saveImage () {
        uni.downloadFile({
          url: this.avatorImage,
          complete: (res) => {
            if (res.statusCode === 200) {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                complete: (all) => {
                  console.info('bbbbbbbbbbbbbbb', all)
                }
              })
            }
          }
        })
      },
      // 上传头像的方式
      selectImage (type) {
        var _this = this
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: [type],
          complete: async res => {
            uni.uploadFile({
              url: _this.$api.baseUrl() + '/api/StorageFile/upload',
              filePath: res.tempFilePaths[0],
              fileType: 'image',
              name: 'data',
              complete: resImage => {
                if (resImage.statusCode === 200) {
                  var response = JSON.parse(resImage.data)
                  console.info('resposne', response)
                  if (response.status === 1) {
                    _this.avatorImage = _this.$api.baseUrl() + response.result.path
                    console.info('aaaaaaaaaaaaaa', response.result.path)
                  }
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zk-usr-avator {
    width: 100%;
    height: 100px;
    .zk-user-mone {
      width: 20px;
      height: 20px;
      position: fixed;
      right: 10px;
      top: 10px;
      z-index: 9999999;
      .x-icon {
        height: 20px;
      }
    }
    .show-modify {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.5);
      .ul {
        width: 100%;
        min-height: 100px;
        position: absolute;
        bottom: 0;
        border-radius: 10px 10px 0 0;
        background: #ededed;
        .list,
        .buttom {
          background: #ffffff;
          width: 100%;
          height: 45px;
          text-align: center;
          line-height: 45px;
          border-bottom: 1px solid #f7f7f7;
          &.buttom {
            margin-top: 10px;
            border: none;
          }
        }
        .list:first-child {
          border-radius: 10px 10px 0 0;
        }
      }
    }

    .avator {
      width: 100%;
      height: 100%;
      position: fixed;
      background: #000;
      left: 0;
      .image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 40%;
      }
    }
  }
</style>
