<template>
  <view class="zk-type-class">
    <view class="zk-type-class_cotnainer">
      <view class="class_container_name">{{widgetModel.name}}</view>
      <view class="class_container_data">{{widgetModel.CreateTime}}</view>
      <view class="class_image">
        <img :src="widgetModel.image" alt="">
      </view>
      <view class="class_detail">
        <!-- <p v-html="showHtml"></p> -->
        <rich-text :nodes="showHtml" class="uni-box" style="text-index:20px"></rich-text>
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
        num: 0,
        showHtml: ''

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
        var para = {
          id: this.widget.route.id,
          TableName: this.widget.route.TableName
        }
        var res = await this.$api.httpGet('/Api/LightApp/GetSingle', para)
        if (res.status === 1) {
          this.widgetModel = res.result
          this.showHtml = this.widgetModel.detail
        }
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<img/gi, '<img style="width:100%;height:auto;"')
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<table width="677"/gi, '<table width="100%"')
      }

    }
  }
</script>
<style>
</style>

