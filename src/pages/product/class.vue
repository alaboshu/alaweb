<template>
  <div class="zk-product-class">
    <tab :line-width=2 active-color='#0090ff' v-model="index" class="zk-class-tab-left">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="100px" :show-dots="false" class="zk-class-tab-right">
      <swiper-item v-for="(items, indexs) in listDatas" :key="indexs">
        <grid :cols="3">
          <h1>{{items.name}}</h1>
          <grid-item v-for="(item,index) in items.childClass" :key="index">
            <router-link :to="'/product/list'+'?'+'ClassIds='+item.id">
              <img :src="item.icon">
              <p>{{item.name}}</p>
            </router-link>
          </grid-item>
        </grid>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { PRODUCT_CLASS_GET } from '@/service/api/apiUrl'
  export default {
    data () {
      return {
        listDatas: [],
        list2: [],
        list: [],
        demo2: '',
        index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async  getData () {
        let response = await PRODUCT_CLASS_GET.class()
        this.listDatas = response.data.result
        console.log(1111)
        console.log(this.listDatas)
        console.log(222)
        this.demo2 = this.listDatas[0].name
        console.dir(this.listDatas) // 通过这个来查看数据结构
        for (var i = 0; i < this.listDatas.length; i++) {
          this.list2.push(this.listDatas[i].name)
        }
      },
      menu () {

      },
      switchTabItem (index) {
        console.log('on-before-index-change', index)
        this.$vux.loading.show({
          text: 'loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.index01 = index
        }, 1000)
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      addTab () {
        if (this.list2.length < 5) {
          this.list2 = this.list.slice(0, this.list2.length + 1)
        }
      },
      removeTab () {
        if (this.list2.length > 1) {
          this.list2 = this.list.slice(0, this.list2.length - 1)
        }
      },
      next () {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    }
  }
</script>
<style lang="less">
  .zk-product-class {
    height: 100vh;
    .zkuidebt-foot {
      .placeholder {
        height: 4rem;
      }
    }
    .weui-grids {
      height: 100%;
      overflow-y: auto;
    }
    .weui-grids::after,
    .weui-grids::before {
      content: none;
    }
    .weui-grid::after,
    .weui-grid::before {
      content: none;
    }
    .weui-grids > .weui-grid {
      text-align: center;
      padding: 0.7143rem 0.7143rem;
    }
    .weui-grids > .weui-grid img {
      display: block;
      width: 4.2857rem;
      height: 4.2857rem;
      margin: 0 auto;
      border-radius: 50%;
    }
    .weui-grids > .weui-grid p {
      //font-size: @h6-font-size;
      margin: 0.3571rem;
      color: black;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      height: 1.3rem;
      text-align: center;
    }
    .weui-grids > h1 {
      padding: 0 0.7143rem;
      line-height: 3.66666667rem;
      height: 3.2143rem;
      color: black;
      font-weight: bold;
      border-bottom: 1px solid #e5e5e5;
      //font-size: @h6-font-size;
    }
    .vux-tab-ink-bar {
      background-color: transparent !important;
    }
  }
  .zk-class-tab {
    width: 100%;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: auto;
  }
  .zk-class-tab-left .vux-tab-item {
    height: 3.2143rem !important;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    //font-size: @h6-font-size;
    padding-left: 0.6rem;
    text-align: left !important;
  }
  .zk-class-tab-left {
    width: 5.3571rem;
    height: 79vh !important;
    display: block !important;
    overflow-y: auto;
    //background: @search-bg-color !important;
    .vux-tab-selected {
      //background: @white !important;
      border-bottom: 1px solid #e5e5e5 !important;
    }
  }
  .zk-class-tab-left::-webkit-scrollbar {
    display: none;
  }
  .zk-class-tab-right {
    -ms-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    .vux-swiper {
      height: 79vh !important;
    }
  }
</style>
