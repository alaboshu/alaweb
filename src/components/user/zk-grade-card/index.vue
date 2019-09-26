<template>
  <view class="zk-grade-card-a">
    <view class="zk-grade-card">
      <view class="card-head">
        <view class="card-head_title">为您优选</view>
        <view class="card-head_right">更多</view>
      </view>
      <view class="box_contaier" v-for="(item,index) in contentList" :key="index">
        <view class="box_contaier-top">
          <view class="grade_card_left">
            <img :src="item.img">
          </view>
          <view class="grade_card_right">
            <p class="card_name">
              <span>{{item.name}}</span>
              <span>福田·平安中心</span>
            </p>
            <p class="card_text">{{item.text}}</p>
          </view>
        </view>
        <view class="box_contaier-bottom">
          <view class="card_left_type">
            <span v-if="item.type==1">餐饮</span>
            <span v-if="item.type==1">快餐</span>
            <span class="span-costume" v-if="item.type==2">服饰</span>
          </view>
          <view class="card_rate">
            <img class="card_rate-img" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" />
          </view>
          <view class="fractional-index">4.7分</view>
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
        value2: null,
        contentList: [
          {
            name: '老坛酸菜鱼',
            img: 'https://p1.meituan.net/waimaipoi/b32a5179351e5bd18c5bc78ef7fc7fe4382081.jpg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 1
          },
          {
            name: '幸福西饼蛋糕',
            img: 'https://fuss10.elemecdn.com/a/f2/46d355df092f093bfba3ff93959b5png.png',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 2
          },
          {
            name: '湘赣情木桶饭',
            img: 'https://fuss10.elemecdn.com/6/a5/c45921792f6211b26c74a1272b649jpeg.jpeg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '福田·香蜜湖',
            type: 1
          },
          {
            name: '重庆老麻抄手',
            img: 'https://fuss10.elemecdn.com/a/40/6411a8bade6e1c31aa6b9526cc212jpeg.jpeg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 1
          },
          {
            name: '老坛酸菜鱼',
            img: 'https://p1.meituan.net/waimaipoi/b32a5179351e5bd18c5bc78ef7fc7fe4382081.jpg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 1
          },
          {
            name: '幸福西饼蛋糕',
            img: 'https://fuss10.elemecdn.com/a/f2/46d355df092f093bfba3ff93959b5png.png',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 2
          },
          {
            name: '湘赣情木桶饭',
            img: 'https://fuss10.elemecdn.com/6/a5/c45921792f6211b26c74a1272b649jpeg.jpeg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '福田·香蜜湖',
            type: 1
          },
          {
            name: '重庆老麻抄手',
            img: 'https://fuss10.elemecdn.com/a/40/6411a8bade6e1c31aa6b9526cc212jpeg.jpeg',
            text: '蒜蓉虾鲜虾牛肉丸粉锡纸花甲粉花甲鲜虾粉花甲牛肉丸粉',
            address: '罗湖·国贸',
            type: 1
          }
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
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

