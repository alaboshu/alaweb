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
            _this.diff = _this.navLeftHeight - _this.height
            top += 70 + (Math.ceil(item.childClass.length / 3) * 110)
            arr.push(top)
          })
          this.arr = arr
        } else {
          let selectorQuery = uni.createSelectorQuery()
          selectorQuery.selectAll('.nav-left-item').boundingClientRect(function (rects) {
            if (rects.length > 0) {
              _this.leftItemHeight = rects[0].height
            }
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
        if (this.widgetModel && this.widgetModel.value) {
          this.viewModel = this.widgetModel.value.result
        }
        if (this.$api.client() === 'AppPlus') {
          if (this.$api.payType() === 4) {
            this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
            // this.height = this.$api.getSystemInfoSync().windowHeight
            this.height = '400'
          } else {
            this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
            // this.height = this.$api.getSystemInfoSync().windowHeight - 46 - this.statusBarHeight
            this.height = '400'
          }
        } else {
          this.height = this.$api.getSystemInfoSync().windowHeight - 46
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
  @import "./style.scss";
</style>
