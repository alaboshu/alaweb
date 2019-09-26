<template>
  <div class="zk-hudong-shake">
    <div>
      <div class="ui-active-mask"></div>
      <div class="a-loading-wrap" id="actGameMain">
        <div class="active11-bg"></div>
        <div class="active-main">
          <div class="act-main-bg"></div>
          <div class="gift-list">
            <div class="gift-li-wrap">
              <ul>
                <li class="gift-li-1"></li>
                <li class="gift-li-2"></li>
                <li class="gift-li-3"></li>
              </ul>
              <div class="game-mask"></div>
            </div>
          </div>
          <div class="act-icon"></div>
          <a href="javascript:void();" class="get-btn"></a>
        </div>
      </div>
    </div>
  </div>
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
