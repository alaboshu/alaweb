module.exports = {
  base: '/mp-weui/',
  title: 'MP-WeUI',
  description: '基于 mpvue 和 weui-wxss 的微信小程序 UI 库',
  head: [
    ['meta', { name: 'keywords', content: 'mpvue,weui,mp-weui' }],
    ['link', { rel: 'icon', href: `/favicon.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }], // 设置书签时显示的图标
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  ga: 'UA-117496504-1',
  themeConfig: {
    repo: 'youngluo/mp-weui',
    docsDir: 'docs',
    sidebarDepth: 0,
    nav: [
      { text: '组件', link: '/components/agree' },
    ],
    sidebar: {
      '/components/': genSidebarConfig()
    }
  }
}

function genSidebarConfig() {
  return [
    {
      title: '表单组件',
      collapsable: false,
      children: [
        'agree',
        'checklist',
        'field',
        'radio',
        'slider',
        'switch',
        'uploader'
      ]
    },
    {
      title: '基础组件',
      collapsable: false,
      children: [
        'badge',
        'cell',
        'footer',
        'grid',
        'loadmore',
        'navbar',
        'panel',
        'preview',
        'progress',
        'search'
      ]
    },
    {
      title: '操作反馈',
      collapsable: false,
      children: [
        'actionsheet',
        'dialog',
        'message',
        'picker',
        'toast'
      ]
    }
  ]
}
