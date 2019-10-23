<template>
  <view class="zk-cource-center-a">
    <view class="zk-cource-center">
      <view class="container_box">
        <view class="all_cource">全部课程</view>
        <view class="cource_type">
          <span :class="{current: num == 1}" @click="change(1)">综合排序</span>
          <span :class="{current: num == 2}" @click="change(2)">最新发布</span>
          <span :class="{current: num == 3}" @click="change(3)">筛选</span>
        </view>
        <view class="cource_content" v-for="item in  list" :key="item">
          <img src="http://img4.imgtn.bdimg.com/it/u=2984185296,2196422696&fm=26&gp=0.jpg">
          <view class="texts">
            <span>5分钟分析文房四宝爆点</span>
            <span>34956439794人参加</span>
            <span>课程分类</span>
          </view>
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
        num: 1,
        list: [1, 2, 3]
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
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      change (index) {
        this.num = index
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
