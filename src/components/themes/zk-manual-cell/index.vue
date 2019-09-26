<template>
  <view class="zk-manual-cell">
    <view class="mobile_user">
      <view class="user-view_a" v-for="(item,index) in widgetModel" :key="index" @click="getManual(item.id)">

        <view class="user_conter">
          <p class="weui_margin" v-if="async">{{item.name}}</p>
          <p class="weui_margin" v-else>{{item.title}}</p>
        </view>
        <view>
          <i class="zk-right icon iconfont"></i>
        </view>
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
        async: false
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
        if (this.widget.route.id !== undefined) {
          var para = {
            id: this.widget.route.id
          }
          var reposon = await this.$api.httpGet('/api/Manual/GetListByRelationId', para)
          this.async = false
        } else {
          var reposon = await this.$api.httpGet('/api/manual/GetManualRelation')
          this.async = true
        }
        if (reposon.status !== 1) {
          this.$api.toastWarn(reposon.message)
          return
        }
        this.widgetModel = reposon.result
      },
      getManual (id) {
        if (id > 0) {
          this.$api.to('/pages/index?path=articles_helps_index&id=' + id)
        } else {
          this.$api.to('/pages/index?path=articles_topline_show&id=' + id)
        }
      }
    }
  }
</script>
