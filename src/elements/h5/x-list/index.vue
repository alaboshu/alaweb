<template>
  <div class="h5-x-list" element-path="h5/x-list">
<<<<<<< HEAD
  {{viewModel}}
=======
    <div class="weui-panel weui-panel_access" v-for="(item,index) in viewModel" :key="index">
      <div class="weui-panel__bd">
        <a :href="item.url" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <a :href="item.url">
              <img :src="item.image" alt="" class="weui-media-box__thumb">
            </a>
          </div>
          <div class="weui-media-box__bd">
            <a :href="item.url">
              <h4 class="weui-media-box__title">
                {{item.title}}</h4>
            </a>
            <p class="weui-media-box__desc">{{item.intro}}</p>
            <p class="weui-media-box__desc" style="text-align: right">{{item.extra}}</p>
          </div>
        </a>
      </div>
    </div>
>>>>>>> f384f92c4543d4848938d5f501c01b1785141d4b
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
    props: {
      elementData: {}
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
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
        console.log('this.viewModel', this.viewModel)
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .h5-x-list {
  	font-size: @font-size-base;
  }
</style>
