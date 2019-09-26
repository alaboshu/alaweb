<template>
  <view class="zk-icon-list-k">
    <ul class="zk-icon-list">
      <li v-for="(item, index) in list" :key='index' :class="'icon-list-'+index">
        <x-a v-if="index <8" :title="item.name" :path='item.url'>
          <view>
            <p>{{item.name}}</p>
            <p>{{item.name}}</p>
          </view>
          <image :src="item.image" class="image" :class="'image-'+index" :alt="item.name" />
        </x-a>
      </li>
    </ul>
  </view>
</template>

<script>
  import './var.scss'
  import './styles/index'
 
  export default {
    
    data () {
      return {
        list: [
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=242171602,3484064775&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=302701032,2300144492&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3478746384,2289037560&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2554386997,363236980&fm=27&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'http://pic21.nipic.com/20120519/5454342_154115399000_2.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'http://img3.imgtn.bdimg.com/it/u=1778874458,2287009633&fm=26&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '标题名称',
            image: 'http://img3.imgtn.bdimg.com/it/u=1778874458,2287009633&fm=26&gp=0.jpg',
            url: 'http://www.baidu.com'
          }
        ]
      }
    }
  }
</script>

