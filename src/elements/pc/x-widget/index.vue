<template>
  <div v-if="viewModel">
    <div v-for="(widget,index) in viewModel" :key="index">
	    <zk-address :widget="widget" v-if="widget.componentPath === 'core/zk-address'"></zk-address>
	    <zk-audio :widget="widget" v-if="widget.componentPath === 'core/zk-audio'"></zk-audio>
	    <zk-auto-form :widget="widget" v-if="widget.componentPath === 'core/zk-auto-form'"></zk-auto-form>
	    <zk-avatar :widget="widget" v-if="widget.componentPath === 'core/zk-avatar'"></zk-avatar>
	    <zk-buy-address :widget="widget" v-if="widget.componentPath === 'core/zk-buy-address'"></zk-buy-address>
	    <zk-card :widget="widget" v-if="widget.componentPath === 'core/zk-card'"></zk-card>
	    <zk-cell :widget="widget" v-if="widget.componentPath === 'core/zk-cell'"></zk-cell>
	    <zk-countdown :widget="widget" v-if="widget.componentPath === 'core/zk-countdown'"></zk-countdown>
	    <zk-dialog :widget="widget" v-if="widget.componentPath === 'core/zk-dialog'"></zk-dialog>
	    <zk-foot :widget="widget" v-if="widget.componentPath === 'core/zk-foot'"></zk-foot>
	    <zk-head :widget="widget" v-if="widget.componentPath === 'core/zk-head'"></zk-head>
	    <zk-html :widget="widget" v-if="widget.componentPath === 'core/zk-html'"></zk-html>
	    <zk-image :widget="widget" v-if="widget.componentPath === 'core/zk-image'"></zk-image>
	    <zk-keyword :widget="widget" v-if="widget.componentPath === 'core/zk-keyword'"></zk-keyword>
	    <zk-list :widget="widget" v-if="widget.componentPath === 'core/zk-list'"></zk-list>
	    <zk-marquee :widget="widget" v-if="widget.componentPath === 'core/zk-marquee'"></zk-marquee>
	    <zk-mask :widget="widget" v-if="widget.componentPath === 'core/zk-mask'"></zk-mask>
	    <zk-nodata :widget="widget" v-if="widget.componentPath === 'core/zk-nodata'"></zk-nodata>
	    <zk-notice :widget="widget" v-if="widget.componentPath === 'core/zk-notice'"></zk-notice>
	    <zk-pay :widget="widget" v-if="widget.componentPath === 'core/zk-pay'"></zk-pay>
	    <zk-popup :widget="widget" v-if="widget.componentPath === 'core/zk-popup'"></zk-popup>
	    <zk-preview :widget="widget" v-if="widget.componentPath === 'core/zk-preview'"></zk-preview>
	    <zk-result :widget="widget" v-if="widget.componentPath === 'core/zk-result'"></zk-result>
	    <zk-search :widget="widget" v-if="widget.componentPath === 'core/zk-search'"></zk-search>
	    <zk-tab :widget="widget" v-if="widget.componentPath === 'core/zk-tab'"></zk-tab>
	    <zk-table :widget="widget" v-if="widget.componentPath === 'core/zk-table'"></zk-table>
	    <zk-text :widget="widget" v-if="widget.componentPath === 'core/zk-text'"></zk-text>
	    <zk-top-nav :widget="widget" v-if="widget.componentPath === 'core/zk-top-nav'"></zk-top-nav>
	    <zk-video :widget="widget" v-if="widget.componentPath === 'core/zk-video'"></zk-video>
	    <zk-groupbuy :widget="widget" v-if="widget.componentPath === 'shop/zk-groupbuy'"></zk-groupbuy>
	    <zk-product-class :widget="widget" v-if="widget.componentPath === 'shop/zk-product-class'"></zk-product-class>
	    <zk-product-item :widget="widget" v-if="widget.componentPath === 'shop/zk-product-item'"></zk-product-item>
	    <zk-grid :widget="widget" v-if="widget.componentPath === 'theme/zk-grid'"></zk-grid>
	    <zk-swiper :widget="widget" v-if="widget.componentPath === 'theme/zk-swiper'"></zk-swiper>
	    <zk-backtop :widget="widget" v-if="widget.componentPath === 'pc/zk-backtop'"></zk-backtop>
	    <zk-help-row :widget="widget" v-if="widget.componentPath === 'pc/zk-help-row'"></zk-help-row>
	    <zk-nav :widget="widget" v-if="widget.componentPath === 'pc/zk-nav'"></zk-nav>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-widget',
    props: {
      widgets: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widgets !== undefined) {
          this.viewModel = this.widgets
          console.info('x-widgets', this.viewModel)
        }
      }
    }
  }
</script>


