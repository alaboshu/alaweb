<template>
  <view class="page-body" :style="'height:'+(height)+'px'" v-if="async">
    <scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop" scroll-with-animation v-if="!showkan">
      <view class="nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''" v-for="(item,index) in viewModel">
        {{item.name}}
      </view>
    </scroll-view>
    <scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation v-if="!showkan">
      <view v-for="(foods,index) in viewModel" :key="index" class="nav-right-box">
        <view class="nav-right-title">{{foods.name}}</view>
        <view class="nav-right-item" v-for="(item,i) in foods.childClass" :key="i" @click="cart(item.id)">
          <image :src="item.icon" />
          <view>{{item.name}}</view>
        </view>
      </view>
      <view style="height:399px;background: #F3F3F3;"></view>
    </scroll-view>
    <view v-if="showkan">
      <zk-search :productlist="viewModel" @chjian="chuan"></zk-search>
    </view>
  </view>
</template>

<script>
  // import classifyData from '../../common/classify.data.js'
  export default {
    data () {
      return {
        async: false,
        widgetModel: null,
        viewModel: null,
        showkan: false,
        name: 'wkiwi',
        height: 500,
        categoryActive: 0,
        scrollTop: 0,
        scrollLeftTop: 0,
        // scrollHeight: 0,
        arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672, 7017], // 初始值，后边计算会根据手机适配覆盖
        leftItemHeight: 51, // 49行会计算出新值进行覆盖
        navLeftHeight: 0, // 左边scroll-view 内层nav的总高度
        diff: 0, // 左边scroll-view 内层nav的总高度与视口之差
        tabBarHeight: 0, // 如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
        statusBarHeight: 0
      }
    },
    props: {
      widget: {}
    },
    onShow () {
    },
    onLoad: function () {

      // this.height = 600
    },
    mounted () {
      this.init().then(() => {
        var _this = this
        if (this.$api.client() === 'AppPlus') {
          let arr = [0]
          let top = 0
          this.viewModel.forEach((item) => {
            _this.leftItemHeight = 50
            // _this.leftItemHeight = Math.ceil(item.childClass.length / 3) * 50
            _this.diff = _this.navLeftHeight - _this.height
            top += 70 + (Math.ceil(item.childClass.length / 3) * 110)
            arr.push(top)
          })
          this.arr = arr
        } else {
          let selectorQuery = uni.createSelectorQuery()
          selectorQuery.selectAll('.nav-left-item').boundingClientRect(function (rects) {
            _this.leftItemHeight = rects[0].height
            // _this.navLeftHeight = _this.leftItemHeight * this.classifyData.length
            _this.diff = _this.navLeftHeight - _this.height
          })
          selectorQuery.selectAll('.nav-right-box').boundingClientRect(function (rects) {
            let arr = [0]
            let top = 0
            rects.forEach(function (rect) {
              // 					rect.id      // 节点的ID
              // 					rect.dataset // 节点的dataset
              // 					rect.left    // 节点的左边界坐标
              // 					rect.right   // 节点的右边界坐标
              // 					rect.top     // 节点的上边界坐标
              // 					rect.bottom  // 节点的下边界坐标
              // 					rect.width   // 节点的宽度
              // 					rect.height  // 节点的高度

              top += rect.height
              arr.push(top)
            })
            _this.arr = arr
          }).exec()
        }
      })
    },
    methods: {
      async init () {
        this.widget.apiUrl = '/api/product/class?id=1'
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.viewModel = this.widgetModel.value.result
        if (this.$api.client() === 'AppPlus') {
          if (this.$api.payType() === 4) {
            this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
            // this.height = this.$api.getSystemInfoSync().windowHeight
            console.info('1')
            this.height = '400'
          } else {
            this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
            // this.height = this.$api.getSystemInfoSync().windowHeight - 46 - this.statusBarHeight
            this.height = '400'
            console.info('2')
          }
        } else {
          this.height = this.$api.getSystemInfoSync().windowHeight - 46
          console.info('3', this.height)
        }
        this.async = true
      },
      scroll (e) {
        let _this = this
        if (this.timeoutId) {
          clearTimeout(this.timeoutId)
        }
        this.timeoutId = setTimeout(function () { // 节流
          _this.scrollHeight = e.detail.scrollTop + _this.height / 2
          for (let i = 0; i < _this.arr.length; i++) {
            let height1 = _this.arr[i]
            let height2 = _this.arr[i + 1]
            if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
              _this.categoryActive = i - 1;
              (_this.diff > 0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff) / (this.classifyData.length - 1)))
              return false
            }
          }
          _this.categoryActive = 0
          _this.timeoutId = undefined
        }, 10)
      },
      categoryClickMain (index) {
        this.categoryActive = index
        this.scrollTop = this.arr[index]
      },
      cart: function (id) {
        var url = '/pages/index?path=product_list&ClassIds=' + id
        this.$api.to(url)
      },
      onBlur () {
        this.showkan = true
      },
      chuan (res) {
        if (res !== '') {
          this.showkan = res
        }
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  .page-body {
    display: flex;
    background: #fff;
    overflow: hidden;
    .nav {
      display: flex;
      width: 100%;
    }

    .nav-left {
      width: 94px;
      background: #fafafa;
    }
    .nav-right-title {
      height: 50px;
      line-height: 50px;
      border-bottom: solid 1px #f1f1f1;
      font-size: 30upx;
      padding-left: 5px;
    }
    .nav-left-item {
      height: 50px;
      border-right: solid 1px #f1f1f1;
      border-bottom: solid 1px #f1f1f1;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-left-item:last-child {
      border-bottom: none;
    }
    .nav-right {
      width: 75%;
      // height: 100%;
      // padding-bottom: 300px;
    }
    .nav-right-box {
      display: block;
      overflow: hidden;
      border-bottom: 10px solid #f3f3f3;
    }
    .nav-right-box:last-child {
      border: none;
    }
    .nav-right-item {
      width: 28%;
      height: 110px;
      float: left;
      text-align: center;
      padding: 5px;
      font-size: 14px;
      background: #fff;
    }

    .nav-right-item {
      image {
        width: 75px;
        height: 75px;
      }
    }

    .active {
      color: #ff80ab;
      background: #fff;
      border-right: 0;
    }
    &::-webkit-scrollbar {
      /*取消小程序的默认导航条样式*/
      width: 0;
      height: 0;
      color: transparent;
    }
  }
</style>
