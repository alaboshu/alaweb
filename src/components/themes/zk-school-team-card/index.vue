<template>
  <view class="zk-school-team-card">
    <view class="school_team_card_container">
      <view class="video_list_head">
        <span>团队风采</span>
      </view>
      <div class="fight-shop-content-scroll">
        <div class="zk-image-scroll">
          <scroll-view class="scroll-view_H" scroll-x="true">
            <div class="scroll-view_box" v-for="(item,index) in widgetModel" :key="index" @click="goDetail(item.id)">
              <image :src="item.image" />
              <div class="scroll_name">{{item.title}}</div>
            </div>
          </scroll-view>
        </div>
      </div>
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        var res = await this.$api.httpGet('/api/article/toplinelist')
        if (res.status === 1) {
          this.widgetModel = res.result.apiDataList
        }
      },
      goDetail (id) {
        this.$api.to('/pages/index?path=articles_topline_show&id=' + id)
      }
    }
  }
</script>
