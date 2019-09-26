<template>
  <view class="mobile-x-marquee">
    <view class="originality">
      <view class="originality-div">
        <!-- <span class="originality-div_title">牛牛</span>头条 -->
        <image class="originality-div_img" :src="widget.value.image" />
      </view>
      <view class="y-swiper">
        <swiper autoplay="3000" vertical="true" :height="50" :show-indicators="false" :circular="true">
          <swiper-item class="van-swipe-item" v-for="(shufflingContents,index) in viewModel" :key="index">
            <view class="van-swipe-item_p">
              <span class="van-swipe-item_span">{{widget.value.title}}</span>
              <a class="color_a" :href="'/pages/index?path=articles_topline_show&id='+shufflingContents.id">{{shufflingContents.title}}</a>
            </view>
            <view class="van-swipe-item_p">
              <span class="van-swipe-item_span">{{widget.value.name}}</span>
              <a class="color_a" :href="'/pages/index?path=articles_topline_show&id='+shufflingContents.id">{{shufflingContents.intro}}</a>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>
<script>
 
  import { ARTICLE_TOPLINELIST_GET } from '@/service/all/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
        num: 0,
        nuber: '',
        conternuber: 0,
        listimages: [],
        listLenght: 0,
        shanIndex: '',
        result: [],
        imageUrl: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var topLineResponse = await this.$api.httpGet(ARTICLE_TOPLINELIST_GET)
        if (topLineResponse !== undefined) {
          this.viewModel = topLineResponse.result.apiDataList
          this.imageUrl = this.viewModel[0].image
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .mobile-x-marquee {
    .test {
      color: $gl-metal;
    }
    font-size: $gl-size-base;
    height: 35px;
    margin: 6px 0px;
  }
  .originality {
    display: flex;
    margin-left: 18px;
  }
  .originality-div {
    width: 35px;
    font-size: $gl-h5-size;
    font-weight: 600;
    text-align: center;
    line-height: 16px;
    margin: 2px 5px;
    font-family: "楷体";
    .originality-div_title {
      color: $gl-red;
    }
    .originality-div_img {
      width: 32px;
      height: 32px;
    }
  }
  .originality-div_to {
    font-style: italic;
    font-size: 18px;
    color: $gl-danger;
  }
  .y-swiper {
    flex: 1;
    height: 50px;
    overflow: hidden;
  }
  .van-swipe-item_p {
    width: 100%;
    line-height: 16px;
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
  .van-swipe-item_p:nth-child(1) {
    margin-bottom: 2px;
  }
  .color_a {
    display: inline-block;
    color: $gl-text1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 18px;
    font-size: $gl-h6-size;
  }
  .van-swipe-item_span {
    color: $gl-red;
    font-size: 10px;
    border: 1px solid $gl-red;
    border-radius: 2px;
    height: 15px;
    line-height: 15px;
    width: 26px;
    text-align: center;
    margin-right: 5px;
  }
</style>
