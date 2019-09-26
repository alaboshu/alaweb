<template>
  <view class="zk-list-select">
    <view class="content">
      <scroll-view style="width:100%;height: 100%;" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore" @scroll="scrollTopFun">
        <view class="fliter-content">
          <view class="fliter-item" :class="[tabIndex == 0 ? 'active-fliter-item' : '']" @click="tapTab(0)">
            <view class="fliter-item-name" v-text="param.SupermarketName"></view>
            <view class="fliter-item-icon"></view>
          </view>
          <view class="fliter-item" :class="[tabIndex == 1 ? 'active-fliter-item' : '']" @click="tapTab(1)">
            <view class="fliter-item-name" v-text="param.SortName"></view>
            <view class="fliter-item-icon"></view>
          </view>
          <view class="fliter-item" :class="[tabIndex == 2 ? 'active-fliter-item' : '']" @click="tapTab(2)">
            <view class="fliter-item-name" v-text="param.PriceName"></view>
            <view class="fliter-item-icon"></view>
          </view>
        </view>
        <view class="list-content">
          <nList :urls="goUrl" :list="widgetModel"></nList>
          <view class="uni-tab-bar-loading">
            <uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
          </view>
        </view>
      </scroll-view>
      <view class="fliter-dialog" v-show="dialog == 0">
        <view class="fliter-dialog-content">
          <view class="fliter-dialog-item" :class="{ active: param.SupermarketId == item.id }" v-for="(item, index) in tabNar[0].item" :key="index" @click="dialogTap('Supermarket', item)" v-text="item.value"></view>
        </view>
      </view>
      <view class="fliter-dialog" v-show="dialog == 1">
        <view class="fliter-dialog-content">
          <view class="fliter-dialog-item" :class="{ active: param.SortId == item.id }" v-for="(item, index) in tabNar[1].item" :key="index" @click="dialogTap('Sort', item)" v-text="item.value"></view>
        </view>
      </view>
      <view class="fliter-dialog" v-show="dialog == 2">
        <view class="fliter-dialog-content">
          <view class="fliter-dialog-item" :class="{ active: param.PriceId == item.id }" v-for="(item, index) in tabNar[2].item" :key="index" @click="dialogTap('Price', item)" v-text="item.value"></view>
        </view>
      </view>
      <view class="bg" v-show="bgShow" @click="clear"></view>
    </view>
  </view>
</template>

<script>
 
  import nList from './NewsList.vue'
  import uniLoadMore from './uni-load-more.vue'
  import dataJson from './data.json'
  import './var.scss'
  import './styles'

  export default {
    
    components: {
      nList,
      uniLoadMore
    },
    data () {
      return {
        widgetModel: {},
        scrollTop: 0,
        goUrl: '',
        top: 0,
        tabIndex: null,
        dialog: null,
        bgShow: false,
        loadingType: 2,
        loadingText: {
          contentdown: '上拉显示更多',
          contentrefresh: '正在加载...',
          contentnomore: '没有更多数据了'
        },
        param: {
          PSize: 20,
          PIndex: 1,
          SupermarketId: 1,
          SupermarketName: '',
          SortId: 1,
          SortName: '',
          PriceId: 1,
          PriceName: ''
        },
        tabNar: [
          {
            value: 'one',
            name: '超市',
            item: [
              { id: 1, value: '全部' },
              { id: 2, value: '利群' },
              { id: 3, value: '大润发' }
            ]
          },
          {
            value: 'two',
            name: '分类',
            item: [
              { id: 1, value: '全部' },
              { id: 2, value: '零食' },
              { id: 3, value: '生鲜' }
            ]
          },
          {
            value: 'three',
            name: '价格',
            item: [{ id: 1, value: '从高到低' }, { id: 2, value: '从低到高' }]
          }
        ]
      }
    },
    props: {
      widget: {}
    },
    onLoad () {
      let _this = this
      _this.param.SupermarketName = _this.tabNar[0].name
      _this.param.SortName = _this.tabNar[1].name
      _this.param.PriceName = _this.tabNar[2].name
      _this.init(_this.param)
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = dataJson
      },
      scrollTopFun (e) {
        let _this = this
        _this.top = e.detail.scrollTop
        _this.scrollTop = e.detail.scrollTop
      },
      loadMore (e) {
        let _this = this
        let list = _this.widgetModel
        _this.loadingType = 1
        setTimeout(() => {
          let li = {
            img: '../../static/logo.png',
            title: '幻灯' + e.timeStamp.toString(),
            info: '简介',
            another: '额外',
            id: e.timeStamp.toString()
          }
          list.push(li)
          _this.loadingType = 0
        }, 1200)
      },
      async tapTab (e) {
        let _this = this
        if (_this.tabIndex !== e) {
          _this.tabIndex = e
        }
        _this.dialog = e
        _this.bgShow = true
      },
      getDataList (e) {
        let _this = this
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            _this.scrollTop = _this.top
            uni.hideLoading()
            resolve(e)
          }, 2000)
        })
      },
      async dialogTap (e, o) {
        let _this = this
        uni.showLoading({
          title: '加载中'
        })

        await this.getDataList()
        _this.scrollTop = 0
        switch (e) {
          case 'Supermarket':
            _this.param.SupermarketId = o.id
            _this.param.SupermarketName = o.value
            break
          case 'Sort':
            _this.param.SortId = o.id
            _this.param.SortName = o.value
            break
          case 'Price':
            _this.param.PriceId = o.id
            _this.param.PriceName = o.value
            break
        }
        _this.tabIndex = null
        _this.bgShow = false
        _this.dialog = null
      },
      clear () {
        let _this = this
        _this.bgShow = false
        _this.dialog = null
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .content {
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #f2f2f5;
    .fliter-content {
      position: fixed;
      display: flex;
      width: 100%;
      align-items: center;
      background: #fff;
      padding: 10upx 0;
      border-bottom: 1upx solid #f2f2f5;
      z-index: 99;
      .fliter-item {
        border-right: 1upx solid #f2f2f5;
        color: #666;
        text-align: center;
        flex: 1;
        box-sizing: border-box;
        margin: 10upx 0;
        line-height: 1;
        .fliter-item-name {
          display: inline-block;
        }
        .fliter-item-icon {
          display: inline-block;
          border-top: 2upx solid;
          border-right: 2upx solid;
          width: 20upx;
          height: 20upx;
          border-color: #666;
          transform: rotate(-45deg);
          margin: 10upx auto auto 20upx;
        }
      }
      &:last-child {
        border-right: 1upx solid #fff;
      }
      .active-fliter-item {
        color: red;
        .fliter-item-icon {
          border-color: red;
          transform: rotate(135deg);
        }
      }
    }
    .list-content {
      padding-top: 67upx;
    }
    .fliter-dialog {
      position: fixed;
      top: 78upx;
      width: 100%;
      background: #fff;
      max-height: 70%;
      overflow-y: auto;
      z-index: 99;
      box-sizing: border-box;
      .fliter-dialog-content {
        padding: 20upx;
        box-sizing: border-box;
        .fliter-dialog-item {
          color: #666;
          padding: 10upx;
          border-bottom: 1upx solid #f2f2f5;
        }
        &:last-child {
          border-bottom: 1upx solid #fff;
        }
        .active {
          color: red;
        }
      }
    }
    .bg {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
  }
</style>
