<template>
  <div v-if="async" class="zk-shop-swiper">
    <swiper :autoplay="true" :interval="2000" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" style="height:180px">
      <swiper-item v-for="(item,index) in dataList" :key="index">
        <view>
          <img :src="item.Image" :alt="item.intro" class="bgImg" />
        </view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
 
  import apiUrl from '../../../service/config'
  export default {
    
    data () {
      return {
        async: false,
        widgetModel: '',
        Heihgt: '',
        windowWidth: '',
        apiUrls: '',
        dataList: {}
      }
    },
    props: {
      widget: {},
      height: {
        type: Number,
        default: 150
      }
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.apiUrls = apiUrl.apiBaseUrl
        this.async = false
        var res = await this.$api.httpGet('Api/AutoConfig/List?Type=WebDiySlideShow')
        if (res.status === 1) {
          this.dataList = res.result
        }
          this.widgetModel = await this.$api.themeWidget(this.widget)
        this.windowWidth = this.$api.getSystemInfoSync().windowWidth
        // this.Heihgt = this.windowWidth * Number(this.widget.value.height)
        this.async = true
      },
      watchWidget () {
        this.init()
      }
    },
    watch: {
      widget: 'watchWidget'
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-shop-swiper {
    .uni-swiper-item {
      padding-top: 0px !important;
    }
    .uni-swiper {
      height: 180px !important;
    }
    .uni-swiper .uni-swiper-dot {
      width: 6px;
      height: 6px;
    }
    .bgImg {
      width: 100%;
    }
  }
</style>
