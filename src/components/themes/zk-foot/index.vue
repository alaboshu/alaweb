<template>
  <view style="display:none">
    <view class="kong"></view>
    <view class="x-foot_all">
      <view v-for="(item,index) in widgetModel.result" :key="index" class="x-foot_topName" :class="{'thcolor':Indexlist==index}">
        <view class="foot_k">
          <x-a  :path="item.url"> <i class="insi iconcolor" :class="'icon iconfont '+ item.image" style="font-size:20px;"></i></x-a >
        </view>
        <x-a  class="conter_color cont" :path="item.url">{{item.name}}</x-a >
      </view>
    </view>
  </view>
</template>
<script>
 
  export default {
    
    props: {
      widget: {},
      value: {}
    },
    data () {
      return {
        widgetModel: {},
        isReady: false,
        liheight: 25,
        Indexlist: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // this.widgetModel = this.value
        // if (this.$api.isEmpty(this.widgetModel)) {
        //   this.widgetModel = await this.$api.themeWidget(
        //     this.widget,
        //     editSetting.config
        //   )
        // }
        // this.isReady = true
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/style/variable.scss';

  .x-foot_all {
    position: fixed;
    bottom: 0px;
    height: 50px;
    line-height: 13px;
    background-color: $gl-light;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px solid $gl-border1;
  }
  .x-foot_topName {
    flex: 1;
    text-align: center;
  }
  .foot_k {
    height: 25px;
    line-height: 19px;
  }
  .conter_color {
    color: $gl-text2;
  }
  .kong {
    height: 50px;
  }
  ._i {
    line-height: 25px !important;
  }
  .thcolor {
    .insi {
      color: $gl-themeColor;
    }
    .conter_color {
      color: $gl-themeColor;
    }
  }
  .iconcolor {
    color: $gl-text2;
  }
  .cont {
    color: $gl-text2;
  }
</style>
