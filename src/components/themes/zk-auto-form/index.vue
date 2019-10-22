<template>
  <view v-if="async" class="zk-auto-form">
    <view class="alert-text" v-if="autoForm.tooltip.alertText">{{autoForm.tooltip.alertText}}</view>
    <div class="box-top" v-if="autoForm.tooltip.title">{{autoForm.tooltip.title}}</div>
    <div v-for="(column,index) in autoForm.columns" :key="index">
      <div v-if="column.type==='tab'">
        <div class="group-title">{{column.name}}</div>
        <div class="box" v-for="(tabColumn,tabColumnIndex) in column.columns" :key="tabColumnIndex">
          <form-item v-model="formModel[tabColumn.field]" :column="tabColumn"></form-item>
        </div>
      </div>
      <form-item v-else v-model="formModel[column.field]" :column="column"></form-item>
    </div>
    <view class="btn-box">
      <view class="btn-sumbit " type="primary" @click="sumbit">{{autoForm.tooltip.bottonText}}</view>
    </view>
    <view v-if="autoForm.tooltip.buttomHelpText !== null && autoForm.tooltip.buttomHelpText !== undefined">
      <ul class="buttom-text">
        <li v-for="(item, index) in autoForm.tooltip.buttomHelpText" :key="index"> {{index+1}}、{{item}}</li>
      </ul>
    </view>
    <view v-if="autoForm.tooltip.links">
      <view v-for="(item, index) in autoForm.tooltip.viewLinks" :key="index" class="box-bottom" @click="toLink(item)">
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
      },
      type: {} // 如果type不为空的时候，表单从服务器上动态获取
    },
    data () {
      return {
        async: false,
        autoForm: null,
        formModel: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.autoForm = await service.getForm(this.type, this.widget, this.$route)
        if (this.autoForm) {
          this.formModel = service.getModel(this.autoForm)
          this.async = true
        }
        console.info('表单结构', this.autoForm, this.formModel)
      },
      inputModel (val) {
        this.formModel[val.model] = val.val
      },
      async sumbit () {
        console.info('表单 formModel', this.formModel)
        // service.save(this)
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

