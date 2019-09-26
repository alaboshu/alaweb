<template>
  <view class="zk-egg-machine">
    <section class="first">
      <div class="myGift">我的奖品</div>
      <main>
        <ul>
          <li class="egg_1">
            <span></span>
          </li>
          <li class="egg_2">
            <span></span>
          </li>
          <li class="egg_3">
            <span></span>
          </li>
          <li class="egg_4">
            <span></span>
          </li>
          <li class="egg_5">
            <span></span>
          </li>
          <li class="egg_6">
            <span></span>
          </li>
          <li class="egg_7">
            <span></span>
          </li>
          <li class="egg_8">
            <span></span>
          </li>
        </ul>
        <div></div>
        <div></div>
        <div class="result"></div>
        <div class="light"></div>
      </main>
      <footer>
        <a id="starBtn" href="javascript:void(0)"></a>
        <a id="ruleBtn" href="javascript:void(0)"></a>
      </footer>
    </section>
    <!-- 中奖弹窗 -->
    <section class="model_1">
      <div>
        <h2>恭喜中奖啦</h2>
        <p>300M流量</p>
        <span>DF0D-13CC-1234-1234</span>
      </div>
      <a class="close" href="javascript:void(0)"></a>
    </section>
    <!-- 我的奖品弹窗 -->
    <section class="model_2">
      <div>
        <h2>我的奖品</h2>
        <p>300M<br>流量</p>
        <span>DF0D-13CC-1234-1234</span>
      </div>
      <a class="close" href="javascript:void(0)"></a>
    </section>
    <!-- 提示弹窗 -->
    <section class="model_3">
      <div>
        <p>提示框提示框提示框提示框提示框提示框提示框</p>
      </div>
      <a class="close" href="javascript:void(0)"></a>
    </section>
    <!-- 活动规则弹窗 -->
    <section class="model_4">
      <div>
        <div>
          <div>
            <p><span>时间：</span>2018年8月4日</p>
            <p><span>奖项：</span></p>
            <ul>
              <li>一等奖<span>xxxxxx</span></li>
              <li>二等奖<span>xxxxxx</span></li>
              <li>三等奖<span>xxxxxx</span></li>
            </ul>
            <p><span>注意事项：</span></p>
            <p>注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项</p>
          </div>
        </div>
      </div>
      <a class="close" href="javascript:void(0)"></a>
    </section>
    <!-- 遮罩层 -->
    <section class="mask" id="mask"></section>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {}
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
