<template>
  <view class="zk-grid zk-grid-b">
    <view class="weui-grid_div" v-if="widget && widget.value && viewModel">
      <view class="weui-grid_a" @click="goPages(item)" v-for="(item, index) in gridList" :key="index" :class="{ 'weui-grid_gridCol': index > gridCol - 1 }" :style="'width:'+(100/ viewModel.gridCount)+'%'">
        <view class="weui-grid__icon">
          <x-icon :src="item.image" :size="iconSize" v-if="item.image || item.image.length !== 0"></x-icon>
          <x-icon :name="item.icon.name" :size="item.size" :color="item.color" v-else-if="item.icon"></x-icon>
        </view>
        <p class="weui-grid__label">{{ item.link.name }}</p>
      </view>
    </view>
  </view>
</template>
<script>
  import './var.scss'
  export default {
    data () {
      return {
        widgetModel: '',
        gridCol: '4',
        iconSize: 45,
        isApp: false,
        viewModel: null,
        gridList: null
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
        this.widgetModel = await this.$api.themeWidget(this.widget)

        this.viewModel = this.widget.value.gridForm
        var data = []
        this.viewModel.gridList.forEach(element => {
          if (element.isEnable) {
            data.push(element)
          }
        })
        this.gridList = data
        if (this.widget.value.iconSize !== undefined) {
          this.iconSize = this.widget.value.iconSize
        } else {
          this.iconSize = 45
        }
        this.isApp = this.$api.client() === 'AppPlus'
      },
      goPages (item) {
        var url
        // 处理跳转链接
        if (item.link.url.indexOf('/tabbar') === -1) {
          var linkSplit = item.link.url.split('/')
          url = '/pages/index?path='
          if (linkSplit.length === 2) {
            url += linkSplit[1]
          } else if (linkSplit.length === 3) {
            url += linkSplit[1] + '_' + linkSplit[2]
          } else if (linkSplit.length === 4) {
            url += linkSplit[1] + '_' + linkSplit[2] + '_' + linkSplit[3]
          }
        } else {
          url = item.link.url
        }
        this.$api.to(url)
      }
    }
  }
</script>
