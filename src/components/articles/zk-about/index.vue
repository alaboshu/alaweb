<template>

  <view class="zk-about">
    <view class="zk-about-head" v-if="showTitle" @click="back">
      <x-icon name="icon-zk-return" color="#fff" @click.native="back"></x-icon>
      <p>关于我们</p>
    </view>
    <view class="all">
      <view class="zk-head-banner"></view>
      <view class="zk-about-content" id="about">
        <view class="zk-about-contText">
          <view class="text">
            随着供给侧改革的推进，共享经济平台的诞生，以互联网+、大 数据、人工智能为代表的新经济日新月异。实体经济平台化，实体经 济与互联网深度融合，实体经济平台与资本嫁接，成为未来新经济发 展趋势。
          </view>
          <view class="text">
            在2025工业4.0、智慧城市的前提下，中亚国际控股集团控股的企品 汇独创“文房四宝”智惠商业OMO生态体平台。以实体经济为基础，以 互联网+为方式，以商业为依托，重塑产业链，打造共享平台，实现 红利共享。
          </view>
          <view class="text">
            “文房四宝”首创S2F2B2C众享商业模式（S代表平台，F代表厂家/供 应链，B代表商家，C代表消费者），通过为B端商家提供超值产品、 系统服务、营销方案、商家授信、经营场所等五项全方位服务，一站 式解决方案落地，实现B端商家销量提升，业绩倍增。线上以“IP+社 群+自媒体”社群经济为基础，构建规模传播效应，线下以千万社区商 家为宣传媒介，线上线下OMO模式，为F端厂家释放产能产量，让更 多的品牌成为知名品牌，从而打造全产业链生态红利平台。
          </view>
        </view>
      </view>
      <view class="line"></view>

      <view class="zk-about-developRoute" id="development">
        <view class="shuLine"></view>
        <view class="zk-about-Month">
          <span class="zk-month">2019</span>
          <view class="zk-text">
            <p class="content">文房四宝平台千人发布会</p>
            <p class="month">01月</p>
          </view>
          <span class="zk-month-eighting">2018</span>
          <view class="zk-tweleve">
            <p class="content">企品汇正式注册成立</p>
            <p class="twelve">12月</p>
          </view>
          <span class="circleMonth"></span>
          <view class="zk-january">
            <p class="content">中美国际在美国OTC挂牌上市</p>
            <p class="twelve">01月</p>
          </view>
          <span class="zk-month-seventhing">2017</span>
          <view class="zk-seventhing">
            <p class="content">企品汇正式注册成立</p>
            <p class="eleven">12月</p>
          </view>
          <span class="circleMonth-two"></span>
          <view class="zk-septemper">
            <p class="content">文房四宝技术平台发展</p>
            <p class="twelve">09月</p>
          </view>
          <span class="zk-month-sixthing">2016</span>
          <view class="zk-septemperFirm">
            <p class="content">一路购实业发展有限公司新四版挂牌</p>
            <p class="twelve">12月</p>
          </view>
          <span class="circleMonth-three"></span>
          <view class="zk-septemperFirmSystem">
            <p class="content">一路购上线完整供应链体系构建</p>
            <p class="twelve">11月</p>
          </view>
          <span class="circleMonth-four"></span>
          <view class="zk-septemperFirmQiNiuNiu">
            <p class="content">25位创始人联合发起文房四宝项目</p>
            <p class="twelve">年初</p>
          </view>
        </view>
      </view>
      <view class="line"></view>

      <view class="both" id="joinOur">
        <view class="zk-about-joinOur">
          <view class="zk-about-deTop">
            <p class="develop-stratage Core">核心模式</p>
            <p class="develop-english">Core strenghts</p>
          </view>
          <img src="https://s-open.qiniuniu99.com//wwwroot/Uploads/CMS/2019/06/5d02523f7d430d0ffc88e55e.jpg" alt>
          <p class="CoreText">
            具有平台化、资本化、共享化的特色，为B端商家提供更多的 解决方案，线上线下深度交互融合，从而打造全产业链生态红利平台。
          </p>
        </view>

        <view class="line"></view>
        <view class="zk-about-develop">
          <view class="zk-about-deTop">
            <p class="develop-stratage">发展战略</p>
            <p class="develop-english">development stragety</p>
          </view>
          <view class="content">
            <view class="developfirst">
              <h3>
                <p class="font-size">
                  文房四宝
                  <span class="redColor">1.0</span>时代启幕战略铺开，步步为赢
                </p>
              </h3>
              <ul>
                <li>
                  <span class="circle"></span>团队扩建打造108支中亚铁军团队
                </li>
                <li>
                  <span class="circle"></span>市场扩张1000厂家直供1万社区商家
                </li>
                <li>
                  <span class="circle"></span>销售扩张实现5000万+平台成交金额
                </li>
              </ul>
            </view>
            <view class="line"></view>
            <view class="developfirst">
              <h3>
                <p class="font-size">
                  文房四宝
                  <span class="redColor">2.0</span>时代
                </p>
              </h3>
              <ul>
                <li>
                  <span class="circle"></span>区域扩张
                </li>
                <li>
                  <span class="circle"></span>珠三角 ———— 长三角 ———— 五大战区扩张
                </li>
                <li>
                  <span class="circle"></span>全面终端
                </li>
                <li>
                  <span class="circle"></span>S端—F端30万家,B端300万家,C端3000万消费者
                </li>
                <li>
                  <span class="circle"></span>实现1000亿市值
                </li>
              </ul>
            </view>
            <view class="line"></view>
            <view class="developfirst">
              <h3>
                <p class="font-size">
                  文房四宝
                  <span class="redColor">3.0</span>时代
                </p>
              </h3>
              <ul>
                <li>
                  <span class="circle"></span>五大战区版图扩张285个城市运营中心
                </li>
                <li>
                  <span class="circle"></span>
                </li>
                <li>
                  <span class="circle"></span>S ———— F ———— B ———— C
                </li>
                <li>
                  <span class="circle"></span>平台———供应链———商家———消费者
                </li>
                <li>
                  <span class="circle"></span>
                  <span class="red"></span>时代打造基于平台+合伙人模式的智慧商业OMO生态体
                </li>
              </ul>
            </view>
          </view>
        </view>
      </view>
      <view class="line"></view>
      <view class="zk-about-link" id="linkOur">
        <p class="font-size">
          <span>地址：深圳市宝安区松岗街道红景社区佳裕大厦501</span>
        </p>
        <view class="line"></view>
        <p class="font-size">
          <span>地铁站点：深圳市宝安区松岗地铁</span>
        </p>
        <view class="line"></view>
        <p class="font-size">
          <span>联系电话:400-680-9088</span>
        </p>
        <view class="line"></view>
        <p class="font-size">
          <span>网&nbsp;&nbsp;&nbsp;&nbsp;址 ：http://www.szwft.me/</span>
        </p>
        <view class="zk-about-map">
          <view class="page-body">
            <view class="page-section page-section-gap">
              <map style="width: 100%; height: 200px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-25/5d11ed440a782f25505f2894.jpg" alt=""> -->

</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        latitude: 22.7701880392,
        longitude: 113.8270880562,
        covers: [{
          latitude: 22.7701880392,
          longitude: 113.8270880562,
          callout: {
            content: '联系地址',
            borderWidth: '100px',
            color: '#000'
          }
        }
        ],
        list: [
          {
            name: '公司介绍',
            id: 'about'
          },
          {
            name: '发展历程',
            id: 'development'
          },
          {
            name: '加入我们',
            id: 'joinOur'
          },
          {
            name: '联系我们',
            id: 'linkOur'
          }
        ],
        activeBtn: 0,
        showTitle: true
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
        if (this.$api.client() === 'AppPlus') {
          this.showTitle = false
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      back () {
        this.$router.go(-1)
        // this.$router.push('/pages/index')
      },
      goAnchor (selector, index) {
        this.activeBtn = index
        // this.$el.querySelector(selector).scrollIntoView()
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./style.scss";
</style>
