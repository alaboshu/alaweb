<template>
  <view>
    <zk-article :widget="widget" v-if="widget.componentPath === '/articles/zk-article'"></zk-article>
    <zk-help :widget="widget" v-if="widget.componentPath === '/articles/zk-help'"></zk-help>
    <zk-marquee :widget="widget" v-if="widget.componentPath === '/articles/zk-marquee'"></zk-marquee>
    <zk-amount :widget="widget" v-if="widget.componentPath === '/finance/zk-amount'"></zk-amount>
    <zk-buy :widget="widget" v-if="widget.componentPath === '/order/zk-buy'"></zk-buy>
    <zk-cart :widget="widget" v-if="widget.componentPath === '/order/zk-cart'"></zk-cart>
    <zk-order-list :widget="widget" v-if="widget.componentPath === '/order/zk-order-list'"></zk-order-list>
    <zk-order-refund :widget="widget" v-if="widget.componentPath === '/order/zk-order-refund'"></zk-order-refund>
    <zk-order-show :widget="widget" v-if="widget.componentPath === '/order/zk-order-show'"></zk-order-show>
    <zk-product-class :widget="widget" v-if="widget.componentPath === '/product/zk-product-class'"></zk-product-class>
    <zk-product-list :widget="widget" v-if="widget.componentPath === '/product/zk-product-list'"></zk-product-list>
    <zk-product-listpage :widget="widget" v-if="widget.componentPath === '/product/zk-product-listpage'"></zk-product-listpage>
    <zk-product-showpage :widget="widget" v-if="widget.componentPath === '/product/zk-product-showpage'"></zk-product-showpage>
    <zk-auto-form :widget="widget" v-if="widget.componentPath === '/common/zk-auto-form'"></zk-auto-form>
    <zk-cell :widget="widget" v-if="widget.componentPath === '/common/zk-cell'"></zk-cell>
    <zk-grid :widget="widget" v-if="widget.componentPath === '/common/zk-grid'"></zk-grid>
    <zk-head :widget="widget" v-if="widget.componentPath === '/common/zk-head'"></zk-head>
    <zk-html :widget="widget" v-if="widget.componentPath === '/common/zk-html'"></zk-html>
    <zk-image-list :widget="widget" v-if="widget.componentPath === '/common/zk-image-list'"></zk-image-list>
    <zk-image :widget="widget" v-if="widget.componentPath === '/common/zk-image'"></zk-image>
    <zk-list :widget="widget" v-if="widget.componentPath === '/common/zk-list'"></zk-list>
    <zk-logout :widget="widget" v-if="widget.componentPath === '/common/zk-logout'"></zk-logout>
    <zk-preview :widget="widget" v-if="widget.componentPath === '/common/zk-preview'"></zk-preview>
    <zk-search :widget="widget" v-if="widget.componentPath === '/common/zk-search'"></zk-search>
    <zk-swiper :widget="widget" v-if="widget.componentPath === '/common/zk-swiper'"></zk-swiper>
    <zk-tabbar :widget="widget" v-if="widget.componentPath === '/common/zk-tabbar'"></zk-tabbar>
    <zk-video :widget="widget" v-if="widget.componentPath === '/common/zk-video'"></zk-video>
    <zk-login :widget="widget" v-if="widget.componentPath === '/user/zk-login'"></zk-login>
    <zk-qrcode :widget="widget" v-if="widget.componentPath === '/user/zk-qrcode'"></zk-qrcode>
    <zk-reg :widget="widget" v-if="widget.componentPath === '/user/zk-reg'"></zk-reg>
    <zk-user-top :widget="widget" v-if="widget.componentPath === '/user/zk-user-top'"></zk-user-top>
    <zk-user-info :widget="widget" v-if="widget.componentPath === '/user/zk-user-info'"></zk-user-info>
    <zk-swiper-list :widget="widget" v-if="widget.componentPath === '/swiper/zk-swiper-list'"></zk-swiper-list>
  </view>
</template>

<script>
  export default {
    name: 'widget-item',
    props: {
      widget: {},
      model: {}
    },
    methods: {
    }
  }
</script>
