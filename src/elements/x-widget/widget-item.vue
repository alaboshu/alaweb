<template>
  <view>
    <zk-article :widget="widget" v-if="widget.componentPath === '/articles/zk-article'"></zk-article>
    <zk-help :widget="widget" v-if="widget.componentPath === '/articles/zk-help'"></zk-help>
    <zk-marquee :widget="widget" v-if="widget.componentPath === '/articles/zk-marquee'"></zk-marquee>
    <zk-amount :widget="widget" v-if="widget.componentPath === '/assets/zk-amount'"></zk-amount>
    <zk-auto-form :widget="widget" v-if="widget.componentPath === '/common/zk-auto-form'"></zk-auto-form>
    <zk-bank-list :widget="widget" v-if="widget.componentPath === '/common/zk-bank-list'"></zk-bank-list>
    <zk-cell :widget="widget" v-if="widget.componentPath === '/common/zk-cell'"></zk-cell>
    <zk-grid :widget="widget" v-if="widget.componentPath === '/common/zk-grid'"></zk-grid>
    <zk-html :widget="widget" v-if="widget.componentPath === '/common/zk-html'"></zk-html>
    <zk-image-list :widget="widget" v-if="widget.componentPath === '/common/zk-image-list'"></zk-image-list>
    <zk-image :widget="widget" v-if="widget.componentPath === '/common/zk-image'"></zk-image>
    <zk-list :widget="widget" v-if="widget.componentPath === '/common/zk-list'"></zk-list>
    <zk-preview :widget="widget" v-if="widget.componentPath === '/common/zk-preview'"></zk-preview>
    <zk-swiper :widget="widget" v-if="widget.componentPath === '/common/zk-swiper'"></zk-swiper>
    <zk-tabbar :widget="widget" v-if="widget.componentPath === '/common/zk-tabbar'"></zk-tabbar>
    <zk-video :widget="widget" v-if="widget.componentPath === '/common/zk-video'"></zk-video>
    <zk-buy :widget="widget" v-if="widget.componentPath === '/order/zk-buy'"></zk-buy>
    <zk-cart :widget="widget" v-if="widget.componentPath === '/order/zk-cart'"></zk-cart>
    <zk-order-list :widget="widget" v-if="widget.componentPath === '/order/zk-order-list'"></zk-order-list>
    <zk-order-refund :widget="widget" v-if="widget.componentPath === '/order/zk-order-refund'"></zk-order-refund>
    <zk-order-show :widget="widget" v-if="widget.componentPath === '/order/zk-order-show'"></zk-order-show>
    <zk-product-class :widget="widget" v-if="widget.componentPath === '/product/zk-product-class'"></zk-product-class>
    <zk-product-list :widget="widget" v-if="widget.componentPath === '/product/zk-product-list'"></zk-product-list>
    <zk-product-listpage :widget="widget" v-if="widget.componentPath === '/product/zk-product-listpage'"></zk-product-listpage>
    <zk-product-showpage :widget="widget" v-if="widget.componentPath === '/product/zk-product-showpage'"></zk-product-showpage>
    <zk-product-image :widget="widget" v-if="widget.componentPath === '/product/zk-product-image'"></zk-product-image>
    <zk-address-edit :widget="widget" v-if="widget.componentPath === '/themes/zk-address-edit'"></zk-address-edit>
    <zk-head :widget="widget" v-if="widget.componentPath === '/themes/zk-head'"></zk-head>
    <zk-search :widget="widget" v-if="widget.componentPath === '/themes/zk-search'"></zk-search>
    <zk-login :widget="widget" v-if="widget.componentPath === '/user/zk-login'"></zk-login>
    <zk-logout :widget="widget" v-if="widget.componentPath === '/user/zk-logout'"></zk-logout>
    <zk-qrcode :widget="widget" v-if="widget.componentPath === '/user/zk-qrcode'"></zk-qrcode>
    <zk-reg :widget="widget" v-if="widget.componentPath === '/user/zk-reg'"></zk-reg>
    <zk-user-address :widget="widget" v-if="widget.componentPath === '/user/zk-user-address'"></zk-user-address>
    <zk-user-collect :widget="widget" v-if="widget.componentPath === '/user/zk-user-collect'"></zk-user-collect>
    <zk-user-info :widget="widget" v-if="widget.componentPath === '/user/zk-user-info'"></zk-user-info>
    <zk-user-service :widget="widget" v-if="widget.componentPath === '/user/zk-user-service'"></zk-user-service>
    <zk-user-top :widget="widget" v-if="widget.componentPath === '/user/zk-user-top'"></zk-user-top>
    <zk-usr-avator :widget="widget" v-if="widget.componentPath === '/user/zk-usr-avator'"></zk-usr-avator>
    <zk-user-reg :widget="widget" v-if="widget.componentPath === '/user/zk-user-reg'"></zk-user-reg>
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
