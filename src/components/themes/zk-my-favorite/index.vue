<template>
  <view class="zk-my-favorite">
    <view class="favorite_list" :style="'height:'+favoriteHeight+'px;'">
      <view class="collect-box" v-if="viewModel.length!=0">
        <ul>
          <li v-for="(item,index) in viewModel" :key="index">
            <view class="collect-box_left" :style="'height:'+favoriteWidth+'px;'+'width:'+favoriteWidth+'px;'" @click="getShow(item)">
              <image class="collect-box_left-img" :src="item.image" />
            </view>
            <view class="collect-box_right">
              <p class="right_p1" @click="getShow(item)">{{item.name}}</p>
              <!-- <p class="right_p2">52828已预售</p> -->
              <view class="discount-price">
                <!-- <view class="discount-price_left">
                  <p class="price_left-p1">市场销售价￥121525</p>
                  <p class="price_left-p2">折扣价<span>￥1960</span></p>
                </view>
                <view class="discount-price_right" @click="$api.to('/pages/index?path=order_cart')">
                  <x-icon name="icon-zk-cart" :color="'#c81432'" size="20"></x-icon>
                </view> -->
                <view class="discount-price_left">
                  收藏时间：<br />{{item.createTime}}
                </view>
                <view class="discount-price_right">
                  <view class="discount_datele" @click="getDatele(item)">移除</view>
                </view>
              </view>
            </view>
          </li>
        </ul>
      </view>
      <view v-if="viewModel.length==0" class="ck_img" :style="'height:'+favoriteHeight+'px;'">
        <div class="order-nodata">
          <div class="cirlce_nodata">
            <i class="icon iconfont zk-temporarily" size="72"></i>
          </div>
          <p>暂无数据</p>
        </div>
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
        favoriteHeight: '',
        favoriteWidth: '',
        viewModel: ''
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
        var infoHegiht = this.$api.getSystemInfoSync().windowHeight
        var infoWidth = this.$api.getSystemInfoSync().windowWidth
        if (this.$api.client() === 'WeChatLite') {
          this.favoriteHeight = infoHegiht - 50
        } else {
          this.favoriteHeight = infoHegiht - 95
        }
        this.favoriteWidth = infoWidth * (1 / 3)
        var para = {
          userId: this.$user.loginUser().id
        }
        var respone = await this.$api.httpGet('Api/Favorite/List', para)
        if (respone.status !== 1) {
          this.$api.toastWarn(respone.message)
          return
        }
        this.viewModel = respone.result
      },
      getShow (conter) {
        this.$api.to('/pages/index?path=product_show&id=' + conter.entityId)
      },
      async getDatele (dateValue) {
        var para = {
          userId: this.$user.loginUser().id,
          entityId: dateValue.entityId,
          product: 1
        }
        var repones = await this.$api.httpGet('Api/Favorite/Remove', para)
        if (repones.status === 1) {
          this.$api.toastSuccess('移除成功')
        } else {
          this.$api.toastWarn('移除失败！' + repones.status.errorMessages)
        }
        var this_ = this
        setTimeout(function () {
          this_.init()
        }, 1000)
      }
    }
  }
</script>
