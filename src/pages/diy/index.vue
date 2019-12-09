<template>
  <div class="diy-wrap" :class="'diy-wrap_'+masterPageIndex" :style="{background: viewModel.setting? viewModel.setting.background :''}" id="wrap" v-if="viewModel">
    <draggable v-model="viewModel.widgets" @change="dragEnd">
      <div v-for="(widget, index) in viewModel.widgets" :key="index" class="widgets-box">
        <layout-item v-if="!widget.layout" :widget="widget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="index" ref="layoutitem"></layout-item>
        <div class="layout-box ">
          <div v-if="widget.layout==='tab-layer'" :class="'tab-box-'+widget.options.align" @click="handleLayoutCheck(widget,index)">
            <div class="swiper-tab" v-if="widget.columns.length!==0">
              <div v-for="(tab,tabIndex) in widget.columns" :key="tabIndex " class="swiper-tab_item " :class="{'active': tabIndex===tabLayoutIndex}" @click="tapTab(tabIndex)">{{tab.option.name}}</div>
            </div>
            <div class="tab-box-content" v-if="widget.columns.length!==0">
              <swiper :current="tabLayoutIndex" class="swiper-box tabs_swiper">
                <swiper-item v-for="(tablayout,layoutIndex) in widget.columns" :key="layoutIndex" class="tabs_swiper-item">
                  <div class="tab_swiper-masker" />
                  <draggable v-model="tablayout.widgets" v-show="auxiliaryRemove">
                    <div v-for="(tabWidget, tabWidgetIndex) in tablayout.widgets" :key="tabWidgetIndex">
                      <layout-item :widget="tabWidget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index,'tablayout':layoutIndex,'tabWidgetIndex':tabWidgetIndex}"></layout-item>
                    </div>
                  </draggable>
                  <div class="diy-new-block" @dblclick="addWidget(masterPageIndex,true,index,layoutIndex)">
                    双击给容器加新模块
                  </div>
                </swiper-item>
              </swiper>
            </div>
          </div>
          <div v-if="widget.layout==='grid-layer'">
            <div :style="'display:flex;justify-content:'+widget.options.justify==='start'||widget.options.justify==='end'?'flex-'+widget.options.justify:widget.options.justify+';'+flexAlign(widget.options.aligin)">
              <div v-for="(tablayout,layoutIndex) in widget.columns" :key="layoutIndex" :style="'padding-left:'+widget.options.gutter+'px;padding-right:'+widget.options.gutter+'px;width:'+tablayout.option.sapn*4.1666+'%'">
                <draggable v-model="tablayout.widgets" v-show="auxiliaryRemove">
                  <div v-for="(tabWidget, tabWidgetIndex) in tablayout.widgets" :key="tabWidgetIndex">
                    <layout-item :widget="tabWidget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index,'tablayout':layoutIndex,'tabWidgetIndex':tabWidgetIndex}"></layout-item>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
          <div class="layou-widget-actions">
            <span class="layou-widget-actions-span" @click="handleLayoutCheck(widget, index)">
              容器属性
            </span>
            <span class="layou-widget-actions-span" @click="removeWidget(index)">
              删除容器
            </span>
          </div>
        </div>
      </div>
    </draggable>
    <div class="diy-new-block" @dblclick="addWidget(masterPageIndex,false)">
      双击添加新模块 <span v-if="masterPageIndex>0">母版页编号:{{masterPageIndex}}</span>
    </div>
    <view class="diy-widget-wrap_tabbar" v-if="viewModel.setting.showFoot">
      <zk-tabbar ref="zktabbar"></zk-tabbar>
      <div class="diy-dottedbox" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span" @click="eidtTabBar()">编辑</span>
        <span class="diy-widget-actions-span" @click="postMessage('pageSet',viewModel)" v-if="false">设置</span>
      </div>
    </view>
  </div>
</template>

