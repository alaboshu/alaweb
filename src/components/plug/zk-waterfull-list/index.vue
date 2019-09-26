<template>
  <view class="zk-waterfull-list">
    <div>
      <div class="pubu" v-cloak>
        <ul class="yg yg_l">
          <li v-for="(item,index) in imgList" :key="index">
            <div style="position: relative;">
              <img :src="item.e_img" alt>
              <div class="u_xinx">
                <img :src="item.u_img" alt>
                <span>{{item.u_name}}</span>
              </div>
            </div>
            <p>{{item.e_intro}}</p>
            <p>{{item.e_p}}</p>
          </li>
        </ul>
        <ul class="yg yg_r">
          <li v-for="(item,index) in imgList" :key="index">
            <div style="position: relative;">
              <img :src="item.e_img" alt>
              <div class="u_xinx">
                <img :src="item.u_img" alt>
                <span>{{item.u_name}}</span>
              </div>
            </div>
            <p>{{item.e_intro}}</p>
            <p>{{item.e_p}}</p>
          </li>
        </ul>
        <div style="clear: both;"></div>
      </div>
    </div>
  </view>
</template>

<script>

  import './var.scss'
  import './styles/a.scss'

  export default {

    data () {
      return {
        widgetModel: {},
        imgList: [
          {
            u_id: '512',
            u_name: '开发者',
            u_img:
              'http://xxiaoyuan.top/static/js/upload/uploads/153923102266562.jpeg',
            u_date: '2018-05-31 20:22:08',
            e_id: '100',
            e_type: '0',
            e_title: '我眼中的顺职',
            e_intro: '顺德职业技术',
            e_p:
              '2015年的夏天，我怀揣着对大学的憧憬来到顺职。我满怀欣喜地到梁銶琚礼堂报到，正式地成为了一名顺职院的学生。</p>\r\n\r\n<p>闲下来的时光我逛逛了校园，下面来给大家看看我眼中的顺职院吧。',
            e_img: 'http://xxiaoyuan.top/static/img/banner/banner1.jpg',
            e_user: '512',
            e_date: '2018-05-25 00:00:00',
            e_is_index: '1'
          },
          {
            u_id: '512',
            u_name: '开发者',
            u_img:
              'http://xxiaoyuan.top/static/js/upload/uploads/153923102266562.jpeg',
            u_date: '2018-05-31 20:22:08',
            e_id: '100',
            e_type: '0',
            e_title: '我眼中的顺职',
            e_intro:
              '顺德职业技术学院是我美丽的大学，那里春满花开，四季常绿，鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征',
            e_p:
              '2015年的夏天，我怀揣着对大学的憧憬来到顺职。我满怀欣喜地到梁銶琚礼堂报到，正式地成为了一名顺职院的学生。</p>\r\n\r\n<p>闲下来的时光我逛逛了校园，下面来给大家看看我眼中的顺职院吧。',
            e_img: 'http://xxiaoyuan.top/static/img/banner/banner1.jpg',
            e_user: '512',
            e_date: '2018-05-25 00:00:00',
            e_is_index: '1'
          },
          {
            u_id: '512',
            u_name: '开发者',
            u_img:
              'http://xxiaoyuan.top/static/js/upload/uploads/153923102266562.jpeg',
            u_date: '2018-05-31 20:22:08',
            e_id: '100',
            e_type: '0',
            e_title: '我眼中的顺职',
            e_intro:
              '顺德职业技术学院是我美丽的大学，那里春满花开，四季常绿，四季常绿，鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征',
            e_p:
              '2015年的夏天，我怀揣着对大学的憧憬来到顺职。我满怀欣喜地到梁銶琚礼堂报到，正式地成为了一名顺职院的学生。</p>\r\n\r\n<p>闲下来的时光我逛逛了校园，下面来给大家看看我眼中的顺职院吧。',
            e_img: 'http://xxiaoyuan.top/static/img/banner/banner1.jpg',
            e_user: '512',
            e_date: '2018-05-25 00:00:00',
            e_is_index: '1'
          },
          {
            u_id: '512',
            u_name: '开发者',
            u_img:
              'http://xxiaoyuan.top/static/js/upload/uploads/153923102266562.jpeg',
            u_date: '2018-05-31 20:22:08',
            e_id: '100',
            e_type: '0',
            e_title: '我眼中的顺职',
            e_intro:
              '顺德职业技术学院是我美丽的大学，那里春满花开，四季常绿，四季常绿，鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征',
            e_p:
              '2015年的夏天，我怀揣着对大学的憧憬来到顺职。我满怀欣喜地到梁銶琚礼堂报到，正式地成为了一名顺职院的学生。</p>\r\n\r\n<p>闲下来的时光我逛逛了校园，下面来给大家看看我眼中的顺职院吧。',
            e_img: 'http://xxiaoyuan.top/static/img/banner/banner1.jpg',
            e_user: '512',
            e_date: '2018-05-25 00:00:00',
            e_is_index: '1'
          },
          {
            u_id: '512',
            u_name: '开发者',
            u_img:
              'http://xxiaoyuan.top/static/js/upload/uploads/153923102266562.jpeg',
            u_date: '2018-05-31 20:22:08',
            e_id: '100',
            e_type: '0',
            e_title: '我眼中的顺职',
            e_intro:
              '顺德职业技术学院是我美丽的大学，那里春满花开，四季常绿，四季常绿，鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征鸟语花香。教室里的朗朗书声，操场上的滴滴汗水，正是青春的象征',
            e_p:
              '2015年的夏天，我怀揣着对大学的憧憬来到顺职。我满怀欣喜地到梁銶琚礼堂报到，正式地成为了一名顺职院的学生。</p>\r\n\r\n<p>闲下来的时光我逛逛了校园，下面来给大家看看我眼中的顺职院吧。',
            e_img: 'http://xxiaoyuan.top/static/img/banner/banner1.jpg',
            e_user: '512',
            e_date: '2018-05-25 00:00:00',
            e_is_index: '1'
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
      },
      getList: function () {
        this.ListData = this.imgList
      }
    },
    onLoad () {
      this.getList()
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
</style>

