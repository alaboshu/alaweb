<template>
  <div v-if="show">
    <div class="foot-box"></div>
    <uni-tabbar>
      <view :style="{ background: '#fff' }" class="uni-tabbar">
        <view class="uni-tabbar-border" />
        <view v-for="(item, index) in list" :key="index" class="new-uni-tabbar__item" @click="_switchTab(item, index)">
          <view class="new-uni-tabbar__bd">
            <view class="new-view-icon">
              <img v-if="index === tabIndex" :src="'/static/tabbar/' + item.imageGroup.selectImage + '.webp'" class="image" />
              <img v-else :src="'/static/tabbar/' + item.imageGroup.image + '.webp'" class="image" />
            </view>
            <view class="new-tabbar-title" style="color:#999;" :style="'color:' + viewModel.selectColor" v-if="tabIndex === index">
              {{ item.link.name }}
            </view>
            <view class="new-tabbar-title" style="color:#999;" :style="'color:' + viewModel.color" v-if="tabIndex !== index">
              {{ item.link.name }}
            </view>
          </view>
        </view>
      </view>
      <view class="uni-placeholder" />
    </uni-tabbar>
  </div>
</template>
<script>
  import './var.scss'
  import theme from '@/service/all/theme'
  export default {
    name: 'TabBar',
    props: {
      position: {
        default: 'bottom',
        validator (value) {
          return ['bottom', 'top'].indexOf(value) !== -1
        }
      },
      color: {
        type: String,
        default: '#999'
      },
      selectedColor: {
        type: String,
        default: '#007aff'
      },
      widget: {},
      show: {
        default: true
      }
    },
    data () {
      return {
        widgetModel: '',
        list: [],
        tabbarIndex: '/pages/tabbar/index',
        backgroundColor: '#ffffff',
        tabIndex: '',
        activeFooter: ''
      }
    },
    created () {
      if (this.$route) {
        this.tabbarIndex = this.$route.fullPath
        if (this.$route.fullPath === '/') {
          this.tabbarIndex = '/pages/tabbar/index'
        }
      } else {
        let path = '/' + getCurrentPages()[0].route
        if (getCurrentPages()[0].options.path) {
          this.tabbarIndex = path + '?path=' + getCurrentPages()[0].options.path
        } else {
          this.tabbarIndex = path
        }
      }
    },
    mounted () {
      var this_ = this
      setTimeout(() => {
        this_.init()
      }, 100)
      this.$nextTick(() => {
        this.$on('zkTabbarA', showData => { })
        this.$on('diyTab', data => {
          this.list = data.links
        })
      })
    },
    methods: {
      async init () {
        this.widgetModel = await theme.getAllPageList()
        this.viewModel = this.widgetModel.theme.tabBarSetting.tabbarForm
        if (this.viewModel !== '') {
          this.backgroundColor = this.widgetModel.theme.tabBarSetting.backGround
          this.list = this.widgetModel.theme.tabBarSetting.tabbarForm.links

          const pages = getCurrentPages()
          this.list.forEach((link, linkIndex) => {
            if (
              link.link.url === '/pages/tabbar/one' ||
              link.link.url === '/index'
            ) {
              this.tabIndex = 0
            } else if (!this.$api.isEmpty(pages[0].option)) {
              if (link.link.url === pages[0].option.path) {
                this.tabIndex = linkIndex
              }
            }
          })
        }
        this.preUrl()
      },
      async preUrl () {
        if (!this.$api.isEmpty(this.$api.localGet('preUrl'))) {
          this.activeFooter = this.$api.localGet('preUrl')
          this.$api.localRemove('preUrl')
          this.list.forEach((link, linkIndex) => {
            if (this.activeFooter === '/index') {
              this.tabIndex = 0
            } else if (link.url.value === this.activeFooter) {
              this.tabIndex = linkIndex
            }
          })
        }
      },
      async _switchTab (item, index) {
        this.$api.localSet('preUrl', item.url.value)
        if ((await this.$user.isLogin()) === false && item.url.value !== '/') {
          this.$api.to('/pages/user/login')
        } else {
          this.$refs.xIcon.forEach(icon => {
            icon.iconColor = '#999'
          })
          this.$refs.xIcon[index].iconColor = item.changecolor
          this.tabIndex = index
          let url = {
            path: item.url.value
          }
          this.$emit('tabbarUrl', url)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .uni-placeholder {
    height: 50px;
  }
  .uni-tabbar {
    z-index: 999;
    height: 50px;
    border-top: 1px solid #f7f7f7;
    display: flex;
    align-items: center;
    .view-icon {
      height: 20px;
    }
    .tabbar-title {
      font-size: 10px;
      line-height: 10px;
    }
    .new-uni-tabbar__item {
      flex: 1;
      width: 100%;
      height: 100%;
      justify-content: center;
      .new-uni-tabbar__bd {
        height: 96%;
        padding: 2% 0;
        .new-view-icon {
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          .x-icon {
            height: 25px;
            color: #999;
          }
        }
        // .view-icon-center {
        //   // width: 35px;
        //   // height: 35px;
        // }
        .new-tabbar-title {
          text-align: center;
          height: 25px;
          line-height: 25px;
          margin-top: -5px;
        }
      }
    }
  }
  .foot-box {
    height: 50px;
  }
  .image {
    width: 22px;
    height: 22px;
  }
</style>