<script>
  import theme from '@/service/all/theme'
  import draggable from 'vuedraggable'
  import layoutItem from './layout-item'
  import serivce from './service'

  export default {
    name: 'diy',
    components: {
      layoutItem,
      draggable
    },
    props: {
      masterPageIndex: {
        default: 0,
        type: Number
      }
    },
    data () {
      return {
        auxiliaryRemove: true,
        widgetsMask: -1,
        tabLayoutIndex: 0,
        theme: {},
        option: {},
        viewModel: {
          widgets: [],
          setting: {
            showFoot: false
          }
        },
        checkedWidgetIndex: -1,
        tabSwiperItem: -1,
        isClickContent: false
      }
    },
    onLoad (option) {
      this.option = option
    },
    mounted () {
      this.initListener()
      this.postMessage('clientIframeLoadRequest')
    },
    methods: {
      flexAlign (direction) {
        if (direction === 'top') {
          return 'align-items: flex-start'
        }
        if (direction === 'middle') {
          return 'align-items: center'
        }
        if (direction === 'bottom') {
          return 'align-items: flex-end'
        }
      },
      tapTab (index) {
        this.tabLayoutIndex = index
      },
      async initWidget (data) {
        this.viewModel = {
          ...data,
          masterPageIndex: this.masterPageIndex
        }
        this.$api.vuexSet('diyClientHost', data.clientHost)
        this.viewModel = theme.filerPageInfo(this.viewModel)
        
        serivce.setTabbar(this, this.viewModel)
        console.info(this.viewModel.name, this.viewModel)
        this.postMessage('clientIframeLoadSuccessful', true)
      },
      initListener () {
        window.addEventListener('message', (event) => {
          const { type, data } = event.data || {}
          switch (type) {
            case 'initWidget':
              this.initWidget(data)
              break
            case 'initTheme':
              this.initTheme(data)
              break
            case 'selectWidget':
              this.handleCheck(data)
              break
            case 'changeStyleCss':
              this.updateStyle('css', data)
              break
            case 'changeBorder':
              this.updateStyle('border', data)
              break
            case 'changeTheme':
              this.updateStyle('widgetTheme', data)
              break
            case 'changeVariable':
              this.updateVariable(data)
              break
            case 'widgetList':
              this.postMessage('widgetList', this.viewModel.widgets)
              break
            case 'addLayout':
              this.addLayout(data)
              break
            case 'removeWidget':
              this.removeWidgetAndSave(data)
              break
            case 'editLayouColumns':
              this.editLayouColumns(data)
              break
            case 'switchWidget':
              this.switchWidget(data)
          }
        })
      },
      editLayouColumns (data) {
        this.viewModel.widgets[data.layoutIndex].columns = data.layoutAttribute.columns
      },
      handleCheck (value) {
        this.$bus.$emit('layoutItemCheck', value.index)
        this.postMessage('selectWidget', value)
      },
      handleLayoutCheck (widget, index) {
        let data = {
          isLayout: true,
          layoutModel: widget,
          layoutIndex: index
        }
        this.postMessage('checkWidgetLayout', data)
      },
      addLayout (widget) {
        this.viewModel.widgets.push(widget)
      },
      postMessage (type, data) {
        parent.postMessage({ type, data }, '*')
      },
      initTheme (data) {
        var bgColor = JSON.parse(data.tabBarSetting).backGround
        this.$refs.zktabbar.$emit('diyTab', JSON.parse(data.tabBarSetting))
        this.$refs.zktabbar.backgroundColor = bgColor
      },
      updateStyle (type, data) {
        const { viewModel, checkedWidgetIndex } = this
        if (checkedWidgetIndex === -1) return
        const currentWidget = viewModel.widgets[checkedWidgetIndex]
        if (currentWidget.style === null) {
          currentWidget.style = {}
        }
        this.$set(currentWidget.style, type, data)
      },
      // 删除容器或模块
      removeWidgetAndSave (removeData) {
        if (typeof (removeData) === 'number') {
          this.viewModel.widgets.splice(removeData, 1)
        }
        if (typeof (removeData) === 'object') {
          if (typeof (removeData.removeIndex) === 'number') {
            this.viewModel.widgets.splice(removeData.removeIndex, 1)
          } else {
            this.auxiliaryRemove = false
            this.viewModel.widgets[removeData.removeIndex.widgetIndex].columns[removeData.removeIndex.tablayout].widgets.splice(removeData.removeIndex.tabWidgetIndex, 1)
            this.auxiliaryRemove = true
          }
        }
        this.postMessage('diySave')
      },
      removeWidget (removeData) {
        this.postMessage('deleteWidgetAndSave', removeData)
      },
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      async addWidget (masterPageIndex, isLayout, widgetIndex, layoutIndex) {
        var para = {
          masterPageIndex: masterPageIndex,
          isLayout: isLayout,
          widgetIndex: widgetIndex,
          layoutIndex: layoutIndex
        }
        this.postMessage('showDialogWidget', para)
      },
      eidtTabBar () {
        var widget = {
          name: 'zk-tabbar',
          widgetId: '5dc201f5c8267a146475c41d'
        }
        this.postMessage('editWidget', widget)
      },
      updateVariable (vars) {
      },
      async dragEnd () {
        this.postMessage('dragWidgetAndSave')
      },
      switchWidget (data) {
        this.initWidget(data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>

