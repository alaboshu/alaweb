<template>
  <div class="container">
    <div class="weui-grids">
      <block v-for="item in grids" :key="index">
        <a url="" class="weui-grid" hover-class="weui-grid_active">
          <image class="weui-grid__icon" :src="item.src" />
          <div class="weui-grid__label">{{item.name}}</div>
        </a>
      </block>
    </div>

    <x-picker :range="array">
      <x-button type="primary">x-picker</x-button>
    </x-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        array: ['美国', '中国', '巴西', '日本'],
        grids: [
          { src: '/static/images/icon_nav_button.png', name: 'Button' },
          { src: '/static/images/icon_nav_cell.png', name: 'Cell' },
          { src: '/static/images/icon_nav_toast.png', name: 'Toast' },
          { src: '/static/images/icon_nav_dialog.png', name: 'Dialog' },
          { src: '/static/images/icon_nav_button.png', name: 'Progress' },
          { src: '/static/images/icon_nav_panel.png', name: 'Msg' },
          { src: '/static/images/icon_nav_article.png', name: 'Article' },
          { src: '/static/images/icon_nav_actionSheet.png', name: 'ActionSheet' },
          { src: '/static/images/icon_nav_icons.png', name: 'Icons' }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>
