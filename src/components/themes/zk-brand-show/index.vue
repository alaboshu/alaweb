.<template>
  <view class="zk-brand-show">
    <view class="container_box">
      <view class="brand_title">
        <span>品牌制造商直降</span>
        <!-- <span>换一批</span> -->
      </view>
      <view class="brand_content">
        <view class="content_item" v-for="(item,index) in contentList" :key="index" @click="goLinks(item.url.value)">
          <view class="item_name">{{item.name}}</view>
          <view class="item_active">
            <span>{{item.money}}</span>
            <!-- <span v-if="$api.showPrice()">{{item.money}}</span>
            <span v-else>升级后显示价格</span> -->
            <span>{{tag}}</span>
          </view>
          <view class="item_img">
            <img :src="item.image">
          </view>
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
        contentList: [],
        tag: '',
        isLogin: false
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
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel.value !== undefined) {
          this.contentList = this.widgetModel.value.links
          console.log('contentList', this.contentList)
          this.tag = this.widgetModel.value.tag
        }
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>

