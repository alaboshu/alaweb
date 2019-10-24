<template>
  <view v-if="async">
    <view class="x-msg " :style="'width:'+boxWidth+'px;height:'+boxHeight+'px;'" v-if="isDefaultMsg">
      <view class="default-msg">
        <view class="msg-icon">
          <i class="icon iconfont " :class="theme.icon" :style="'color:'+theme.color"></i>
        </view>
        <view class="msg-text-area">
          <view class="area-title">
            {{theme.title}}
          </view>
          <view class="area-desc" v-if="caption">
            {{caption}}
          </view>
        </view>
        <view class="msg-opr-area">
          <view class="btn-area">
            <view class="msg-btn" :style="'background:'+theme.color" @click="goReturn()">
              返回上一页
            </view>
            <view class="msg-btn btn_default" @click="goDefault()">
              返回首页
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        boxWidth: 0,
        boxHeight: 0,
        theme: {
          icon: 'icon-zk-testsu',
          title: '操作成功',
          color: '#34bfa3'
        },
        msg: {
          success: {
            icon: 'icon-zk-testsu',
            title: '操作成功',
            color: '#34bfa3'
          },
          fail: {
            icon: 'icon-zk-close',
            title: '操作失败',
            color: '#ff3b3b'
          },
          warn: {
            icon: 'icon-zk-warning',
            title: '温馨提示',
            color: '#ffb822'
          }
        },
        msgTitle: {
          success: '操作成功'
        },
        showHead: false,
        isDefaultMsg: false,
        isAdminMsg: false
      }
    },
    props: {
      type: {
        default: 'success'
      },
      caption: {
        default: ''
      },
      defaultMsgss: {
        default: true
      },
      adminMsg: {
        default: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      customer () {
        if (this.$api.client() === 'AppPlus') {
          /* eslint-disable */
          // var _this = this
          // plus.runtime.openURL('https://chat.meiqiapaas.com/dist/standalone.html?eid=145450', function (res) {
          //   _this.$api.toastWarn('跳转失败')
          // })
          var w = plus.webview.create('https://chat.meiqiapaas.com/dist/standalone.html?eid=145450');
          w.show(); // 显示窗口
        } else {
          uni.navigateTo({
            url: '/pages/vicePage/customerService'
          })
        }
      },
      goDefault () {
        uni.reLaunch({
          url: '/pages/default'
        })
      },
      goReturn () {
        uni.navigateBack({
          delta: 1
        })
      },
      codes () {
        uni.downloadFile({
          url: 'https://s-open.qiniuniu99.com/wwwroot/uploads/Core/2019/05/customerWechat.jpg',
          success: (res) => {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.showToast({
                  title: '保存成功',
                  icon: 'none'
                })
              },
              fail: function () {
                uni.showToast({
                  title: '保存失败，请稍后重试',
                  icon: 'none'
                })
              }
            })
          }
        })
      },
      init () {
        this.boxWidth = uni.getSystemInfoSync().screenWidth
        this.boxHeight = this.$api.screenHeight()
        if (this.type === 'success') {
          this.theme = this.msg.success
        } else if (this.type === 'fail') {
          this.theme = this.msg.fail
        } else if (this.type === 'warn') {
          this.theme = this.msg.warn
        }
        this.isDefaultMsg = this.defaultMsgss
        this.isAdminMsg = this.adminMsg
        this.async = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .x-msg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9987;
    padding-top: 36px;
    text-align: center;
    background: #ffffff;
    .default-msg,
    .admin-msg {
      width: 100%;
      height: 100%;

      .msg-text-area {
        margin-bottom: 5px;
      }
      .msg-customer {
        display: flex;
        flex-direction: column;
        align-items: center;
        .customer-title {
          font-weight: 600;
          color: #000;
          font-size: 18px;
        }
        img {
          width: 150px;
          height: 150px;
        }
        .customer-msg {
          margin-top: 10px;
          letter-spacing: 3px;
        }
      }
    }
    .msg-icon {
      i {
        font-size: 93px;
        color: #34bfa3;
      }
    }
    .msg-text-area {
      margin-bottom: 25px;
      padding: 0 20px;
      .area-title {
        margin-bottom: 5px;
        font-weight: 400;
        font-size: 20px;
      }
      .area-desc {
        font-size: 14px;
        color: #999999;
      }
    }
    .msg-opr-area {
      margin-bottom: 25px;
      .btn-area {
        margin: 15px 10px 10px 10px;
        .msg-btn {
          position: relative;
          display: block;
          margin-left: auto;
          margin-right: auto;
          padding-left: 14px;
          padding-right: 14px;
          box-sizing: border-box;
          font-size: 18px;
          text-align: center;
          text-decoration: none;
          color: #ffffff;
          line-height: 2.33333333;
          border-radius: 5px;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .msg-btn + .msg-btn {
          margin-top: 15px;
        }
        .btn_primary {
          background: #1aad19;
        }
        .btn_default {
          color: #000000;
          background-color: #f8f8f8;
        }
      }
    }
    .admin-msg-title {
      margin-top: 30px;
    }
    .admin-msg {
      .area-title {
        margin-top: 60px;
      }
      .msg-opr-area {
        .btn-area {
          .customer-btn {
            background: #c81432;
          }
        }
      }
    }
    .default-msg {
      .msg-icon {
        margin-bottom: 1px;
        margin-top: 5px;
      }
    }
  }
</style>
