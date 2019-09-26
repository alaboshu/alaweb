<template>
  <view class="zk-eject">
    <view v-if="show" class="eject-shadow" />
    <view v-if="show" class="eject-content">
      <view @click="shadowShow">
        <image src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUdwTP///////////////////////////////////////////////////////////////////4ZSzFsAAAARdFJOUwA9uuMW8Iv8Vgmrc8YoTmLPUKrdrwAAAbdJREFUWMPtV0mWhSAMZFQZHOr+l23092BDULCz6MXPTh8UlVQIiRBvexuzyeCjtoDV0Qf5CMJNPgGczfrJdYKYYceIwypN2uqMXIe4Iw2mh8kOokK2xQS1AzUzWjTgyVBID+ilkUpiUo2nTIxaCJkNCFcLArDdRmjWiPPNkgg936Ko26OMusExGr7BceehLw5zG1STnk5hqy8cEBvTy0QM1XwB5tbcmoFK/jh9rXSuu3YVl1TPtVO0W8aiqxZIWEOS8X1VwFN0XCeZg44jZFJ5rurp/D3pPL8VIZbPZUpXeTzhTCPyg0IZhuRTdtZe/n5wdhTYjG/plUTM/hwbv3B+fXxbLMIZyrCfttIoSdxQ/FlFFaeCItbi7EjJ/bm9hkJEQoNKyRdADSXFWItcF/KiHTg1FOFy7QRAp+oLh0Yhdj2CcRg5nDKFU49CPBchZhKcKf2YLgPT1WQqFExli6uIMpV0pgeG67ljeny5WoEk1tjemIxY6kHraJM8Q9Pmr5q21hZSXLeQ7Q2tvW+MGdprrmafa/TgGoTYxrJ8SHRmfjQkHoyWcmRdekfWXwP0+IcB+m3/zD4A+3UfTAGXkVgAAAAASUVORK5CYII=' alt='正在加载中...' />
      </view>
      <view>
        <x-a path='http://www.baidu.com'>
          <image src='http://img30.360buyimg.com/jdphoto/jfs/t1/7560/4/13853/84653/5c529b0dEc59e7977/71da3b52a3da69a2.png!q70.webp' alt='正在加载中...' />
        </x-a>
      </view>
    </view>
  </view>
</template>
<script>
 
  export default {
    
    data () {
      return {
        show: true,
        swiperList: [
          {
            name: '设置标题',
            image: 'http://img5.imgtn.bdimg.com/it/u=4059571990,2518088609&fm=26&gp=0.jpg',
            url: 'http://www.baidu.com'
          },
          {
            name: '设置标题',
            image: 'http://img2.imgtn.bdimg.com/it/u=1726718549,2669899075&fm=26&gp=0.jpg',
            url: 'http://www.baidu.com'
          }
        ]
      }
    },
    methods: {
      shadowShow () {
        this.show = !this.show
      }
    }
  }
</script>
