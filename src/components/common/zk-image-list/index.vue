<template>
  <view class="zk-image-list-d">
    <ul class="zk-image-list">
      <li v-for="(item ,index) in viewmodel" class='image-list' :class="'image-list-'+index" :key="index">
        <a :alt="item.name" :href="item.url.value">
          <image :src="item.image" class='image' :alt="item.name" />
        </a>
      </li>
    </ul>
  </view>
</template>

<script>
  import './var.scss'
  import './styles/index'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewmodel: ''
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
                  this.widgetModel = await this.$api.themeWidget(this.widget)
        this.viewmodel = this.widgetModel.value.links
      }
    }
  }
</script>
