<template>
  <view class="zk-tag">
    <ul class="tag_content">
      <li class="tag_item" v-for="(item,index) in list" :key="index" @click="goLinks(item.url.value)">
        <span><img :src="item.image" alt=""></span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        list: [
        ]
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
        if (this.widgetModel.value !== undefined) {
          this.list = this.widgetModel.value.links
        }
      },
      goLinks (url) {
        // this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
