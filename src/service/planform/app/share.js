/* eslint-disable */
// #ifdef APP-PLUS
// 如下为分享内容定义，可根据业务需求自行定义
var strShareUrl = 'www.baidu.com'
var strShareTitle = '咚巴拉'
var strShareSummary = '实体商家业绩倍增服务平台'
var strShareImageUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4197136446,2654635374&fm=26&gp=0.jpg'

// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
var screenWidth = plus.screen.resolutionWidth
// 以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
// 图标下的按钮文字距离图标5像素，文字大小12像素
// 底部取消按钮高度固定为44px
// TODO 未处理横屏和pad，这些情况6个图标应该一排即可
var margin = 25,
  iconWidth = 55,
  icontextSpace = 5,
  textHeight = 12
var left1 = margin / 360 * screenWidth
var iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 // 屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
if (iconSpace <= 5) { // 屏幕过窄时，缩小边距和图标大小，再算一次
  margin = 15
  iconWidth = 40
  left1 = margin / 360 * screenWidth
  iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 // 屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
}
var left2 = left1 + iconWidth + iconSpace
var left3 = left1 + (iconWidth + iconSpace) * 2
var left4 = left1 + (iconWidth + iconSpace) * 3
var top1 = left1
var top2 = top1 + iconWidth + icontextSpace + textHeight + left1
var nvMask = new plus.nativeObj.View('nvMask', { // 先创建遮罩层
  top: '0px',
  left: '0px',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.2)'
})
nvMask.addEventListener('click', function () { // 处理遮罩层点击
  nvMask.hide()
  nvImageMenu.hide()
})
var nvImageMenu = new plus.nativeObj.View('nvImageMenu', { // 创建底部图标菜单
  bottom: '0px',
  left: '0px',
  height: '264px',
  width: '100%',
  backgroundColor: 'rgb(255,255,255)'
})
// 绘制底部图标菜单的内容
nvImageMenu.draw([{
    tag: 'rect', // 菜单顶部的分割灰线
    color: '#e7e7e7',
    position: {
      top: '0px',
      height: '1px'
    }
  },
  {
    tag: 'font',
    id: 'sharecancel', // 底部取消按钮的文字
    text: '取消分享',
    textStyles: {
      size: '14px'
    },
    position: {
      bottom: '0px',
      height: '44px'
    }
  },
  {
    tag: 'rect', // 底部取消按钮的顶部边线
    color: '#e7e7e7',
    position: {
      bottom: '45px',
      height: '1px'
    }
  },
  {
    tag: 'img',
    id: 'imgwechatfriend',
    src: 'http://s-open.qiniuniu99.com/wwwroot/uploads/image/20190524/wechatfriend.png',
    position: {
      top: top1,
      left: left1,
      width: iconWidth,
      height: iconWidth
    }
  },
  {
    tag: 'font',
    id: 'fontwechatfriend',
    text: '微信好友',
    textStyles: {
      size: textHeight
    },
    position: {
      top: top1 + iconWidth + icontextSpace,
      left: left1,
      width: iconWidth,
      height: textHeight
    }
  },
  // {
  //   tag: 'img',
  //   id: 'imgwechatmoments',
  //   src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3865127624,3827730189&fm=26&gp=0.jpg',
  //   position: {
  //     top: top1,
  //     left: left2,
  //     width: iconWidth,
  //     height: iconWidth
  //   }
  // },
  // {
  //   tag: 'font',
  //   id: 'fontwechatmoments',
  //   text: '微信朋友圈',
  //   textStyles: {
  //     size: textHeight
  //   },
  //   position: {
  //     top: top1 + iconWidth + icontextSpace,
  //     left: left2 - 2.5,
  //     width: iconWidth + 5,
  //     height: textHeight
  //   }
  // },
  // {
  //   tag: 'img',
  //   id: 'imgweibo',
  //   src: '/static/sharemenu/weibo.png',
  //   position: {
  //     top: top1,
  //     left: left3,
  //     width: iconWidth,
  //     height: iconWidth
  //   }
  // },
  // {
  //   tag: 'font',
  //   id: 'fontweibo',
  //   text: '微博',
  //   textStyles: {
  //     size: textHeight
  //   },
  //   position: {
  //     top: top1 + iconWidth + icontextSpace,
  //     left: left3,
  //     width: iconWidth,
  //     height: textHeight
  //   }
  // },
  // {
  //   tag: 'img',
  //   id: 'imgqq',
  //   src: '/static/sharemenu/qq.png',
  //   position: {
  //     top: top1,
  //     left: left4,
  //     width: iconWidth,
  //     height: iconWidth
  //   }
  // },
  // {
  //   tag: 'font',
  //   id: 'fontqq',
  //   text: 'QQ',
  //   textStyles: {
  //     size: textHeight
  //   },
  //   position: {
  //     top: top1 + iconWidth + icontextSpace,
  //     left: left4,
  //     width: iconWidth,
  //     height: textHeight
  //   }
  // },
  // {
  //   tag: 'img',
  //   id: 'imgcopyurl',
  //   src: '/static/sharemenu/copyurl.png',
  //   position: {
  //     top: top2,
  //     left: left1,
  //     width: iconWidth,
  //     height: iconWidth
  //   }
  // },
  // {
  //   tag: 'font',
  //   id: 'fontcopyurl',
  //   text: '复制',
  //   textStyles: {
  //     size: textHeight
  //   },
  //   position: {
  //     top: top2 + iconWidth + icontextSpace,
  //     left: left1,
  //     width: iconWidth,
  //     height: textHeight
  //   }
  // },
  // {
  //   tag: 'img',
  //   id: 'imgmore',
  //   src: '/static/sharemenu/more.png',
  //   position: {
  //     top: top2,
  //     left: left2,
  //     width: iconWidth,
  //     height: iconWidth
  //   }
  // },
  // {
  //   tag: 'font',
  //   id: 'fontmore',
  //   text: '更多',
  //   textStyles: {
  //     size: textHeight
  //   },
  //   position: {
  //     top: top2 + iconWidth + icontextSpace,
  //     left: left2,
  //     width: iconWidth,
  //     height: textHeight
  //   }
  // }
  // 如果想要增加更多按钮，请在这里继续添加，第二列还有2个空位
])
nvImageMenu.addEventListener('click', function (e) { // 处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
  if (e.screenY > plus.screen.resolutionHeight - 44) { // 点击了底部取消按钮
    nvMask.hide()
    nvImageMenu.hide()
  } else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
    // 屏幕左右边缘5像素及菜单顶部5像素不处理点击
  } else { // 点击了图标按钮
    var iClickIndex = -1 // 点击的图标按钮序号，第一个图标按钮的index为0
    var iRow = e.clientY < (top2 - (left1 / 2)) ? 0 : 1
    var iCol = -1
    if (e.clientX < (left2 - (iconSpace / 2))) {
      iCol = 0
    } else if (e.clientX < (left3 - (iconSpace / 2))) {
      iCol = 1
    } else if (e.clientX < (left4 - (iconSpace / 2))) {
      iCol = 2
    } else {
      iCol = 3
    }
    if (iRow == 0) {
      iClickIndex = iCol
    } else {
      iClickIndex = iCol + 4
    }
    if (iClickIndex >= 0 && iClickIndex <= 5) { // 处理具体的点击逻辑，此处也可以自行定义逻辑。如果增减了按钮，此处也需要跟着修改
      var strProvider = '',
        strScene = ''
      switch (iClickIndex) {
        case 0:
          strProvider = 'weixin'
          strScene = 'WXSceneSession'
          break
        case 1:
          strProvider = 'weixin'
          strScene = 'WXSenceTimeline'
          break
        case 2:
          strProvider = 'sinaweibo'
          break
        case 3:
          strProvider = 'qq'
          break
        case 4:
          uni.setClipboardData({
            data: strShareUrl,
            complete() {
              uni.showToast({
                title: '已复制到剪贴板'
              })
            }
          })
          break
        case 5:
          plus.share.sendWithSystem({
            content: strShareUrl
          })
          break
      }
      if (strProvider != '') { // 点击了0-3序号的这4个按钮
        uni.share({
          provider: strProvider,
          scene: strScene,
          type: 0,
          href: strShareUrl,
          title: strShareTitle,
          summary: strShareSummary,
          imageUrl: strShareImageUrl,
          success: function (res) {
          },
          fail: function (err) {
          }
        })
      }
    }
  }
})
/* nvImageMenu.addEventListener("touchstart", function(e) {
	if (e.screenY > (plus.screen.resolutionHeight - 44)) {
		//TODO 这里可以处理按下背景变灰的效果
	}
})
nvImageMenu.addEventListener("touchmove", function(e) {
	//TODO 这里可以处理按下背景变灰的效果
	if (e.screenY > plus.screen.resolutionHeight - 44) {}
})
nvImageMenu.addEventListener("touchend", function(e) {
	//TODO 这里可以处理释放背景恢复的效果
})
*/
// #endif
export default {
  appShare(title, url, summary, imageUrl) {
    strShareUrl = url
    strShareTitle = title
    strShareSummary = summary
    strShareImageUrl = imageUrl
    // #ifdef APP-PLUS
    nvMask.show()
    nvImageMenu.show() // 5+应支持从底部向上弹出的动画
    // #endif
  }
}
