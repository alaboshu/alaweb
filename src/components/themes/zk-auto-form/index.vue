<template>
  <view v-if="async" class="zk-auto-form">
    <view class="alert-text" v-if="config.config.alertText">{{config.config.alertText}}</view>
    <div class="box-top" v-if="config.config.title">{{config.config.title}}</div>
    <div v-for="(list,index) in config.list" :key="index">
      <form-item v-model="formModel[list.model]" :list="list" :model="list.model" :config="config" :formModel="formModel" :widget="widget" @inputModel="inputModel"></form-item>
      <div v-if="list.type==='tab'">
        <div v-for="(tabItem,tabItemIndex) in list.columns" :key="tabItemIndex">
          <div class="group-title">{{tabItem.name}}</div>
          <div class="box" v-for="(tabList,tabListIndex) in tabItem.list" :key="tabListIndex">
            <x-input v-model="formModel[tabList.model]" :label="tabList.name" :placeholder="tabList.helpblock" :disabled="tabList.options.disabled" :clearable="true"></x-input>
          </div>
        </div>
      </div>
    </div>
    <view class="btn-box">
      <view class="btn-sumbit " type="primary" @click="sumbit">{{config.config.bottonText}}</view>
    </view>
    <view v-if="config.config.buttomHelpText !== null && config.config.buttomHelpText !== undefined">
      <ul class="buttom-text">
        <li v-for="(item, index) in config.config.buttomHelpText" :key="index"> {{index+1}}、{{item}}</li>
      </ul>
    </view>
    <view v-if="config.config.links">
      <view v-for="(item, index) in config.config.links" :key="index" class="box-bottom" @click="toLink(item)">
        <p>{{item.name}}</p>
      </view>
    </view>
  </view>
</template>

<script>
  import formItem from './form-item.vue'
  import service from './service.js'
  export default {
    components: {
      formItem
    },
    props: {
      widget: {
      }
    },
    data () {
      return {
        async: false,
        config: '',
        apiUrl: null,
        type: null, // 如果type不为空的时候，表单从服务器上动态获取
        key: null, // 服务器表单key
        formModel: {}
      }
    },
    onLoad (option) {
      this.option = option
    },
    computed: {

    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        service.init(this)
      },
      inputModel (val) {
        this.formModel[val.model] = val.val
      },
      async sumbit () {
        service.save(this)
      },
      toLink (conter) {
        uni.navigateTo({
          url: conter.link
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>

