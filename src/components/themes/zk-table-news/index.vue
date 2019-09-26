<template>
  <view class="zk-table-news">
    <view class="table-news-from">
      <view class="from-top">
        <view class="from-top_intro">
          <p>公司全称<span class="intro-span">营业执照/发票抬头/</span>保持一致</p>
          <p>提交后不可自行修改</p>
        </view>
        <view class="from-top_conter">
          <view class="input-list">
            <input placeholder="请输入企业名称" />
          </view>
          <view class="input-list">
            <input placeholder="请输入企业法人" />
          </view>
          <view class="input-list">
            <input placeholder="请输入企业识别代码" />
          </view>
          <view class="input-list">
            <input placeholder="上传照片" />
            <view class="right-iocn">
              <x-icon name="icon-zk-notdata" size="22" :color="'#e15443'"></x-icon>
            </view>
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
