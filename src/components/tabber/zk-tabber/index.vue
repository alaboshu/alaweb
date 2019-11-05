<template>
  <view class="bottom-tab">
    <view
      :class="
        item.center == true ? 'bottom-tab-item-center' : 'bottom-tab-item-sider'
      "
      @click="changeTap(item)"
      v-for="(item, index) in tabList"
      :key="index"
    >
      <image v-if="curTab == item.id" class="first-img" :src="item.imgOn" />
      <image v-if="curTab != item.id" class="first-img" :src="item.imgOff" />
      <text
        :class="curTab == item.id ? 'text-position text-on' : 'text-position'"
        >{{ item.name }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: 'wyg-bottom-tab-withcenter',
  props: {
    tabIndex: {
      // 图片的尺寸
      type: String,
      default: '1'
    },
    tabListParent: {
      default: null
    }
  },
  data () {
    return {
      curTab: 1,
      tabList: [
        {
          id: 1,
          name: '首页',
          imgOff: '../../../static/img/F_home-a.png',
          imgOn: '../../../static/img/F_home.png',
          url: '/pages/heritagemall/heritagemall'
        },
        {
          id: 2,
          name: '分类',
          imgOff: '../../../static/img/F_shop-a.png',
          imgOn: '../../../static/img/F_shop.png',
          url: '/pages/heritagemall/cate'
        },
        {
          id: 3,
          name: '购物车',
          imgOff: '../../../static/img/F_home-a.png',
          imgOn: '../../../static/img/F_home-a.png',
          url: '/pages/heritagemall/cart',
          center: false
        },
        {
          id: 4,
          name: '个人中心',
          imgOff: '../../../static/img/F_home-a.png',
          imgOn: '../../../static/img/F_home-a.png',
          url: '/pages/heritagemall/user'
        },
        {
          id: 5,
          name: '个人中心',
          imgOff: '../../../static/img/F_home-a.png',
          imgOn: '../../../static/img/F_home-a.png',
          url: '/pages/heritagemall/user'
        }
      ]
    }
  },
  created () {
    this.curTab = Number(this.tabIndex)
    if (this.tabListParent && this.tabListParent.length > 0) {
      this.tabList = this.tabListParent
    }
  },
  methods: {
    $redirect (_url) {
      uni.redirectTo({
        url: _url
      })
    },
    changeTap (e) {
      this.curTab = e.id
      this.$redirect(e.url)
    }
  }
}
</script>

<style lang="scss">
.bottom-tab {
  position: fixed;
  background-color: #fdfdfd;
  bottom: 0%;
  width: 100%;
  height: 2.9rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-tab-item-center {
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .first-img {
      width: 2.6rem;
      height: 2.6rem;
      margin-top: -0.8rem;

      border-radius: 50%;
      border: 0.01rem solid #c0c4cc;
    }
    .text-position {
      margin-top: 0rem;
      font-size: 0.6rem;
      color: #757575;
    }
    .text-on {
      color: #ffb400;
    }
  }
  .bottom-tab-item-sider {
    width: 19%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .first-img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .text-position {
      margin-top: 0rem;
      font-size: 0.6rem;
      color: #757575;
    }
    .text-on {
      color: #ffb400;
    }
  }
}
</style>
