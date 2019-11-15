<template>
  <view class="zk-grid zk-grid-b">
    <view class="weui-grid_div" v-if="widget && widget.value && viewModel">
      <!-- :style="'width:' + 100 / gridCol + '%'" -->
      <view class="weui-grid_a" @click="goPages(item.url.value)" v-for="(item, index) in viewModel.gridList" :key="index" :class="{ 'weui-grid_gridCol': index > gridCol - 1 }" :style="'width:'+(100/ viewModel.gridCount)+'%'">
        <view class="weui-grid__icon">
          <!-- <x-icon :icon="item.icon" v-if="item.icon.name" :iconSecondColor="item.iconColor" v-show="!isApp"></x-icon> -->
          <!-- <i v-if="item.icon.name" :class="'grid__icon icon iconfont  ' + item.icon.name" :style=" 'font-size:' + item.icon.size + 'px;color:' + item.iconColor + ';' " v-show="isApp"></i> -->
          <x-icon :src="item.image" :size="iconSize" v-if="item.image || item.image.length !== 0"></x-icon>
          <x-icon :name="item.icon.name" :size="item.size" :color="item.color" v-else-if="item.icon"></x-icon>
        </view>
        <p class="weui-grid__label">{{ item.link.name }}</p>
      </view>
    </view>
  </view>
</template>
<script>
  import './styles/index.js'
  import './var.scss'
  export default {
    data () {
      return {
        widgetModel: '',
        gridCol: '4',
        iconSize: 45,
        isApp: false,
        viewModel: null
      }
    },
    props: {
      widget: {}
    },
    onLoad () {
      this.init()
      if (this.widget !== undefined && this.widget.value) {
        this.gridCol = this.widget.value.count
      }

      if (this.widget.value.iconSize !== undefined) {
        this.iconSize = this.widget.value.iconSize
      } else {
        this.iconSize = 45
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info('aaaaaaaaaaaa这是为什么', this.widget)
        this.widgetModel = await this.$api.themeWidget(this.widget)

        this.viewModel = this.widget.value.gridForm
        if (this.widget.value.iconSize !== undefined) {
          this.iconSize = this.widget.value.iconSize
        } else {
          this.iconSize = 45
        }
        this.isApp = this.$api.client() === 'AppPlus'
      },
      goPages (url) {
        this.$api.to(url)
      }
    }
  }
</script>
