<template>
  <view class="x-icon" v-if="async">
    <i :class="iconName +'  icon iconfont '+ xClass" v-if="!isImage" :style="'font-size:'+iconSize+'px;color:'+iconColor+';'"></i>
    <image class="images" :lazy-load="true" :src="imgSrc" :style="'width:'+size+'px;height:'+size+'px'" v-if="isImage" />
  </view>
</template>

<script>
  export default {
    name: 'x-icon',
    props: {
      icon: null,
      name: {},
      src: {
        type: String
      },
      color: {},
      size: {
        default: 16
      },
      changeColor: {},
      iconSecondColor: {
        default: '#999'
      },
      xClass: {}
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        async: true,
        isImage: true,
        iconName: '',
        iconColor: '',
        iconSize: 16,
        imgSrc: '',
        imgSize: 45
      }
    },
    methods: {
      init () {
        if (this.icon) {
          this.isImage = false
          this.iconSize = this.icon.size
          // this.iconColor = this.icon.color)
          if (this.icon.iconSecondColor) {
            this.iconColor = this.icon.iconSecondColor
          } else {
            this.iconColor = this.iconSecondColor
          }
          if (this.$api.isEmpty(this.icon.icon)) {
            this.iconName = this.icon.name
          } else {
            this.iconName = this.icon.icon
          }
        } else if (this.name !== 0 && !this.$api.isEmpty(this.name) && this.name !== '0') {
          this.isImage = false
          this.iconName = this.name
          this.iconSize = this.size
          this.iconColor = this.color
        } else if (this.src !== undefined) {
          if (this.$api.isEmpty(this.size)) {
            this.imgSize = 45
          } else {
            this.imgSize = this.size
          }
          this.imgSrc = this.src
          this.isImage = true
        }
        if (!this.$api.isEmpty(this.changeColor)) {
          this.iconColor = this.changeColor
        }
        if (this.color !== undefined && this.color !== '') {
          this.iconColor = this.color
        }
        this.async = true
      },
      watchWidget () {
        this.async = false
        this.init()
        this.async = true
      }
    },
    watch: {
      name: 'watchWidget',
      src: 'watchWidget',
      icon: 'watchWidget'
    }
  }
</script>


<style lang="scss">
  @import "@/assets/style/variable.scss";

  .x-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    vertical-align: baseline;
    margin: 0 auto;
  }
  .images {
    margin: 0 auto;
    display: block;
  }
  .i-color {
    color: $gl-brand;
  }
  .themecolor {
    color: $gl-themeColor !important;
  }
</style>
