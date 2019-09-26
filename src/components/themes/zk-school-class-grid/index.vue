<template>
  <view class="zk-school-class-grid">
    <view class="school_class_grid_container">
      <view class="class_grid_content">
        <view class="class_grid_content_top"></view>
        <div class="fight-shop-content-scroll">
          <view class="class_grid_content_title">推荐</view>
          <div class="zk-image-scroll" v-if="widgetModel">
            <scroll-view class="scroll-view_H" scroll-x="true">
              <div class="scroll-view_box" v-for="(item,index) in widgetModel" :key="index" @click="goDetail(item._id)">
                <div v-if="item.switch">
                  <image :src="item.image" />
                  <div class="shops_mask"></div>
                  <div class="scroll_name">{{item.name}}</div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
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
        var par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        } else {
          this.$api.toastWarn(response.message)
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=school_detail&id=' + id + '&TableName=' + this.widget.value.name)
      }
    }
  }
</script>
