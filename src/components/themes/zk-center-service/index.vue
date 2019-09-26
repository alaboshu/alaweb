<template>
  <view class="zk-center-service">
    <view class="center-service_container">
      <!-- <view class="center-service_head">
        <x-icon name="zk-return" size="17"></x-icon>
        <span> 客户服务</span>
      </view> -->
      <view class="center-service_container_input" v-if="false">
        <i class="icon iconfont icon-zk-search"></i>
        <input class="head_search-input" ref="inputNew" type="text" placeholder="如何查询会员权益?">
      </view>
      <view class="center-service_grid">
        <view class="single-grid-container">
          <view class="inde-grid-box">
            <view class="grid-item" v-for="(item,index) in dataList" :key="index" @click="goLinks(item.links)">
              <view class="grid_img">
                <img :src="item.Image" alt="">
              </view>
              <p class="grid_info">{{item.name}}</p>
            </view>
          </view>
        </view>
      </view>
      <view class="center-service_list">
        <h3>常见问题</h3>
        <uni-collapse>
          <uni-collapse-item :title="item.relationName" :show-animation="true" v-for="(item,index) in widgetModel" :key="index">
            <view style="padding: 30upx;" v-for="(Citem,Cindex) in item.article" :key="Cindex" @click="goDetail(Citem.id)">
              {{Citem.title}}
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
      <view class="empty-box"></view>
      <view class="service-buttom_box" @click="customerService">
        <view class="service_btn">
          <span>电话客服 400-680-9088</span>
          <span>周一至周五 09:00 - 18:00</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'
  import uniCollapse from './uni-collapse'
  import uniCollapseItem from './uni-collapse-item'

  export default {
    
    data () {
      return {
        widgetModel: {},
        dataList: [
          {
            name: '商家服务',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239b.png',
            links: '/pages/index?path=articles_topline_show&id=5d0a17c23c71ab2338baa837'
          },
          {
            name: '订单服务',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239a.png',
            links: '/pages/index?path=articles_topline_show&id=5cfe193657d1ff2024866c0f'
          },
          {
            name: '供应链服务',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c72399.png',
            links: '/pages/index?path=articles_topline_show&id=5d0a18653c71ab2338baaa6d'
          },
          {
            name: '联系我们',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8e5bd36b9570878c7239c.png',
            links: '/pages/index?path=articles_topline_show&id=5cfe1ba557d1ff2024866cab'
          }
        ]
      }
    },
    components: {
      uniCollapse,
      uniCollapseItem
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var res = await this.$api.httpGet('/Api/Manual/GetManualListByRelation')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=articles_topline_show&id=' + id)
      },
      goLinks (url) {
        this.$api.to(url)
      },
      customerService () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      }
    }
  }
</script>
