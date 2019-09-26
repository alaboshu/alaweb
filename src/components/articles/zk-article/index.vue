<template>
  <view class="mobile-x-article" v-if="widgetModel">
    <!--  <h1 class="page__title pagetitle">{{widgetModel.title}}</h1>
    <p class="page__title__desc pagetitle">
      <span class="subTitle">{{widgetModel.subTitle}}</span>
      <span class="createTime">{{widgetModel.createTime}}</span>
    </p> -->
    <view class="uni-common-mt" style="background:#FFF; font-size:16px;margin-bottom:50px;">
      <rich-text :nodes="widgetModel.content" class="uni-box" style="text-index:20px"></rich-text>
    </view>
  </view>
</template>
<script>

  export default {
    
    data () {
      return {
        widgetModel: {}
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
        var res = await this.$api.httpGet('/api/autoconfig/Get?type=RegisterProtocolConfig')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .mobile-x-article {
    padding: 5px 18px;
  }
  .page__title {
    font-size: 17px;
  }
  .weui-article_p p {
    font-size: $gl-h3-size;
    line-height: 35px;
    text-indent: 2em;
    width: 100%;
  }
  .page__title__desc span {
    font-size: 1.1rem;
  }
  .weui-article {
    .img {
      width: 150px;
    }
    span {
      font-size: 16px !important;
    }
    width: 100%;
    padding: 0px !important;
  }
  .subTitle {
    margin-right: 15px;
  }
  .pagetitle {
    padding-left: 5px;
  }
  .zkhead {
    position: fixed;
    top: 0px;
    z-index: 999;
  }
  .listimg {
    width: 100% !important;
  }
  .uni-box div span {
    font-size: 18px !important;
  }
  .uni-box {
    text-indent: 24px;
    color: #3f3d3d;
    p {
      opacity: 0.9;
    }
  }
  .createTime {
    color: #666;
    font-size: 14px !important;
  }
</style>
