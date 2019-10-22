<template>
  <view v-if="async" class="zk-auto-form">
    <view class="alert-text" v-if="autoForm.tooltip.alertText">{{autoForm.tooltip.alertText}}</view>
    <div class="box-top" v-if="autoForm.tooltip.title">{{autoForm.tooltip.title}}</div>
    <div v-for="(column,index) in autoForm.columns" :key="index">
      <div v-if="column.type==='tab'">
        <div class="group-title">{{column.name}}</div>
        <div class="box" v-for="(tabColumn,tabColumnIndex) in column.columns" :key="tabColumnIndex">
          <form-item v-model="viewModel[tabColumn.field]" :column="tabColumn"></form-item>
        </div>
      </div>
      <form-item v-else v-model="viewModel[column.field]" :column="column"></form-item>
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
      widget: {},
      type: {} // 如果type不为空的时候，表单从服务器上动态获取
    },
    data () {
      return {
        async: false,
        autoForm: null,
        viewModel: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.autoForm = await service.getForm(this.type, this.widget, this.$route)
        if (this.autoForm) {
          this.viewModel = service.getModel(this.autoForm)
          this.$set(this.viewModel, 'name', this.viewModel.name)
          this.async = true
        }
        this.$api.info('渲染后的表单结构', this.autoForm, this.viewModel)
      },
      async sumbit () {
        this.$api.info('表单视图', this.viewModel)
        var para = {
          type: this.autoForm.key,
          model: JSON.stringify(this.viewModel)
        }
        var response = await this.$api.httpPost('/Api/Auto/Save', para)
        if (response.status === 1) {
          this.$api.toastSuccess('操作成功')
        } else {
          this.$api.toastWarn(response.message)
        }
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

