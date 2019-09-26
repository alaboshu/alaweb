<template>
  <view class="zk-book-my">
    <view class="book_container_all">
      <view class="book_top_all">
        <view class="book_top">
          <!-- <view :widget="cur" >
            <x-icon name="zk-return" size="18"></x-icon>
          </view> -->
          <view class="book_name">我的</view>
        </view>
        <view class="book_bottom">
          <view class="book_bottom_left">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3523617831,1288544462&fm=27&gp=0.jpg" alt="" srcset="">
          </view>
          <view class="book_bottom_right">
            <view class="user_name">微信名称 ( 微信授权登录 ) </view>
            <view class="user_acount">微信账户</view>
          </view>
        </view>
      </view>
      <view class="book_list_content">
        <view class="book_content">
          <view class="book_content_item" v-for="(item,index) in list" :key="index">
            <view class="content_item_left">
              <img :src="item.thumbnailUrl">
            </view>
            <view class="content_item_right">
              <view class="book_name">{{item.productName}}</view>
              <view class="book_detail">简介：{{item.productName}}</view>
              <view class="book_link">链接：https://www.cnblogs.com/xiaosuibu/p/8196067.html</view>
              <span style="font-size:13px;color:#666">数量：{{item.productAmount}}</span>
              <view class="copy_links" @click="getIndex(index)"><span :class="Nindex===index? 'active_copy_links' :''">复制链接</span></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        Nindex: '',
        contentList: [],
        list: [],
        cur: 0
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var UserId = this.$user.id()
        var res = await this.$api.httpGet(`/Api/MerchantOrder/BuyOrderList?${UserId}`)
        if (res.status === 1) {
          this.widgetModel = res.result
        }

        for (var i = 0; i < this.widgetModel.length; i++) {
          if (this.widgetModel[i].orderType === 1) {
            this.contentList.push(this.widgetModel[i].products)
          }
        }
        for (var i = 0; i < this.contentList.length; i++) {
          for (var j = 0; j < this.contentList[i].length; j++) {
            this.list.push(this.contentList[i][j])
          }
        }
      },
      getIndex (index) {
        this.Nindex = index
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
  .swiper {
    display: none !important;
  }
</style>
