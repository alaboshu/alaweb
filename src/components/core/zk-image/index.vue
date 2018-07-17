<template>
  <div class="zk-image" :style="styles">
    <div class="page">
      <ul class="lazyload-list">
        <li class="lazyload-list-item">
          <img class="lazyload-image" src="http://zqingchun.yiqipingou.com//wwwroot/Uploads/Core/2018/04/e03dfeb126b5406e866bdaf14c81d3f7.png">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: ['widgetDataId'],
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, this.widgetDataId)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-image {
  	font-size: @font-size-base;
  	.lazyload-list {
  		display: block;
  		overflow: hidden;
  		width: 100%;
  		padding: 0;
  		margin: 0;
  		text-align: center;
  		list-style: none;

  		.lazyload-list-item {
  			width: 100%;
  			margin: 5px auto;
  		}

  		.lazyload-image {
  			display: block;
  			width: 100%;
  			height: 180px;
  			// &[lazy='loading'] {
  			//   width: 40px;
  			//   height: 300px;
  			//   margin: auto;
  			// }
  		}
  	}
  }
</style>
